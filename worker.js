
self.addEventListener("message", (e) => {//se agrega el evento message que se activa cuando la ventana recibe un mensaje
if (e.data === "start") console.log("worker");//si el mensaje es start, se imprime en la consola
});
