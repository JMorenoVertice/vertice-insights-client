<<<<<<< HEAD
// Event listener for messages from the main thread.
self.addEventListener("message", function (event) {
  switch (event.data) {
    case "start":
      startWorker();
      break;
    case "initialize":
      initializeWorker();
      break;
    default:
      console.warn("Unknown message received by worker:", event.data);
      break;
  }
});

// Event listener for the initial execution of the worker.
self.addEventListener("messageerror", (event) => {
  console.error("Error receiving message:", event);
});

self.addEventListener("error", (event) => {
  console.error("Error in worker:", event);
});

// Function to be executed when the worker receives the "start" message.
function startWorker() {
  console.log("Worker started!");
  // Add your SCORM-related logic here.
}

// Function to be executed when the worker is initialized.
function initializeWorker() {
  console.log("Worker initialized!");
  // Perform any setup tasks here, such as loading initial data.
  // You could also send a message back to the main thread to indicate that initialization is complete.
  self.postMessage("Worker initialized successfully");
}

// Immediately invoke the initializeWorker function when the worker script is loaded.
initializeWorker();
=======
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
>>>>>>> prueba1
