 // --- VERIFY SCORM API ---
 var findAPITries = 0;

 function findAPI(win: Window & typeof globalThis) {
     while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
         findAPITries++;
         if (findAPITries > 7) {
             alert("Error finding API -- too deeply nested.");
             return null;
         }
         win = win.parent;
     }
     return win.API;
 }

 function getAPI() {
     var theAPI = findAPI(window);
     if ((theAPI == null) && (window.opener != null) && (typeof (window.opener) != "undefined")) {
         theAPI = findAPI(window.opener);
     }
     if (theAPI == null) {
         alert("Unable to find an API adapter");
     }
     return theAPI;
 }

 // --- USE SCORM API ---
 var API = getAPI();
 if (!API) {
     console.error("API object is not defined.");
     return;
 } else {
     console.log("*****API object is available.*****");
 }

 // --- INITIALIZE SCORM API ---
 var initialized = API.LMSInitialize("");
 if (initialized !== "true") {
     var err = API.LMSGetLastError();
     var errStr = API.LMSGetErrorString(err);
     console.error("Error initializing SCORM API:", errStr);
     return; // Stop execution if initialization fails
 } else {
     console.log("SCORM API initialized successfully.");
 }