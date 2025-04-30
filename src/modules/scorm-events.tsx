import { logElementAction } from './scorm/logElementAction';

console.log("////////// EVENTS MODULE LOADED //////////");

// --- GLOBAL VARIABLE FOR EXERCISE TYPE ---
declare global {
    interface Window {
        tipoEjer: string | null;
        scoEjerciciosTipo?: { url: string; tipo: string }[];
        hs?: any;
    }
}
window.tipoEjer = null;

// --- Export initTracking for external control ---
export function initTracking(): void {
    document.addEventListener('click', e => logElementAction('PADRE', e.target, 'Click'));
    document.addEventListener('input', e => {
        const target = e.target as HTMLElement;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
            logElementAction('PADRE', target, 'Input');
    });
    document.addEventListener('change', e => {
        const target = e.target as HTMLElement;
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

//ACTUA COMO UN ARCHIVO DE SOPORTE QUE EXPORTA FUNCIONE PERO NO EJECUTA LOGICA DIRECTAMENTE 
