/**
 * AI PDF Renamer Logic - v1.0
 * Uses Tesseract.js for OCR and regex for metadata extraction.
 */

const PT_MAPPING = {
    "CV DUNIA BAJA": "DUNIA_BAJA",
    "MEGA BAJA BINTARO": "MB_BINTARO",
    "CV. MEGA BAJA INDONESIA": "MB_INDONESIA",
    "PT GARUDA GEMILANG INDONESIA": "GARUDA_ANKA",
    "CV. DUNIA BAJA": "DUNIA_BAJA"
};

const MONTHS_MAP = {
    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MEI': '05', 'MAY': '05',
    'JUN': '06', 'JUL': '07', 'AGU': '08', 'AUG': '08', 'SEP': '09', 'OKT': '10',
    'OCT': '10', 'NOV': '11', 'DES': '12', 'DEC': '12'
};

let filesToProcess = [];
let isProcessing = false;

// ---- Initialization ----
document.addEventListener('DOMContentLoaded', () => {
    loadMapping();
    setupDropZone();
});

function loadMapping() {
    const saved = localStorage.getItem('pt_mapping');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(PT_MAPPING, parsed);
        } catch (e) { }
    }
    renderMappingUI();
}

function renderMappingUI() {
    const list = document.getElementById('mapping-list');
    list.innerHTML = Object.entries(PT_MAPPING).map(([pt, store]) => `
        <div class="p-3 rounded-xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-500 mb-1">${pt}</p>
            <p class="text-xs font-semibold text-indigo-400">${store}</p>
        </div>
    `).join('');
}

// ---- Drop Zone Logic ----
function setupDropZone() {
    const zone = document.getElementById('drop-zone');
    const input = document.getElementById('file-input');

    zone.addEventListener('click', () => input.click());
    input.addEventListener('change', (e) => handleFiles(e.target.files));

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('active');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('active'));

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('active');
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    const newFiles = Array.from(files).filter(f => f.type === 'application/pdf');
    if (newFiles.length === 0) return;

    filesToProcess = [...filesToProcess, ...newFiles.map(f => ({
        file: f,
        status: 'pending',
        result: null
    }))];

    document.getElementById('process-card').classList.remove('hidden');
    renderResults();

    if (!isProcessing) processQueue();
}

// ---- Core Processing Logic ----
async function processQueue() {
    const pending = filesToProcess.find(f => f.status === 'pending');
    if (!pending) {
        isProcessing = false;
        checkDownloadAll();
        return;
    }

    isProcessing = true;
    pending.status = 'processing';
    renderResults();

    try {
        const text = await extractTextFromPDF(pending.file);
        const metadata = analyzeText(text, pending.file.name);

        pending.result = metadata;
        pending.status = 'done';
    } catch (err) {
        console.error(err);
        pending.status = 'error';
    }

    renderResults();
    processQueue();
}

/**
 * Extracts text from PDF.
 * Uses pdf.js first, falls back to Tesseract OCR if text is empty (scanned image).
 */
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    // Try text extraction first
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(" ");
        fullText += pageText + "\n";
    }

    // If text is minimal, it's likely a scan. Use OCR on first page.
    if (fullText.trim().length < 50) {
        console.log(`[AI] Page text too short (${fullText.length}), trigger OCR fallback...`);
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const { data: { text } } = await Tesseract.recognize(canvas, 'ind+eng', {
            logger: m => console.log(m.status + ": " + Math.round(m.progress * 100) + "%")
        });
        fullText = text;
    }

    return fullText;
}

