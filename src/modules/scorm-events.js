// ALL INTEGRED BY CORAL
console.log("////////// EVENTS IS CONNECTED AND RUNNING //////////");

// --- VARIABLE GLOBAL PARA EL TIPO DE EJERCICIO ---
window.tipoEjer = null;

// --- SINCRONIZAR EL TIPO DE EJERCICIO EN POPUP ---
(function syncTipoEjerFromOpener() {
    try {
        if (window.opener && typeof window.opener.tipoEjer !== 'undefined') {
            window.tipoEjer = window.opener.tipoEjer;
            console.log("Tipo de ejercicio sincronizado desde el padre:", window.tipoEjer);
        }
    } catch (e) {
        window.tipoEjer = 'desconocido';
    }
})();

// --- ACTUALIZACIÓN DINÁMICA DEL TIPO DE EJERCICIO EN PRINCIPAL (LINEARSNO.js) ---
if (typeof hs !== 'undefined' && hs.Expander && hs.Expander.prototype) {
    const originalOnAfterExpand = hs.Expander.prototype.onAfterExpand;
    hs.Expander.prototype.onAfterExpand = function() {
        var src = this.src;
        var filename = src.split('/').pop();
        if (filename.startsWith('pest')) {
            try {
                if (typeof scoEjerciciosTipo !== 'undefined' && filename) {
                    const ejercicio = scoEjerciciosTipo.find(ejer => ejer.url === filename);
                    window.tipoEjer = ejercicio ? ejercicio.tipo : 'desconocido';
                    if (['generico', 'pilas'].includes(window.tipoEjer)) {
                        let iframeDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;
                        let linkCSS = iframeDoc.querySelector('link[href="resources/ejercicioshtml.css"]');
                        if (linkCSS) linkCSS.href = "resources/ejercicioshtmlv0.css";
                    }
                }
            } catch (error) {
                window.tipoEjer = 'desconocido';
            }
        }
        if (typeof originalOnAfterExpand === 'function') {
            originalOnAfterExpand.apply(this, arguments);
        }
    };
}

// --- FUNCIONES AUXILIARES ---
function logElementAction(context, el, action) {
    let info = {
        tag: el.tagName,
        id: el.id,
        class: el.className,
        name: el.getAttribute('name'),
        title: el.getAttribute('title'),
        text: (el.innerText || el.value || '').trim(),
        type: el.type || undefined,
        tipoEjer: window.tipoEjer || 'desconocido'
    };
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) {
        info.value = el.value;
        if (el.type === 'checkbox' || el.type === 'radio') info.checked = el.checked;
    }
    console.log(`[${context}] ${action} en:`, info);
}

// --- TRACKING UNIVERSAL ---
(function universalTracking() {
    // Detectar contexto
    let context = 'PADRE';
    if (window.opener && window.name) context = 'POPUP';
    if (window !== window.parent && window.frameElement) context = 'IFRAME';

    // Tracking global
    document.addEventListener('click', e => logElementAction(context, e.target, 'Click'));
    document.addEventListener('input', e => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction(context, e.target, 'Input');
    });
    document.addEventListener('change', e => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction(context, e.target, 'Change');
    });

    // Tracking específico en #SCOCONTENT si existe
    const scoContent = document.getElementById('SCOCONTENT');
    if (scoContent) {
        scoContent.addEventListener('click', e => logElementAction(`${context}/#SCOCONTENT`, e.target, 'Click'));
        scoContent.addEventListener('input', e => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction(`${context}/#SCOCONTENT`, e.target, 'Input');
        });
        scoContent.addEventListener('change', e => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction(`${context}/#SCOCONTENT`, e.target, 'Change');
        });
    }

    // Tracking en iframes solo si estamos en documento principal
    if (context === 'PADRE') {
        const iframe = document.getElementById('scoFrame');
        if (iframe) {
            iframe.addEventListener('load', function() {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    iframeDoc.addEventListener('click', e => logElementAction('IFRAME', e.target, 'Click'));
                    iframeDoc.addEventListener('input', e => {
                        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction('IFRAME', e.target, 'Input');
                    });
                    iframeDoc.addEventListener('change', e => {
                        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction('IFRAME', e.target, 'Change');
                    });
                    const scoContentIframe = iframeDoc.getElementById('SCOCONTENT');
                    if (scoContentIframe) {
                        scoContentIframe.addEventListener('click', e => logElementAction('IFRAME/#SCOCONTENT', e.target, 'Click'));
                        scoContentIframe.addEventListener('input', e => {
                            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction('IFRAME/#SCOCONTENT', e.target, 'Input');
                        });
                        scoContentIframe.addEventListener('change', e => {
                            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) logElementAction('IFRAME/#SCOCONTENT', e.target, 'Change');
                        });
                    }
                } catch (err) {}
            });
        }
    }
})();

// ALL INTEGRED BY CORAL
