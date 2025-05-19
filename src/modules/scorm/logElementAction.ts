import { getParentStructure } from './getParentStructure';
import { getDataAttributes } from './getDataAttributes';
import { updateTipoEjerOnClick } from './updateTipoEjerOnClick';
import { generateFingerprint } from './fingerprint';
import { trackMouseMovement } from './mouseMovementTracker';


export function logElementAction(context: string, el: any, action: string = 'Click'): void {
    if (action === 'Click') updateTipoEjerOnClick(el);

    const fingerprint = generateFingerprint();
    trackMouseMovement();

    let iframeInfo: Record<string, any> = {};
    if (el.tagName === 'IFRAME') {
        iframeInfo.iframeWidth = el.offsetWidth || el.width || null;
        iframeInfo.iframeHeight = el.offsetHeight || el.height || null;
    } else if (context.startsWith('IFRAME')) {
        const iframeEl = window.frameElement as HTMLIFrameElement;
        if (iframeEl?.tagName === 'IFRAME') {
            iframeInfo.iframeWidth = iframeEl.offsetWidth || iframeEl.width || null;
            iframeInfo.iframeHeight = iframeEl.offsetHeight || iframeEl.height || null;
        }
    }

    const info = {
        tag: el.tagName,
        id: el.id,
        class: el.className,
        name: el.getAttribute?.('name'),
        title: el.getAttribute?.('title'),
        text: (el.innerText || el.value || '').trim?.(),
        type: el.type || undefined,
        value: el.value || undefined,
        src: el.getAttribute?.('src'),
        href: el.getAttribute?.('href'),
        alt: el.getAttribute?.('alt'),
        placeholder: el.getAttribute?.('placeholder'),
        ariaLabel: el.getAttribute?.('aria-label'),
        role: el.getAttribute?.('role'),
        tabindex: el.getAttribute?.('tabindex'),
        checked: typeof el.checked === "boolean" ? el.checked : undefined,
        disabled: typeof el.disabled === "boolean" ? el.disabled : undefined,
        readonly: typeof el.readOnly === "boolean" ? el.readOnly : undefined,
        required: typeof el.required === "boolean" ? el.required : undefined,
        data: getDataAttributes(el),
        tipoEjer: window.tipoEjer || 'desconocido',
        padres: getParentStructure(el),
        iframeInfo,
        fingerprint
    };

    console.log(`[${context}] ${action} on:`, info);
}
