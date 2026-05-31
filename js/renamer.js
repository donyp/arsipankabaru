/**
 * AI PDF Renamer Logic - v4.0 (Final Stability Release)
 * Alaligned with User Detection Framework.
 */

let PT_MAPPING = []; // Loaded from localStorage or default

const PT_MAPPING_DEFAULT = [
    { store: "Balaraja", secondary: "YADI SURYADI", pt: "PT. MEGA BAJA" },
    { store: "Bitung", secondary: "HENDIANA, FARID, ADIN", pt: "PT. BITUNG BAJA UTAMA" },
    { store: "Cilegon", secondary: "HAROR, SOLIHIN", pt: "CV. SEMESTA GEMILANG CILEGON" },
    { store: "Cipondoh", secondary: "KUSTIAWATI, TIYA", pt: "PT. INDOTAMA BAJA MAKMUR" },
    { store: "Ciruas", secondary: "WAHYUDIN, ENTIS SUTISNA", pt: "PT. BAJA LAMPUNG BAROKAH" },
    { store: "Kutabumi", secondary: "YOGA PRADITA", pt: "PT. KUTABUMI JAYA LESTARI" },
    { store: "Serang Timur", secondary: "FATUR", pt: "PT. MEGA SERANG WAJATAMA" },
    { store: "Mega Matrial Pasar Kamis", secondary: "HENDIANA, HENDIYANA, HENDI", pt: "PT. BITUNG BAJA UTAMA" },
    { store: "Bintaro", secondary: "SARIP", pt: "CV. MEGA BAJA" },
    { store: "Cengkareng", secondary: "ICHA", pt: "CV. MEGA BAJA" },
    { store: "Ciledug", secondary: "YENI", pt: "PT. MEGA BAJA" },
    { store: "Gading Serpong", secondary: "ABDUL YASIR, HOLIP MUNANDAR", pt: "PT. MEGA BAJA" },
    { store: "Joglo", secondary: "AJIS", pt: "PT. INDOTAMA BAJA MAKMUR" },
    { store: "Karang Tengah", secondary: "ERIS MARWAN, ARIF IRFAN", pt: "CV. KARANG TENGAH MANDALA" },
    { store: "Pinang", secondary: "ALI YADI", pt: "CV. MEGA BAJA" },
    { store: "Sawangan", secondary: "BAYU, RAMDANI, ALPIAN", pt: "PT. MEGA SAWANGAN WAJATAMA" },
    { store: "Sawangan 2", secondary: "EKY, EKI, ARMAN", pt: "PT. DEPOK UNGGUL MANDIRI" },
    { store: "Condet", secondary: "FIKRI", pt: "CV. MEGA BAJA" },
    { store: "Duren Sawit", secondary: "HENGKI HERNIAWAN", pt: "PT. PONDOKGEDE MAKMUR ABADI" },
    { store: "Harapan Indah", secondary: "MUHAMMAD", pt: "PT. PONDOKGEDE MAKMUR ABADI" },
    { store: "Jatiwaringin", secondary: "ACENG", pt: "PT. MEGA BAJA" },
    { store: "Pondok Gede", secondary: "", pt: "PT. PONDOKGEDE MAKMUR ABADI" },
    { store: "Rorotan", secondary: "WAWAN, DEDE", pt: "PT. Rorotan Makmur Sentosa" },
    { store: "Mega Alumunium", secondary: "PANJI, RIDWAN", pt: "PT. FITRAH JAYA STAINLES" },
    { store: "Mega Alumunium Karawang", secondary: "PANJI", pt: "PT. FITRAH JAYA STAINLES" },
    { store: "Mega Alumunium Leuwi Liang", secondary: "PANJI", pt: "PT. LEWILIANG MEKAR JAYA" },
    { store: "Mega Granit", secondary: "ANISA", pt: "PT. MEGA GRUP INDONESIA" },
    { store: "Mega Warna kalimalang", secondary: "EDI", pt: "PT. MEGA WARNA Indonesia" },
    { store: "Bantar Gebang", secondary: "LILIS, ANTO, NEGA, MITA, DENI, DEN", pt: "CV. DUNIA BAJA" },
    { store: "Cibubur", secondary: "ANWAR", pt: "CV. CILEGON STEEL" },
    { store: "Cikeas", secondary: "RUDIYANTO", pt: "PT CIBUBUR RAYA INDOSTEEL (CIKEAS)" },
    { store: "Cimanggis", secondary: "BAHTIAR, YUNUS", pt: "PT. TRIGALUH MAS CIMANGGIS" },
    { store: "Pedurenan", secondary: "RAHMAT", pt: "PT. SETU SUMBER BERKAH" },
    { store: "Setu", secondary: "SUPANDI", pt: "PT CIBUBUR RAYA INDOSTEEL" },
    { store: "Cibubur Raya", secondary: "MENUN, YOGI", pt: "PT CIBUBUR RAYA INDOSTEEL" },
    { store: "Dramaga", secondary: "IRWAN, CHAIRIL ALIF", pt: "CV. MEGA BAJA" },
    { store: "Jasinga", secondary: "HILMAN", pt: "PT. MEGA BAJA BOGOR" },
    { store: "Karadenan", secondary: "AHMAD", pt: "PT. MEGA BAJA BOGOR" },
    { store: "Leuwi Liang", secondary: "ENDIK SUDIKNA", pt: "PT. LEWILIANG MEKAR JAYA" },
    { store: "Rangkas Bitung", secondary: "HUSNAN, ADE WAWAN", pt: "PT. RANGKAS BITUNG MAJU BERSAMA" },
    { store: "Sentul", secondary: "AHMAD NURSIDIK", pt: "CV. GEMILANG BAJA KENCANA" },
    { store: "Cianjur", secondary: "AGIT, WANDI, ARDI", pt: "PT. CIANJUR BAJA MANDIRI" },
    { store: "Ciawi", secondary: "AHMAD MUHAERY", pt: "CV. DUNIA BETON" },
    { store: "Cigombong", secondary: "INDRA MAULANA", pt: "CV. DUNIA BETON" },
    { store: "Cikalong", secondary: "CEPI MAULANA", pt: "PT. TRIPUSAKA PRIMAS CIKALONG" },
    { store: "Ciluer", secondary: "ALFIYANSAH, ALFIYANSYAH", pt: "PT. MEGA BAJA BOGOR" },
    { store: "Cimahi", secondary: "ALWI, AHMAD", pt: "CV. ANUGRAH BAJATAMA" },
    { store: "Cipeuyeum", secondary: "SUHENDAR", pt: "PT. CIANJUR BAJA MANDIRI" },
    { store: "Garut", secondary: "HARIS", pt: "CV. BAINIT UNGGUL" },
    { store: "Majalaya", secondary: "CHANDRA, ELOK MEI", pt: "PT. BANDUNG LAUTAN BAJA" },
    { store: "Rancaekek", secondary: "MAHROM", pt: "CV. NUSA BAJA SENTOSA" },
    { store: "Soreang", secondary: "FIKI MULYANA", pt: "PT. SOREANG SUKSES SEJATI" },
    { store: "Sukabumi", secondary: "JADIN", pt: "PT. SUKABUMI BAJA SANTANA" },
    { store: "Sumedang", secondary: "NABILA", pt: "PT. SUMEDANG GALUH NUSANTARA" },
    { store: "Sukaraja", secondary: "RIFKI ROYANI", pt: "PT. SUKABUMI BAJA SANTANA" },
    { store: "Pelabuhan Ratu", secondary: "WANDI", pt: "PT. SUKABUMI BAJA SANTANA" },
    { store: "Cikampek", secondary: "DENI", pt: "PT CIKAMPEK BAJA MAKMUR" },
    { store: "Cirebon", secondary: "ASEP SOLIKHIN", pt: "CV. MEGA BAJA (KARAWANG)" },
    { store: "Karawang Barat", secondary: "ANDI, ENDANG JUANDA", pt: "CV. MEGA BAJA (KARAWANG)" },
    { store: "Karawang Timur", secondary: "DARUL HIDAYAT", pt: "CV. MEGA BAJA (KARAWANG)" },
    { store: "Kedawung", secondary: "UZEM, FIRMAN", pt: "PT. PALIMANAN BAJA SUKSES" },
    { store: "Kuningan", secondary: "DEDE SUHADA", pt: "CV. KUNINGAN MAKMUR SENTOSA" },
    { store: "Palimanan", secondary: "RIYAN", pt: "PT. PALIMANAN BAJA SUKSES" },
    { store: "Purwakarta", secondary: "RIZKI, ADE NURJAMAN", pt: "PT CIKAMPEK BAJA MAKMUR" },
    { store: "Rengas Dengklok", secondary: "ADE WAWAN", pt: "PT BAJA MAKMUR PEKALONGAN" },
    { store: "Subang", secondary: "RENDI, CANDRA", pt: "PT. SUBANG BAJA GEMILANG" },
    { store: "Majalengka", secondary: "", pt: "PT. SUBANG BAJA GEMILANG" },
    { store: "Brebes", secondary: "", pt: "CV. MEGA BAJA (KARAWANG)" },
    { store: "Kendal", secondary: "", pt: "PT INDAH JAYA KENDAL" },
    { store: "Kudus", secondary: "", pt: "PT BAJA MAKMUR PEKALONGAN" },
    { store: "Pemalang", secondary: "", pt: "PT. MAKMUR JAYA PEMALANG" },
    { store: "Semarang Unggaran", secondary: "", pt: "CV. SEMARANG UNGGUL" },
    { store: "Slawi", secondary: "", pt: "PT SLAWI BUDI UTAMA" },
    { store: "Semarang", secondary: "", pt: "PT MEGA BAJA MAGELANG" },
    { store: "Magelang", secondary: "", pt: "PT. MEGA BAJA MAGELANG" },
    { store: "Solo", secondary: "", pt: "PT. SOLO INTI BAJA" },
    { store: "Yogyakarta", secondary: "", pt: "PT. SINAR AGUNG Yogyakarta" },
    { store: "Jember", secondary: "", pt: "PT. KRAKATAU MEGATAMA Indonesia" },
    { store: "Madiun", secondary: "", pt: "PT. KRAKATAU MEGATAMA Indonesia" },
    { store: "Malang", secondary: "", pt: "PT. KRAKATAU MEGATAMA Indonesia" },
    { store: "Mojokerto", secondary: "", pt: "PT. MOJOKERTO BAJA SAKTI" },
    { store: "Surabaya", secondary: "", pt: "PT. KRAKATAU MEGATAMA Indonesia" },
    { store: "Bandar jaya", secondary: "", pt: "CV. BANDARJAYA CAHAYA LAUTAN" },
    { store: "Kotabumi", secondary: "TENDI", pt: "PT. BAJA LAMPUNG BAROKAH" },
    { store: "Lampung", secondary: "ROBI", pt: "PT. BAJA LAMPUNG BAROKAH" },
    { store: "Palembang", secondary: "BAGUS", pt: "CV. Sejahtera Nusa Internasional" },
    { store: "Banjarnegara", secondary: "", pt: "PT. BANJARNEGARA MEGA UTAMA" },
    { store: "Purwokerto", secondary: "", pt: "PT. PURWOKERTO BAJA UTAMA" },
    { store: "Tasikmalaya", secondary: "DANI KUSMAWAN", pt: "PT. PUSAKA BAJA PRIANGAN" },
    { store: "Singaparna", secondary: "", pt: "PT. PUSAKA BAJA PRIANGAN" },
    { store: "Makassar", secondary: "TRI", pt: "CV. MANDIRI MAKMUR MAKASAR" },
    { store: "Kariangau", secondary: "", pt: "CV. BERKAH BAJA BALIKPAPAN" },
    { store: "Samarinda", secondary: "FAHMI", pt: "CV. BERKAH BAJA BALIKPAPAN" },
    { store: "Sepinggan", secondary: "", pt: "CV. BERKAH BAJA BALIKPAPAN" },
    { store: "Kalimalang", secondary: "ANDI", pt: "CV. Pusat Baja" },
    { store: "Cibitung", secondary: "NANDANG", pt: "CV. DUNIA BAJA" },
    { store: "Deltamas", secondary: "RAHAYU", pt: "CV. Mega Baja Deltamas" },
    { store: "Pulo Gebang", secondary: "YAYAT", pt: "CV. MEGA BAJA" },
    { store: "Sukatani", secondary: "YAYAT", pt: "CV. Mega Baja Deltamas" },
    { store: "Cikarang 1", secondary: "INDRA KURNIAWAN", pt: "CV. CILEGON STEEL" },
    { store: "Sukadami", secondary: "GAN GAN", pt: "CV. CILEGON STEEL" },
    { store: "Cibarusah", secondary: "REZA", pt: "CV. CILEGON STEEL" }
];

