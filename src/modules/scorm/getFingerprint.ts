// --- DEVICE FINGERPRINT, USER/DEVICE DATA, LESSON STATUS ---
async function getFingerprint() {
    try {
        console.log("Trying to get device fingerprint...");
        console.log("Trying to get user data...");
        console.log("Trying to get device data...");
        var studentName = API.LMSGetValue("cmi.core.student_name");
        var studentId = API.LMSGetValue("cmi.core.student_id");
        var resolution = `${window.screen.width}x${window.screen.height}`;
        var language = navigator.language;
        var cookies_enabled = navigator.cookieEnabled ? "Enabled" : "Disabled";
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var device_memory = navigator.deviceMemory || "Unknown Memory";
        var connection_type = navigator.connection ? navigator.connection.effectiveType : "Unknown Connection";
        var deviceData = `Navigator: ${navigator.userAgent} - Language: ${language} - Resolution: ${resolution} - Cookies: ${cookies_enabled} - Timezone: ${timezone} - Device Memory: ${device_memory} - Connection (2G/3G/4G/5G): ${connection_type}`;
        var lessonStatus = API.LMSGetValue("cmi.core.lesson_status");
        const rawData = `${studentName}${studentId}${deviceData}${lessonStatus}`;
        const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawData));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const fingerprint = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
        console.log("*****Student name obtained:*****", studentName);
        console.log("*****Student ID obtained:*****", studentId);
        console.log("*****Device data obtained:*****", deviceData);
        console.log("*****Lessons status obtained:*****", lessonStatus);
        console.log("*****Device fingerprint obtained:*****", fingerprint);
        console.log("*****Data obtained successfully.*****");
        return fingerprint;
    } catch (e) {
        console.error("Exception in user data and fingerprint:", e);
        return null;
    }
}

console.log("Starting data retrieval...");
getFingerprint();