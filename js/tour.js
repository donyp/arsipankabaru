/**
 * Guided Tour Engine — Pusat Arsip Anka
 * v3.0 — Precision Overhaul (Viewport-Independent)
 * Uses 4-panel masking for perfect sharp spotlights and zoom-independence.
 */

const Tour = {
    steps: [],
    currentStep: 0,
    overlay: null,
    panels: {
        top: null,
        bottom: null,
        left: null,
        right: null
    },
    spotlight: null,
    tooltip: null,

    init(steps) {
        this.steps = steps;
        this.currentStep = 0;
        this.createElements();
    },

    createElements() {
        // Remove existing if any
        const oldOverlay = document.getElementById('tour-overlay-root');
        if (oldOverlay) oldOverlay.remove();

        // Target body but use inverse zoom to match viewport pixels
        const parent = document.body;

        this.overlay = document.createElement('div');
        this.overlay.id = 'tour-overlay-root';
        // z-[1000] and counters body zoom (0.7) by applying (1/0.7 = ~1.42857)
        this.overlay.className = 'fixed inset-0 z-[2000] pointer-events-none transition-opacity duration-500 opacity-0';
        this.overlay.style.cssText = 'pointer-events: auto; zoom: 1.4285714;';

        // create 4 panels for the "hole" effect + blur
        const panelClass = 'fixed bg-black/60 backdrop-blur-[2px] transition-all duration-300 pointer-events-auto';

        this.panels.top = this.createPanel(panelClass);
        this.panels.bottom = this.createPanel(panelClass);
        this.panels.left = this.createPanel(panelClass);
        this.panels.right = this.createPanel(panelClass);

        // Spotlight Box (only for the border/glow)
        this.spotlight = document.createElement('div');
        this.spotlight.className = 'fixed z-[1001] rounded-2xl border-2 border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-500 pointer-events-none';

        // Tooltip
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'fixed z-[1002] w-72 glass-card p-5 rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 opacity-0 scale-95 pointer-events-auto';
        this.tooltip.style.backgroundColor = 'rgba(22, 32, 50, 0.95)'; // Ensure high contrast
        this.tooltip.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <span id="tour-counter" class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded-lg">Langkah 1 / 8</span>
                <button onclick="Tour.stop()" class="text-gray-500 hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <h4 id="tour-title" class="text-white font-bold text-sm mb-2">Pusat Arsip Anka</h4>
            <p id="tour-desc" class="text-gray-400 text-xs leading-relaxed mb-5">Selamat datang di dashboard zona Anda.</p>
            <div class="flex items-center justify-between gap-3">
                <button onclick="Tour.stop()" class="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-wider">Lewati</button>
                <button id="tour-next" onclick="Tour.next()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Selanjutnya</button>
            </div>
        `;

        this.overlay.appendChild(this.panels.top);
        this.overlay.appendChild(this.panels.bottom);
        this.overlay.appendChild(this.panels.left);
        this.overlay.appendChild(this.panels.right);
        this.overlay.appendChild(this.spotlight);
        this.overlay.appendChild(this.tooltip);

        root.appendChild(this.overlay);
    },

    createPanel(className) {
        const p = document.createElement('div');
        p.className = className;
        return p;
    },

    start() {
        if (this.steps.length === 0) return;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            this.overlay.classList.remove('opacity-0');
            this.showStep(0);
        }, 100);
    },

    showStep(index) {
        if (index < 0 || index >= this.steps.length) {
            this.stop();
            return;
        }

        this.currentStep = index;
        const step = this.steps[index];
        const target = step.target ? document.querySelector(step.target) : null;

        // --- 1. Position Overlay Panels ---
        if (!target || target.offsetParent === null) {
            // Full screen dim if no target
            this.updatePanels(0, 0, 0, 0);
            this.spotlight.style.opacity = '0';
        } else {
            this.spotlight.style.opacity = '1';
            const rect = target.getBoundingClientRect();
            // Standard padding for most elements, extra for dropdowns
            const padding = step.target.includes('filter') ? 12 : 12;

            this.updatePanels(
                rect.top - padding,
                rect.left - padding,
                rect.width + padding * 2,
                rect.height + padding * 2
            );

            // Spotlight outline
            this.spotlight.style.top = `${rect.top - padding}px`;
            this.spotlight.style.left = `${rect.left - padding}px`;
            this.spotlight.style.width = `${rect.width + padding * 2}px`;
            this.spotlight.style.height = `${rect.height + padding * 2}px`;

            // Auto scroll (center target in viewport)
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // --- 2. Update Tooltip Content ---
        document.getElementById('tour-counter').textContent = `Langkah ${index + 1} / ${this.steps.length}`;
        document.getElementById('tour-title').textContent = step.title;
        document.getElementById('tour-desc').textContent = step.content;

        const nextBtn = document.getElementById('tour-next');
        nextBtn.textContent = index === this.steps.length - 1 ? 'Selesai' : 'Selanjutnya';

        // --- 3. Position Tooltip ---
        this.tooltip.classList.remove('opacity-0', 'scale-95');

        setTimeout(() => {
            const tooltipRect = this.tooltip.getBoundingClientRect();
            const gap = 24;

            let top, left;

            if (!target) {
                // Center screen for welcome
                top = (window.innerHeight - tooltipRect.height) / 2;
                left = (window.innerWidth - tooltipRect.width) / 2;
            } else {
                const rect = target.getBoundingClientRect();
                top = rect.bottom + gap;
                left = rect.left;

                if (top + tooltipRect.height > window.innerHeight) {
                    top = rect.top - tooltipRect.height - gap;
                }
                if (left + tooltipRect.width > window.innerWidth) {
                    left = window.innerWidth - tooltipRect.width - 24;
                }
                if (left < 24) left = 24;
            }

            this.tooltip.style.top = `${top}px`;
            this.tooltip.style.left = `${left}px`;
        }, 10);
    },

    updatePanels(t, l, w, h) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (w === 0) {
            // Full Overlay
            this.panels.top.style.cssText = `top:0; left:0; width:100%; height:100%;`;
            this.panels.bottom.style.height = '0';
            this.panels.left.style.width = '0';
            this.panels.right.style.width = '0';
            return;
        }

        this.panels.top.style.cssText = `top:0; left:0; width:100%; height:${t}px;`;
        this.panels.bottom.style.cssText = `top:${t + h}px; left:0; width:100%; height:${vh - (t + h)}px;`;
        this.panels.left.style.cssText = `top:${t}px; left:0; width:${l}px; height:${h}px;`;
        this.panels.right.style.cssText = `top:${t}px; left:${l + w}px; width:${vw - (l + w)}px; height:${h}px;`;
    },

    next() {
        this.showStep(this.currentStep + 1);
    },

    stop() {
        this.overlay.classList.add('opacity-0');
        this.tooltip.classList.add('scale-95');
        document.body.style.overflow = '';
        setTimeout(() => {
            this.overlay.remove();
            localStorage.setItem('tour_completed', 'true');
        }, 500);
    }
};

window.Tour = Tour;