let filesToProcess = [];
let isProcessing = false;

// ---- Lifecycle ----
document.addEventListener('DOMContentLoaded', () => {
    loadMapping();
    setupDropZone();
});

function loadMapping() {
    const saved = localStorage.getItem('pt_mapping_final');
    if (saved) {
        try {
            PT_MAPPING = JSON.parse(saved);
        } catch (e) { PT_MAPPING = [...PT_MAPPING_DEFAULT]; }
    } else {
        PT_MAPPING = [...PT_MAPPING_DEFAULT];
    }
    renderMappingUI();
}

function renderMappingUI() {
    const list = document.getElementById('mapping-list');
    const countBadge = document.getElementById('mapping-count');
    if (!list) return;
    if (countBadge) countBadge.textContent = PT_MAPPING.length;
    list.innerHTML = PT_MAPPING.map(rule => `
        <div class="p-3 rounded-xl bg-white/5 border border-white/5">
            <p class="text-[10px] text-gray-500 mb-1">${rule.pt} ${rule.secondary ? `(${rule.secondary})` : ''}</p>
            <p class="text-xs font-semibold text-indigo-400">${rule.store}</p>
        </div>
    `).join('');
}

// ---- Extraction Engine ----
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(" ") + "\n";
    }

    let rawText = fullText.replace(/\s+/g, ' ').replace(/[|]/g, '').trim();
    const needsOCR = rawText.length < 50 || (!rawText.toLowerCase().includes('yth') && !rawText.toLowerCase().includes('total'));

    if (needsOCR) {
        console.log("[AI] Missing keywords, running Safe OCR...");
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        const { data: { text: ocrText } } = await Tesseract.recognize(canvas, 'ind+eng');
        rawText += "\n" + ocrText.replace(/\s+/g, ' ').replace(/[|]/g, '').trim();
    }
    return rawText;
}

