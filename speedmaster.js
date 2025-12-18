(async function () {
  try {
    const script = document.currentScript;
    const license = script?.getAttribute("data-license");
    const domain = location.hostname;

    if (!license) {
      console.warn("[SpeedMaster] License missing. Disabled.");
      return; // ⛔ إيقاف كامل
    }

    const res = await fetch(
      "https://ancient-fire-7f4e.contentdz2024.workers.dev/verify" +
      "?license=" + encodeURIComponent(license) +
      "&domain=" + encodeURIComponent(domain)
    );

    const data = await res.json();

    if (!data.valid) {
      console.warn("[SpeedMaster] Invalid license. Disabled.");
      return; // ⛔ إيقاف كامل
    }

    // ✅ الترخيص صحيح — نكمل تشغيل SpeedMaster
    window.__SPEEDMASTER_ACTIVE__ = true;

  } catch (e) {
    console.warn("[SpeedMaster] License check failed. Disabled.", e);
    return; // ⛔ أمان إضافي
  }
})();

(function () {
  'use strict';

  if (window.__SPEEDMASTER_ACTIVE__) return;
  window.__SPEEDMASTER_ACTIVE__ = true;

  console.log('[SpeedMaster] Script loaded');

  // Lazy-load images
  document.querySelectorAll('img:not([loading])').forEach(function (img) {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // Defer non-critical scripts
  document.querySelectorAll('script[src]').forEach(function (s) {
    var src = s.getAttribute('src') || '';
    if (
      !s.defer &&
      !s.async &&
      !/google|gtag|analytics|stripe|paypal/i.test(src)
    ) {
      s.defer = true;
    }
  });

  // Preconnect common CDNs
  ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(function (href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = href;
    l.crossOrigin = '';
    document.head.appendChild(l);
  });

  console.log('[SpeedMaster] Optimization enabled');
})();
