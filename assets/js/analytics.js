(function () {
  function detectProduct() {
    var path = window.location.pathname;
    if (path.indexOf('/eatornot') === 0) return 'EatOrNot';
    if (path.indexOf('/outshine') === 0) return 'Outshine';
    return 'Micavo';
  }

  function detectPageType() {
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (/\/(privacy|terms|support)\.html$/.test(path)) return 'legal';
    if (path === '/eatornot/' || path === '/eatornot/index.html' ||
        path === '/outshine/' || path === '/outshine/index.html') return 'product_landing';
    return 'unknown';
  }

  var PRODUCT = detectProduct();
  var PAGE_TYPE = detectPageType();

  function toSnakeCase(str) {
    return str.replace(/-/g, '_');
  }

  // Reusable helper: trackEvent(eventName, extraParams)
  // Automatically attaches product, page_type, page_path, page_title;
  // anything passed in extraParams (e.g. link_url, link_text, cta_location)
  // is merged in and can override the defaults.
  function trackEvent(eventName, extraParams) {
    extraParams = extraParams || {};
    var params = {
      product: PRODUCT,
      page_type: PAGE_TYPE,
      page_path: window.location.pathname,
      page_title: document.title
    };
    Object.keys(extraParams).forEach(function (key) {
      params[key] = extraParams[key];
    });
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  window.trackEvent = trackEvent;

  // Generic CTA click tracking: any element with data-ga-event="..." gets
  // tracked automatically. data-ga-param-foo-bar="x" becomes { foo_bar: "x" }.
  // link_url / link_text are filled in automatically when not set explicitly.
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-ga-event]');
    if (!el) return;

    var params = {};
    Array.prototype.forEach.call(el.attributes, function (attr) {
      if (attr.name.indexOf('data-ga-param-') === 0) {
        var key = toSnakeCase(attr.name.slice('data-ga-param-'.length));
        params[key] = attr.value;
      }
    });

    if (!params.link_url && el.href) params.link_url = el.href;
    if (!params.link_text) {
      params.link_text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    }

    trackEvent(el.getAttribute('data-ga-event'), params);
  });

  // Language switcher tracking. Supports both data-lang-btn (Outshine) and
  // data-lang-switch (EatOrNot) attribute names.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lang-btn], [data-lang-switch]');
    if (!btn) return;
    var lang = btn.getAttribute('data-lang-btn') || btn.getAttribute('data-lang-switch');
    trackEvent('language_changed', { language: lang, cta_location: 'header' });
  });
})();