function analyzeText(text, originalName) {
    const cleanText = text.replace(/\r/g, '');
    const upperText = cleanText.toUpperCase();
    let store = "UNKNOWN", nominal = "0", date = "00-Unknown", type = "NON", review = false, cause = "";

    try {
        // 1. PPN/NON Detect
        if (cleanText.includes('835100311')) type = "PPN";
        else if (cleanText.includes('835100310')) type = "NON";

        // 2. Store Detect (Framework Requirement)
        const ythMatch = cleanText.match(/[Kk]epad[ae]\s*[Yy]th\s*[:.;]?\s*([^\n,]+)/i);
        const recipient = ythMatch ? ythMatch[1].trim().toUpperCase() : "";
        const allText = upperText.replace(/[^A-Z0-9]/g, '');

        const bestMatch = PT_MAPPING.find(r => {
            const cleanPT = r.pt.replace(/\b(PT\.?|CV\.?)\b/gi, '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
            const cleanSec = r.secondary.toUpperCase().replace(/[^A-Z0-9]/g, '');
            return (cleanPT && allText.includes(cleanPT)) || (cleanSec && allText.includes(cleanSec));
        });
        if (bestMatch) store = bestMatch.store;

        // 3. Nominal (User Framework Truths)
        let nominalCands = [];

        // A. Terbilang Parser
        const parseTerbilang = (t) => {
            const m = t.toLowerCase().match(/terbilang\s*[:;.]?\s*([a-z\s]+)(?:rupiah)?/);
            if (!m) return 0;
            const w = m[1].match(/[a-z]+/g);
            if (!w) return 0;
            const dict = { 'satu': 1, 'se': 1, 'dua': 2, 'tiga': 3, 'empat': 4, 'lima': 5, 'enam': 6, 'tujuh': 7, 'delapan': 8, 'sembilan': 9, 'sepuluh': 10, 'sebelas': 11 };
            let tot = 0, cur = 0;
            for (let v of w) {
                if (dict[v]) cur += dict[v];
                else if (v === 'belas') cur = (cur || 1) + 10;
                else if (v === 'puluh') cur = (cur || 1) * 10;
                else if (v === 'ratus') cur = (cur || 1) * 100;
                else if (v === 'ribu') { tot += (cur || 1) * 1000; cur = 0; }
                else if (v === 'juta') { tot += (cur || 1) * 1000000; cur = 0; }
            }
            return tot + cur;
        };
        const tv = parseTerbilang(cleanText);
        if (tv > 1000) nominalCands.push({ val: tv, score: 5000 });

        // B. Numeric Patterns
        const suffixPats = [
            /[Tt]otal\s*[:;.]?\s*(\d{1,3}(?:[.\s]\d{3})+(?:,\d{2})?)/g,
            /[Tt]otal\s*[Bb]ayar\s*[:;.]?\s*(\d{1,3}(?:[.\s]\d{3})+(?:,\d{2})?)/g
        ];
        for (const p of suffixPats) {
            const ms = [...cleanText.matchAll(p)];
            ms.forEach(m => {
                const num = Number(m[1].split(',')[0].replace(/[^0-9]/g, ''));
                if (num >= 1000) {
                    let s = 1000;
                    if (m[0].includes(',00')) s += 500;
                    if (m.index / cleanText.length > 0.6) s += 1000;
                    nominalCands.push({ val: num, score: s });
                }
            });
        }
        if (nominalCands.length > 0) {
            nominalCands.sort((a, b) => b.score - a.score);
            nominal = nominalCands[0].val.toLocaleString('id-ID');
        }

        // 4. Date (Header requirement)
        const monMap = { 'JAN': 'Januari', 'FEB': 'Februari', 'MAR': 'Maret', 'APR': 'April', 'MEI': 'Mei', 'MAY': 'Mei', 'MEL': 'Mei', 'MEY': 'Mei', 'JUN': 'Juni', 'JUL': 'Juli', 'AGU': 'Agustus', 'AUG': 'Agustus', 'SEP': 'September', 'OKT': 'Oktober', 'OCT': 'Oktober', 'NOV': 'November', 'DES': 'Desember', 'DEC': 'Desember', '01': 'Januari', '1': 'Januari', '02': 'Februari', '2': 'Februari', '03': 'Maret', '3': 'Maret', '04': 'April', '4': 'April', '05': 'Mei', '5': 'Mei', '06': 'Juni', '6': 'Juni', '07': 'Juli', '7': 'Juli', '08': 'Agustus', '8': 'Agustus', '09': 'September', '9': 'September', '10': 'Oktober', '11': 'November', '12': 'Desember' };
        const dPat = /\b(\d{1,2})\s*[-/\s.,]+\s*([A-Za-z]{3,9}|\d{1,2})\s*[-/\s.,]+\s*(\d{2,4})\b/ig;
        const allD = [...cleanText.matchAll(dPat)];
        let dateCands = [];
        for (const m of allD) {
            const mStr = m[2].substring(0, 3).toUpperCase();
            if (monMap[mStr]) {
                let s = 100;
                const ctx = cleanText.substring(Math.max(0, m.index - 60), m.index + 60).toLowerCase();
                if (ctx.includes('tgl') || ctx.includes('cetak')) s += 2000;
                if (m.index / cleanText.length < 0.4) s += 1000;
                dateCands.push({ match: m, score: s });
            }
        }
        if (dateCands.length > 0) {
            dateCands.sort((a, b) => b.score - a.score);
            const ch = dateCands[0].match;
            date = `${parseInt(ch[1], 10)} ${monMap[ch[2].substring(0, 3).toUpperCase()]}`;
        }

        const sug = `${type} ${store} ${nominal} ${date}.pdf`.toUpperCase().replace(/\s+/g, ' ');
        return { toko: store, nominal, date, type, suggestion: sug, needsReview: review, fallbackCause: cause, rawText: cleanText.substring(0, 2000) };
    } catch (e) {
        console.error(e);
        return { toko: "ERR", nominal: "0", date: "00-Unknown", type: "???", suggestion: `ERR_${originalName}`, needsReview: true, fallbackCause: e.message };
    }
}

// ---- UI Helpers ----
function setupDropZone() {
    const zone = document.getElementById('drop-zone');
    const input = document.getElementById('file-input');
    zone.onclick = () => input.click();
    input.onchange = (e) => handleFiles(e.target.files);
    zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('active'); };
    zone.ondragleave = () => zone.classList.remove('active');
    zone.ondrop = (e) => { e.preventDefault(); zone.classList.remove('active'); handleFiles(e.dataTransfer.files); };
}

