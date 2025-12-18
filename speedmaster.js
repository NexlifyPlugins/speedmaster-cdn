(function () {
  const LICENSE_KEY = window.SPEEDMASTER_LICENSE || "";
  const DOMAIN = location.hostname;
  const VERIFY_URL = "https://ancient-fire-7f4e.contentdz2024.workers.dev/verify";

  fetch(`${VERIFY_URL}?license=${encodeURIComponent(LICENSE_KEY)}&domain=${encodeURIComponent(DOMAIN)}`)
    .then(r => r.json())
    .then(res => {
      if (!res.valid) {
        console.warn("[SpeedMaster] License check failed");
        return;
      }

      console.log("[SpeedMaster] License valid");
      window.SPEEDMASTER_ENABLED = true;
    })
    .catch(() => {
      console.warn("[SpeedMaster] License server unreachable");
    });
})();
/* =========================================================
   SpeedMaster Auto PRO – License Protection Layer
========================================================= */
(async function () {
  try {
    const LICENSE = window.SPEEDMASTER_LICENSE;
    const DOMAIN = location.hostname;

    if (!LICENSE) {
      console.warn("[SpeedMaster] Missing license");
      return;
    }

    const response = await fetch(
      "https://ancient-fire-7f4e.contentdz2024.workers.dev/verify" +
        "?license=" + encodeURIComponent(LICENSE) +
        "&domain=" + encodeURIComponent(DOMAIN),
      { cache: "no-store" }
    );

    const data = await response.json();

    if (!data.valid) {
      console.warn("[SpeedMaster] Invalid license");
      return;
    }

    window.__SPEEDMASTER_ALLOWED__ = true;
    console.log("[SpeedMaster] License verified");

  } catch (e) {
    console.warn("[SpeedMaster] License check failed");
    return;
  }
})();

/* =========================================================
   SpeedMaster Auto PRO – Core Optimization Engine
========================================================= */
(function () {
  if (!window.__SPEEDMASTER_ALLOWED__) return;

  console.log("[SpeedMaster] Optimization enabled");

  /* ---------- Lazy Load Images ---------- */
  document.querySelectorAll("img").forEach(img => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });

  /* ---------- Defer Non-Critical Scripts ---------- */
  document.querySelectorAll("script").forEach(script => {
    if (
      script.src &&
      !script.defer &&
      !script.async &&
      !script.src.includes("speedmaster")
    ) {
      script.defer = true;
    }
  });

  /* ---------- Preconnect Common Origins ---------- */
  const origins = new Set();
  document.querySelectorAll("script[src],link[href]").forEach(el => {
    try {
      const url = new URL(el.src || el.href);
      origins.add(url.origin);
    } catch (e) {}
  });

  origins.forEach(origin => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);
  });

})();
