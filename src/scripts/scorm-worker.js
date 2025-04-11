// INTEGRED BY: CORAL
window.addEventListener("DOMContentLoaded", function () {
    // EXTERNALS SCRIPTS
    function loadScript(url) {
        var script = document.createElement("script");
        script.src = "./modules/scorm-events.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
        console.log("Script cargado dinámicamente:", script.src);
    }

    // START SCORM
    console.log("*****DOM completamente cargado.*****");

    // VERIFY API
    if (typeof API === "undefined" || API === null) {
        console.error("El objeto API no está definido.");
        return;
    } else {
        console.log("*****El objeto API esta disponible.*****");
    }

    // USER DATA ANTONELA
    function getStudentName() {
        try {
            console.log("Intentando obtener el nombre del estudiante...");
            var studentName = API.LMSGetValue("cmi.core.student_name");
            if (API.LMSGetLastError() !== "0") {
                console.error("Error al obtener el nombre del estudiante:", API.LMSGetErrorString(API.LMSGetLastError()));
                return null;
            }
            console.log("*****Nombre del estudiante obtenido:*****", studentName);
            return studentName;
        } catch (e) {
            console.error("Excepcion en getStudentName:", e);
            return null;
        }
    }

    function getStudentId() {
        try {
            console.log("Intentando obtener el ID del estudiante...");
            var studentId = API.LMSGetValue("cmi.core.student_id");
            if (API.LMSGetLastError() !== "0") {
                console.error("Error al obtener el ID del estudiante:", API.LMSGetErrorString(API.LMSGetLastError()));
                return null;
            }
            console.log("*****ID del estudiante obtenido:*****", studentId);
            return studentId;
        } catch (e) {
            console.error("Excepción en getStudentId:", e);
            return null;
        }
    }
    // STATUS DATA ANTONELA
    function getLessonStatus() {
        try {
            console.log("Intentando obtener el estado de la leccion...");
            var lessonStatus = API.LMSGetValue("cmi.core.lesson_status");
            if (API.LMSGetLastError() !== "0") {
                console.error("Error al obtener el estado de la leccion:", API.LMSGetErrorString(API.LMSGetLastError()));
                return null;
            }
            console.log("*****Estado de la leccion obtenido:*****", lessonStatus);
        } catch (e) {
            console.error("Excepcion en getLessonStatus:", e);
            return null;
        }
    }

    // DEVICE DATA CORAL
    function getDeviceData() {
        try {
            console.log("Intentando obtener los datos del dispositivo...");
            var resolution = `${window.screen.width}x${window.screen.height}`;
            var language = navigator.language;
            var cookies_enabled = cookies_enabled ? "Enabled" : "Disabled";
            var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            var device_memory = navigator.deviceMemory || "Unknown Memory";
            var connection_type = navigator.connection ? navigator.connection.effectiveType : "Unknown Connection";
            // DEVICE TYPE
            var deviceData = `Navigator: ${navigator.userAgent} - Language: ${language} - Resolution: ${resolution} - Cookies: ${cookies_enabled} - Timezone: ${timezone} - Device Memory: ${device_memory} - Connection (2G/3G/4G/5G): ${connection_type}`;
            console.log("*****Datos del dispositivo obtenidos:*****", deviceData);
            return deviceData;
        } catch (e) {
            console.error("Excepcion en getDeviceData:", e);
            return null;
        }
    }
    // FINGERPRINT CORAL
    async function getfingerprint() {
        try {
            console.log("Intentando obtener la huella digital del dispositivo...");
            const rawData = `${getStudentName()}${getStudentId()}${getDeviceData()}${getLessonStatus()}`;
            const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawData));
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const fingerprint = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
            console.log("*****Huella digital obtenida:*****", fingerprint);
            console.log("*****Datos obtenidos correctamente.*****");
            return fingerprint;
        } catch (e) {
            console.error("Excepcion en fingerprint:", e);
            return null;
        }
    }
    console.log("Iniciando obtencion de datos...");
    getStudentName();
    getStudentId();
    getDeviceData();
    getLessonStatus();
    getfingerprint();
    loadScript("./modules/scorm-events.js");
});
// INTEGRED BY: CORAL