function handleFiles(files) {
    const list = Array.from(files).filter(f => f.type === 'application/pdf');
    if (list.length === 0) return;
    filesToProcess = [...filesToProcess, ...list.map(f => ({ file: f, status: 'pending', result: null }))];
    document.getElementById('process-card').classList.remove('hidden');
    renderResults();
    if (!isProcessing) processQueue();
}

async function processQueue() {
    const pending = filesToProcess.find(f => f.status === 'pending');
    if (!pending) { isProcessing = false; checkDownloadAll(); return; }
    isProcessing = true; pending.status = 'processing'; renderResults();
    try {
        const text = await extractTextFromPDF(pending.file);
        pending.result = analyzeText(text, pending.file.name);
        pending.status = 'done';
    } catch (e) { console.error(e); pending.status = 'error'; }
    renderResults();
    processQueue();
}

function renderResults() {
    const body = document.getElementById('result-body');
    if (!body) return;
    body.innerHTML = filesToProcess.map((item, i) => {
        const res = item.result;
        const color = (res?.toko === 'UNKNOWN' || res?.needsReview) ? 'text-amber-400' : 'text-white';
        return `
            <tr class="hover:bg-white/5 transition-all border-b border-white/5">
                <td class="py-4 pr-4">
                    <p class="text-[11px] text-gray-300 font-medium truncate w-48">${item.file.name}</p>
                    ${res?.rawText ? `<button onclick="showDebugText(${i})" class="text-[9px] text-indigo-500 hover:text-indigo-400 mt-1">🔍 Lihat Teks</button>` : ''}
                </td>
                <td class="py-4 px-4 font-bold ${color}">${res?.toko || '--'}</td>
                <td class="py-4 px-4">
                    <p class="text-[10px] text-gray-300">💰 ${res?.nominal || '--'}</p>
                    <p class="text-[10px] text-gray-500">📅 ${res?.date || '--'}</p>
                </td>
                <td class="py-4 px-4 font-mono font-bold text-indigo-400 text-[10px] uppercase truncate max-w-[200px]">
                    ${res?.suggestion || '...'}
                </td>
                <td class="py-4 pl-4 text-right">${renderStatus(item, i)}</td>
            </tr>
        `;
    }).join('');
}

