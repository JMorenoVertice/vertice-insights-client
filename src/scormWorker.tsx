// Mock SCORM API for testing
const SCORM = {
  Init: () => {
    console.log("SCORM session initialized.");
    return true;
  },
  GetValue: (key) => {
    const mockData = {
      "cmi.core.student_name": "John Doe",
      "cmi.core.student_email": "john.doe@example.com",
      "cmi.core.user_data": "",
      "cmi.core.warning": "",
    };
    return mockData[key] || "";
  },
  SetValue: (key, value) => {
    console.log(`SCORM.SetValue called with key: ${key}, value: ${value}`);
    return true;
  },
  Commit: () => {
    console.log("SCORM data committed.");
    return true;
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
async function generateHash(data) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Main function to create and log the fingerprint
async function createFingerprint() {
  const fingerprint = await generateHash(rawData);

  console.log("User Data:", userData);
  console.log("Device Data:", deviceData);
  console.log("Fingerprint (Hash):", fingerprint);

  // Save the fingerprint in localStorage for consistency checks
  const storedFingerprint = localStorage.getItem("scorm_fingerprint");
  if (!storedFingerprint) {
    localStorage.setItem("scorm_fingerprint", fingerprint);
    console.log("Fingerprint saved for the first time.");
    SCORM.SetValue("cmi.core.user_data", JSON.stringify({ fingerprint }));
    SCORM.Commit();
  } else if (storedFingerprint !== fingerprint) {
    console.warn("Fingerprint mismatch detected!");
    SCORM.SetValue("cmi.core.warning", "device_mismatch");
    SCORM.Commit();
  } else {
    console.log("Fingerprint verified successfully.");
  }
}

// Run the main function
createFingerprint();
