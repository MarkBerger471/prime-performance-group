// ============================================
// PRIME PERFORMANCE GROUP — Internationalization
// ============================================

(function () {
    const SUPPORTED = ['en', 'th'];
    const DEFAULT = 'en';
    const STORAGE_KEY = 'ppg-lang';
    const cache = {};

    function getLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return SUPPORTED.includes(stored) ? stored : DEFAULT;
    }

    function setLang(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        applyTranslations(lang);
    }

    function toggleLang() {
        const current = getLang();
        setLang(current === 'en' ? 'th' : 'en');
    }

    async function loadTranslations(lang) {
        if (cache[lang]) return cache[lang];
        try {
            const base = document.querySelector('script[src*="i18n.js"]')?.src.replace('/js/i18n.js', '') || '.';
            const resp = await fetch(base + '/lang/' + lang + '.json');
            cache[lang] = await resp.json();
        } catch (e) {
            cache[lang] = {};
        }
        return cache[lang];
    }

    async function applyTranslations(lang) {
        const t = await loadTranslations(lang);

        // Text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) el.textContent = t[key];
        });

        // HTML content (for elements with inner markup like shimmer spans)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (t[key] !== undefined) el.innerHTML = t[key];
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) el.placeholder = t[key];
        });

        // Alt text
        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            if (t[key] !== undefined) el.alt = t[key];
        });

        // Update toggle buttons
        const other = lang === 'en' ? 'TH' : 'EN';
        document.querySelectorAll('.lang-toggle-text').forEach(el => {
            el.textContent = other;
        });

        // Update page title if key exists
        const pageKey = document.querySelector('meta[name="i18n-page"]')?.content;
        if (pageKey && t[pageKey]) document.title = t[pageKey];

        // Remove FOUC class
        document.documentElement.classList.remove('lang-loading');
    }

    // Expose globally
    window.ppgI18n = { toggleLang, getLang, setLang };

    // Apply on load
    const lang = getLang();
    document.documentElement.lang = lang;
    applyTranslations(lang);
})();
