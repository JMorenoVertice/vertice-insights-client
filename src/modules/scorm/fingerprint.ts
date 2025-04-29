export function generateFingerprint(): string {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    const fingerprint = [
        navigatorInfo.userAgent,
        navigatorInfo.language,
        screenInfo.width,
        screenInfo.height,
        screenInfo.colorDepth,
        new Date().getTimezoneOffset(),
        !!window.sessionStorage,
        !!window.localStorage,
        !!window.indexedDB,
        // Solo incluir si se quiere compatibilidad con IE
        // document.body && typeof document.body.addBehavior === 'function',
    ].join('::');

    // Codificar correctamente a base64
    return btoa(unescape(encodeURIComponent(fingerprint)));
}
