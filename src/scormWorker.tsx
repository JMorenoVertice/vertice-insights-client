// ////CODIGO 1 datos basicos///
// self.addEventListener("message", function (event) {
//   if (event.data === "start") {
//     startWorker();
//   } else if (event.data === "getUserInfo") {
//     getUserInfo();
//   }
// });
 
// function startWorker() {
//   console.log("Worker iniciado...");
//   getUserInfo();
// }
 
// function getUserInfo() {
//   const userData = {
//     nombre: "Usuario Demo", // obtener datos del usuario
//     email: "usuario@demo.com",
//     dispositivo: detectarDispositivo(),
    
//   };
 
//   // Enviar los datos al hilo principal
//   self.postMessage(userData);
//   console.log(userData);
// }
 
// function detectarDispositivo() {
//   const ua = navigator.userAgent;
//   if (/mobile/i.test(ua)) return "Móvil";
//   if (/tablet/i.test(ua)) return "Tablet";
//   return "Escritorio";
// }
///self.postMessage("start") por consola//





//CODIGO 2 hash o identificador///

// codigo que crea y utiliza un Web Worker desde el hilo principal

// Creamos un Worker usando un Blob con el codigo del Worker
const workerBlob = new Blob([`
  self.addEventListener("message", function (event) {
    console.log("Mensaje recibido en el worker:", event.data);
    
    if (event.data === "start") {
      console.log("Iniciando worker...");
      startWorker();
    } else if (event.data === "getUserInfo") {
      console.log("Obteniendo información del usuario...");
      getUserInfo();
    }
  });

  function startWorker() {
    console.log("Worker iniciado...");
    getUserInfo();
  }

  async function getUserInfo() {
    const userData = {
      nombre: "Usuario Demo",
      email: "usuario@demo.com",
      dispositivo: detectarDispositivo(),
    };

    console.log("Datos del usuario antes del hash:", userData);

    try {
      const hash = await generarHash(JSON.stringify(userData));
      userData.hash = hash;
      console.log("Hash generado:", hash);
      console.log("Datos finales del usuario:", userData);
      self.postMessage(userData);
    } catch (error) {
      console.error("Error al generar el hash:", error);
      self.postMessage({ error: "Error al generar el hash" });
    }
  }

  function detectarDispositivo() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Móvil";
    if (/tablet/i.test(ua)) return "Tablet";
    return "Escritorio";
  }

  async function generarHash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
`], { type: 'application/javascript' });

// Creamos un URL para el Worker
const workerURL = URL.createObjectURL(workerBlob);

// Creamos el Worker
const worker = new Worker(workerURL);

// Recibimos los mensajes del Worker
worker.onmessage = function(event) {
  console.log('Respuesta del Worker:', event.data);
};

// Enviamos el mensaje "start" para que el Worker inicie su procesamiento
worker.postMessage("start");