function renderStatus(item, i) {
    if (item.status === 'pending') return '<span class="text-xs text-gray-600">...</span>';
    if (item.status === 'processing') return '<div class="loader-dots"><span></span><span></span><span></span></div>';
    if (item.status === 'done') return `
        <button onclick="downloadFile(${i})" class="p-2 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        </button>
    `;
    return '<span class="text-red-400">Error</span>';
}

async function downloadFile(idx) {
    const f = filesToProcess[idx];
    const blob = new Blob([await f.file.arrayBuffer()], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = f.result.suggestion; a.click();
}

function checkDownloadAll() {
    const done = filesToProcess.filter(f => f.status === 'done');
    const btn = document.getElementById('download-all-btn');
    if (btn && done.length > 1) btn.classList.remove('hidden');
}

function showDebugText(idx) {
    const item = filesToProcess[idx];
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
        <div class="premium-card rounded-3xl p-8 w-full max-w-3xl max-h-[80vh] flex flex-col bg-[#0d121f] border border-white/10">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-white">Isi Teks Dokumen</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div class="flex-1 overflow-auto bg-black/40 rounded-2xl p-6 font-mono text-xs text-gray-500">${item.result.rawText}</div>
        </div>
    `;
    document.body.appendChild(modal);
}

// --- Mapping Editor (Global Scope) ---
window.editMapping = () => {
    const body = document.getElementById('mapping-editor-body');
    body.innerHTML = PT_MAPPING.map(r => `
        <tr class="border-b border-white/5">
            <td class="py-2"><input type="text" value="${r.pt}" class="w-full bg-transparent outline-none text-xs text-white"></td>
            <td class="py-2"><input type="text" value="${r.secondary}" class="w-full bg-transparent outline-none text-xs text-indigo-300"></td>
            <td class="py-2"><input type="text" value="${r.store}" class="w-full bg-transparent outline-none text-xs text-emerald-400 font-bold"></td>
            <td class="py-2 text-right"><button onclick="this.closest('tr').remove()" class="text-red-400">×</button></td>
        </tr>
    `).join('');
    document.getElementById('mapping-modal').classList.remove('hidden');
};

window.addMappingRow = () => {
    const body = document.getElementById('mapping-editor-body');
    const tr = document.createElement('tr');
    tr.className = 'border-b border-white/5';
    tr.innerHTML = `
        <td class="py-2"><input type="text" class="w-full bg-transparent outline-none text-xs text-white"></td>
        <td class="py-2"><input type="text" class="w-full bg-transparent outline-none text-xs text-indigo-300"></td>
        <td class="py-2"><input type="text" class="w-full bg-transparent outline-none text-xs text-emerald-400 font-bold"></td>
        <td class="py-2 text-right"><button onclick="this.closest('tr').remove()" class="text-red-400">×</button></td>
    `;
    body.appendChild(tr);
};

window.saveMapping = () => {
    const rules = [];
    document.querySelectorAll('#mapping-editor-body tr').forEach(row => {
        const ins = row.querySelectorAll('input');
        if (ins[0].value.trim() && ins[2].value.trim()) {
            rules.push({ pt: ins[0].value.trim(), secondary: ins[1].value.trim(), store: ins[2].value.trim() });
        }
    });
    PT_MAPPING = rules;
    localStorage.setItem('pt_mapping_final', JSON.stringify(PT_MAPPING));
    renderMappingUI();
    document.getElementById('mapping-modal').classList.add('hidden');
    filesToProcess.forEach(f => { f.status = 'pending'; f.result = null; });
    processQueue();
};
