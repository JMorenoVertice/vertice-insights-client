self.addEventListener("message", function(event) {
  if (event.data === "start") {
    startWorker();
  }
});

function startWorker() {
  console.log('worker');
}