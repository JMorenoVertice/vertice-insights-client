import { initTracking } from './modules/scorm-events';
import { logElementAction } from './modules/scorm/logElementAction';
// ... importar otras funciones según sea necesario ...

console.log("////////// SCORM WORKER INITIALIZED //////////");

// --- Initialize all modules ---
function initializeModules(): void {
  initTracking();
  // Llamar a otras funciones o inicializaciones según sea necesario
}

// --- Start the application ---
initializeModules();

/// ESTE ARCHIVO IMPORTA Y COORDINA TODAS LAS FUNCIONES NECESARIAS, CENTRALIZANDO EL 
// CONTROL DE LA APLICACIÓN. NO DEBERÍA CONTENER LÓGICA ESPECÍFICA, SOLO IMPORTAR Y EXPORTAR FUNCIONES.
