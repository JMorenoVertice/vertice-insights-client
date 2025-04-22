// ALL INTEGRED BY CORAL
console.log("////////// EVENTS IS CONNECTED AND RUNNING //////////");

// --- GLOBAL VARIABLE FOR EXERCISE TYPE ---
window.tipoEjer = null;

// --- Get all data-* attributes from an element as an object ---
function getDataAttributes(el) {
    return [...el.attributes]
        .filter(a => a.name.startsWith('data-'))
        .reduce((acc, a) => { acc[a.name] = a.value; return acc; }, {});
}

// --- Get the parent hierarchy for an element ---
function getParentStructure(el) {
    let parents = [];
    let node = el.parentElement;
    while (node && node !== document.body) {
        parents.push({
            tag: node.tagName,
            id: node.id,
            class: node.className,
            name: node.getAttribute('name'),
            data: getDataAttributes(node),
            role: node.getAttribute('role'),
            ariaLabel: node.getAttribute('aria-label')
        });
        node = node.parentElement;
    }
    return parents;
}

// --- Update tipoEjer on click for any exercise element ---
function updateTipoEjerOnClick(el) {
    let ejercicioEl = el.closest('[data-ejercicio], [data-tipo], .ejercicio, [data-src], [src]');
    if (ejercicioEl) {
        let tipo = ejercicioEl.getAttribute('data-ejercicio') ||
            ejercicioEl.getAttribute('data-tipo') ||
            ejercicioEl.getAttribute('data-src') ||
            ejercicioEl.getAttribute('src') ||
            (ejercicioEl.classList.contains('ejercicio') ? 'ejercicio' : null);
        if (tipo && typeof scoEjerciciosTipo !== 'undefined') {
            let filename = String(tipo).split('/').pop();
            const ejercicio = scoEjerciciosTipo.find(ejer => ejer.url === filename);
            window.tipoEjer = ejercicio ? ejercicio.tipo : tipo;
        } else if (tipo) {
            window.tipoEjer = tipo;
        }
    }
}

// --- Robust logging with all relevant attributes ---
function logElementAction(context, el, action = 'Click') {
    if (action === 'Click') updateTipoEjerOnClick(el);

    // Get iframe width/height if element is iframe or context is IFRAME
    let iframeInfo = {};
    if (el.tagName === 'IFRAME') {
        iframeInfo.iframeWidth = el.offsetWidth || el.width || null;
        iframeInfo.iframeHeight = el.offsetHeight || el.height || null;
    } else if (context.startsWith('IFRAME')) {
        // Try to get the iframe element from parent
        let iframeEl = window.frameElement;
        if (iframeEl && iframeEl.tagName === 'IFRAME') {
            iframeInfo.iframeWidth = iframeEl.offsetWidth || iframeEl.width || null;
            iframeInfo.iframeHeight = iframeEl.offsetHeight || iframeEl.height || null;
        }
    }
    let info = {
        tag: el.tagName,
        id: el.id,
        class: el.className,
        name: el.getAttribute('name'),
        title: el.getAttribute('title'),
        text: (el.innerText || el.value || '').trim(),
        type: el.type || undefined,
        value: el.value || undefined,
        src: el.getAttribute('src'),
        href: el.getAttribute('href'),
        alt: el.getAttribute('alt'),
        placeholder: el.getAttribute('placeholder'),
        ariaLabel: el.getAttribute('aria-label'),
        role: el.getAttribute('role'),
        tabindex: el.getAttribute('tabindex'),
        checked: typeof el.checked === "boolean" ? el.checked : undefined,
        disabled: typeof el.disabled === "boolean" ? el.disabled : undefined,
        readonly: typeof el.readOnly === "boolean" ? el.readOnly : undefined,
        required: typeof el.required === "boolean" ? el.required : undefined,
        data: getDataAttributes(el),
        tipoEjer: window.tipoEjer || 'desconocido',
        padres: getParentStructure(el),
        iframeInfo
    };
    console.log(`[${context}] ${action} on:`, info);
}

// --- Add tracking to any document or container ---
function addTracking(doc, context) {
    if (!doc) return;
    doc.addEventListener('click', e => logElementAction(context, e.target, 'Click'));
    doc.addEventListener('input', e => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName))
            logElementAction(context, e.target, 'Input');
    });
    doc.addEventListener('change', e => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName))
            logElementAction(context, e.target, 'Change');
    });
}

// --- Tracking in main document and #SCOCONTENT ---
function initTracking() {
    addTracking(document, 'PADRE');
    const scoContent = document.getElementById('SCOCONTENT');
    if (scoContent) addTracking(scoContent, 'PADRE/#SCOCONTENT');
    const iframe = document.getElementById('scoFrame');
    if (iframe) {
        iframe.addEventListener('load', function () {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                addTracking(iframeDoc, 'IFRAME');
                const scoContentIframe = iframeDoc.getElementById('SCOCONTENT');
                if (scoContentIframe) addTracking(scoContentIframe, 'IFRAME/#SCOCONTENT');
            } catch (err) {
                console.warn('Cannot access iframe content (cross-domain?):', err);
            }
        });
    }
}

// --- Sync tipoEjer from opener if in popup ---
function syncTipoEjerFromOpener() {
    try {
        if (window.opener && typeof window.opener.tipoEjer !== 'undefined') {
            window.tipoEjer = window.opener.tipoEjer;
            console.log("Exercise type synced from parent:", window.tipoEjer);
        }
    } catch (e) {
        window.tipoEjer = 'desconocido';
    }
}

// --- Patch HS.Expander for dynamic tipoEjer update and CSS ---
function patchExpander() {
    if (typeof hs !== 'undefined' && hs.Expander && hs.Expander.prototype) {
        const originalOnAfterExpand = hs.Expander.prototype.onAfterExpand;
        hs.Expander.prototype.onAfterExpand = function () {
            var src = this.src;
            var filename = src.split('/').pop();
            try {
                let ejercicio = scoEjerciciosTipo.find(ejer => ejer.url === filename);
                let tipoEjer = ejercicio ? ejercicio.tipo : 'desconocido';
                window.tipoEjer = tipoEjer;
                console.log(tipoEjer);

                if (tipoEjer === "generico" || tipoEjer === "pilas") {
                    let iframeDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;
                    let linkCSS = iframeDoc.querySelector('link[href="resources/ejercicioshtml.css"]');
                    if (linkCSS) {
                        linkCSS.href = "resources/ejercicioshtmlv0.css";
                    }
                }
            } catch (error) {
                window.tipoEjer = 'desconocido';
            }
            if (typeof originalOnAfterExpand === 'function') {
                originalOnAfterExpand.apply(this, arguments);
            }
        };
    }
}

// --- Global initialization ---
(function initAll() {
    syncTipoEjerFromOpener();
    patchExpander();
    initTracking();
})();

// ALL INTEGRED BY CORAL
