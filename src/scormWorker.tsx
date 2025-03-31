declare global {
  interface Window {
    contarClics: () => void;
    reiniciarContador: () => void;
  }
}

self.addEventListener("message", function(event) {
  if (event.data === "start") {
    startWorker();
  } else if (event.data === "contarClics") {
    contarClics();
  } else if (event.data === "reiniciarContador") {
    reiniciarContador();
  }
});

function startWorker() {
  console.log('worker');
}

// Función para contar clics
let clickCount = 0;

async function saveClickCountToBackend(clickCount: number) {
  try {
    await fetch('http://localhost:5000/api/saveClickCount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clickCount })
    });
    console.log('Contador guardado en el backend');
  } catch (error) {
    console.error('Error al guardar el contador en el backend:', error);
  }
}

function contarClics() {
  clickCount++;
  self.postMessage({ type: 'clickCount', count: clickCount });
  saveClickCountToBackend(clickCount); // Guardar en el backend
}

// Función para reiniciar el contador
function reiniciarContador() {
  clickCount = 0;
  self.postMessage({ type: 'clickCount', count: clickCount });
}

// Exponer las funciones al scope global para poder usarlas en la consola
window.contarClics = contarClics;
window.reiniciarContador = reiniciarContador;
