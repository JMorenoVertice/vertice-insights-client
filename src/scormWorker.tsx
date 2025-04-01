// Mock SCORM API for testing 
const SCORM = {
  GetValue: (key) => {
    const mockData = {
      "cmi.core.student_name": "Coral",
      "cmi.core.student_email": "coral@gmail.com",
      "cmi.core.user_data": "",
      "cmi.core.warning": "",
    };
    return mockData[key] || "";
  },
};

// Collect user data from SCORM 
const userData = {
  name: SCORM.GetValue("cmi.core.student_name") || "Unknown User",
  email: SCORM.GetValue("cmi.core.student_email") || "Unknown Email",
};

// Collect basic device information 
const deviceData = {
  browser: navigator.userAgent,
  resolution: `${screen.width}x${screen.height}`,
  language: navigator.language,
};

// Combine all data into a single string 
const rawData = `${userData.name}|${userData.email}|${deviceData.browser}|${deviceData.resolution}|${deviceData.language}`;

// Generate a simple hash (SHA-256)
const generateHash = async (data) =>
  Array.from(
    new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data)))
  ).map((byte) => byte.toString(16).padStart(2, "0")).join("");

// Main function to create and log the fingerprint 
async function createFingerprint() {
  const fingerprint = await generateHash(rawData);
  console.log("User Data:", userData);
  console.log("Device Data:", deviceData);
  console.log("Fingerprint (Hash):", fingerprint);
  console.log("Raw Data:", rawData);
}

// Event listener for messages from the main thread. 
self.addEventListener("message", function (event) {
  switch (event.data.type) {
    case "start":
      startWorker();
      break;
    case "initialize":
      initializeWorker();
      break;
    case "status":
      handleStatusMessage(event.data);
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
  self.postMessage({ type: "status", data: "Worker initialized successfully" });
}

// Function to handle status messages 
function handleStatusMessage(data) {
  console.log("Status message received by worker:", data);
}

// Immediately invoke the initializeWorker function when the worker script is loaded. 
initializeWorker();
// Generate the fingerprint when the worker is loaded. 
createFingerprint();