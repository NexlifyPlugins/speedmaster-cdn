/* ============================================================
   SpeedMaster Auto PRO - License Protection Layer (Unified)
   ============================================================ */

(async function () {
  try {
    const LICENSE = (window.SPEEDMASTER_LICENSE || "").trim();
    const DOMAIN = location.hostname;
    const VERIFY_URL = "https://ancient-fire-7f4e.contentdz2024.workers.dev/verify";

    window.__SPEEDMASTER_ALLOWED__ = false;

    if (!LICENSE) {
      console.warn("[SpeedMaster] Missing license");
      return;
    }

    const url =
      `${VERIFY_URL}?license=${encodeURIComponent(LICENSE)}` +
      `&domain=${encodeURIComponent(DOMAIN)}`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.warn("[SpeedMaster] License server error");
      return;
    }

    const data = await response.json();

    if (!data || data.valid !== true) {
      console.warn("[SpeedMaster] Invalid license");
      return;
    }

    window.__SPEEDMASTER_ALLOWED__ = true;
    console.log("[SpeedMaster] License verified");
  } catch (e) {
    console.warn("[SpeedMaster] License check failed");
  }
})();

/* ============================================================
   SpeedMaster Auto PRO - Core Optimization Engine
   ============================================================ */

(function () {
  if (!window.__SPEEDMASTER_ALLOWED__) return;

  console.log("[SpeedMaster] Optimization enabled");

  // Lazy load images
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });

  // Defer non-critical scripts
  document.querySelectorAll("script").forEach((script) => {
    if (
      script.src &&
      !script.defer &&
      !script.async &&
      !script.src.includes("speedmaster")
    ) {
      script.defer = true;
    }
  });

  // Preconnect common origins
  const origins = new Set();
  document.querySelectorAll("script[src],link[href]").forEach((el) => {
    try {
      const url = new URL(el.src || el.href);
      origins.add(url.origin);
    } catch (e) {}
  });

  origins.forEach((origin) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);
  });
})();
