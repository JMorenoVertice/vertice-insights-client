export function updateTipoEjerOnClick(el) {
  const ejercicioEl = el.closest('[data-ejercicio], [data-tipo], .ejercicio, [data-src], [src]');
  if (ejercicioEl) {
    const tipo =
      ejercicioEl.getAttribute('data-ejercicio') ||
      ejercicioEl.getAttribute('data-tipo') ||
      ejercicioEl.getAttribute('data-src') ||
      ejercicioEl.getAttribute('src') ||
      (ejercicioEl.classList.contains('ejercicio') ? 'ejercicio' : null);
    if (tipo && Array.isArray(window.scoEjerciciosTipo)) {
      const filename = String(tipo).split('/').pop();
      const ejercicio = window.scoEjerciciosTipo.find(ejer => ejer.url === filename);
      window.tipoEjer = ejercicio ? ejercicio.tipo : tipo;
    } else if (tipo) {
      window.tipoEjer = tipo;
    }
  }
}
// ALL MODULED BY CORAL JÁCOME