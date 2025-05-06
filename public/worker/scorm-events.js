import { logElementAction } from './logElementAction.js';

console.log("////////// EVENTS MODULE LOADED //////////");

const globalScope = typeof window !== "undefined" ? window : self;
if (typeof window !== "undefined") {
    globalScope.tipoEjer = null;
}

export function initTracking() {
    if (typeof document === "undefined") {
        console.warn("initTracking solo debe llamarse en el hilo principal (main thread).");
        return;
    }

    document.addEventListener('click', (e) => logElementAction('PADRE', e.target, 'Click'));
    document.addEventListener('input', (e) => {
        const target = e.target;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
            logElementAction('PADRE', target, 'Input');
    });
    document.addEventListener('change', (e) => {
        const target = e.target;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
            logElementAction('PADRE', target, 'Change');
    });
    window.addEventListener('scroll', () => {
        const scrollHorizontal = window.scrollX;
        const scrollVertical = window.scrollY;
        console.log(`Scroll horizontal: ${scrollHorizontal}px, Scroll vertical: ${scrollVertical}px`);
        logElementAction('PADRE', window, `Scroll X:${scrollHorizontal} Y:${scrollVertical}`);
    });
}

export function setTipoEjer(tipoEjer) {
    if (typeof window !== "undefined") {
        globalScope.tipoEjer = tipoEjer;
        console.log("Tipo de ejercicio establecido:", tipoEjer);
    }
}

export function getTipoEjer() {
    if (typeof window !== "undefined") {
        return globalScope.tipoEjer;
    }
    return null;
}

export function getIframeInfo() {
    if (typeof window !== "undefined") {
        const iframeEl = window.frameElement;
        if (iframeEl && iframeEl.tagName === 'IFRAME') {
            return {
                width: iframeEl.offsetWidth || iframeEl.width || null,
                height: iframeEl.offsetHeight || iframeEl.height || null
            };
        }
    }
    return null;
}
// ALL MODULED BY CORAL JÁCOME