function analyzeText(text, originalName) {
    console.log("[AI] Raw Text:", text);

    // 1. PPN Detection
    // "Kepada Yth : PT."
    const ythSection = text.match(/Kepada Yth\s*:\s*([^\n]+)/i);
    const ythText = ythSection ? ythSection[1] : "";
    const isPPN = ythText.toUpperCase().includes("PT.");
    const type = isPPN ? 'PPN' : 'NON';

    // 2. Store Name Detection
    let detectedToko = "UNKNOWN";

    if (isPPN) {
        // Look for PT in mapping
        for (const [pt, store] of Object.entries(PT_MAPPING)) {
            if (ythText.toUpperCase().includes(pt.toUpperCase())) {
                detectedToko = store;
                break;
            }
        }
        // Fallback: If PT not in mapping, take the PT name
        if (detectedToko === "UNKNOWN") {
            const ptMatch = ythText.match(/PT\.\s*([^,]+)/i);
            detectedToko = ptMatch ? ptMatch[1].trim() : "PT_UNKNOWN";
        }
    } else {
        // NON-PPN logic: "MEGA BAJA KOMSEN" -> "KOMSEN"
        const mbMatch = ythText.match(/MEGA BAJA\s+([A-Za-z0-9]+)/i);
        if (mbMatch) {
            detectedToko = mbMatch[1].trim();
        } else {
            detectedToko = ythText.split(/[,\s]/)[0]; // Fallback
        }
    }

    // 3. Nominal Detection
    // "Total Bayar : 4.935.190,00,-"
    const nominalMatch = text.match(/Total Bayar\s*:\s*([\d\.,\-]+)/i);
    let nominal = "0";
    if (nominalMatch) {
        nominal = nominalMatch[1].split(',')[0].replace(/[^0-9]/g, '');
    }

    // 4. Date Detection
    // "Tgl Cetak : 08-May-2026"
    const dateMatch = text.match(/Tgl Cetak\s*:\s*(\d{1,2})[-/\s]([A-Za-z]{3,9})/i);
    let dateStr = "00-Unknown";
    if (dateMatch) {
        const day = dateMatch[1];
        const rawMonth = dateMatch[2].substring(0, 3).toUpperCase();

        // Month names in Indonesian for display
        const indMonthMap = {
            'JAN': 'Januari', 'FEB': 'Februari', 'MAR': 'Maret', 'APR': 'April',
            'MEI': 'Mei', 'MAY': 'Mei', 'JUN': 'Juni', 'JUL': 'Juli',
            'AGU': 'Agustus', 'AUG': 'Agustus', 'SEP': 'September', 'OKT': 'Oktober',
            'OCT': 'Oktober', 'NOV': 'November', 'DES': 'Desember', 'DEC': 'Desember'
        };
        const month = indMonthMap[rawMonth] || rawMonth;
        dateStr = `${day} ${month}`;
    }

    // Format: PPN/NON - NAMA TOKO - NOMINAL - TANGGAL
    const suggestion = `${type} - ${detectedToko} - ${nominal} - ${dateStr}.pdf`;

    return {
        toko: detectedToko,
        nominal: nominal,
        date: dateStr,
        type: type,
        suggestion: suggestion.toUpperCase()
    };
}

// ---- UI Rendering ----
function renderResults() {
    const body = document.getElementById('result-body');
    body.innerHTML = filesToProcess.map((item, i) => {
        const res = item.result;
        return `
            <tr class="hover:bg-white/5 transition-all">
                <td class="py-4 pr-4">
                    <p class="text-xs text-gray-300 font-medium truncate w-48">${item.file.name}</p>
                </td>
                <td class="py-4 px-4 font-['Outfit'] font-bold ${res?.toko === 'UNKNOWN' ? 'text-amber-400' : 'text-white'}">
                    ${res?.toko || '--'}
                </td>
                <td class="py-4 px-4">
                    <p class="text-[10px] text-gray-300">💰 ${res?.nominal || '--'}</p>
                    <p class="text-[10px] text-gray-500">📅 ${res?.date || '--'}</p>
                </td>
                <td class="py-4 px-4">
                    <span class="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold">
                        ${res?.suggestion || 'Analyzing...'}
                    </span>
                </td>
                <td class="py-4 pl-4">
                    ${renderStatus(item, i)}
                </td>
            </tr>
        `;
    }).join('');
}

function renderStatus(item, i) {
    if (item.status === 'pending') return '<span class="text-[10px] text-gray-600">Pending</span>';
    if (item.status === 'processing') return `
        <div class="flex items-center gap-1 loader-dots">
            <div class="w-1 h-1 rounded-full bg-indigo-400"></div>
            <div class="w-1 h-1 rounded-full bg-indigo-400"></div>
            <div class="w-1 h-1 rounded-full bg-indigo-400"></div>
        </div>
    `;
    if (item.status === 'done') return `
        <button onclick="downloadFile(${i})" class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
        </button>
    `;
    return '<span class="text-[10px] text-red-400 font-bold">Error</span>';
}

async function downloadFile(index) {
    const item = filesToProcess[index];
    const blob = new Blob([await item.file.arrayBuffer()], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.result.suggestion;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
}

function checkDownloadAll() {
    const doneCount = filesToProcess.filter(f => f.status === 'done').length;
    if (doneCount > 1) {
        document.getElementById('download-all-btn').classList.remove('hidden');
    }
}

// ---- Mapping Editor ----
function editMapping() {
    const modal = document.getElementById('mapping-modal');
    const input = document.getElementById('mapping-input');

    const text = Object.entries(PT_MAPPING).map(([pt, store]) => `${pt}:${store}`).join('\n');
    input.value = text;
    modal.classList.remove('hidden');
}

function closeMapping() {
    document.getElementById('mapping-modal').classList.add('hidden');
}

function saveMapping() {
    const input = document.getElementById('mapping-input').value;
    const lines = input.split('\n').filter(l => l.includes(':'));
    const newMap = {};

    lines.forEach(line => {
        const [pt, store] = line.split(':').map(s => s.trim());
        if (pt && store) newMap[pt] = store;
    });

    Object.assign(PT_MAPPING, newMap);
    localStorage.setItem('pt_mapping', JSON.stringify(newMap));
    renderMappingUI();
    closeMapping();
    Toast.success('Pemetaan berhasil disimpan!');
}
