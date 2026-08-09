(function () {
  function detectProduct() {
    var path = window.location.pathname;
    if (path.indexOf('/tallcenter') === 0) return 'TallCenter';
    if (path.indexOf('/eatornot') === 0) return 'EatOrNot';
    if (path.indexOf('/outshine') === 0) return 'Outshine';
    if (path.indexOf('/critical_choice') === 0) return 'Critical Choice';
    return 'Micavo';
  }

  function detectPageType() {
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (/\/(privacy|terms|support|privacy-policy)\.html$/.test(path)) return 'legal';
    if (path === '/eatornot/' || path === '/eatornot/index.html' ||
        path === '/outshine/' || path === '/outshine/index.html' ||
        path === '/critical_choice/' || path === '/critical_choice/index.html' ||
        path === '/tallcenter/' || path === '/tallcenter/index.html') return 'product_landing';
    return 'unknown';
  }

  var PRODUCT = detectProduct();
  var PAGE_TYPE = detectPageType();

  function readCampaign() {
    var query = new URLSearchParams(window.location.search);
    var campaign = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'].forEach(function (key) {
      var value = query.get(key);
      if (value) campaign[key] = value.slice(0, 100);
    });
    return campaign;
  }

  var CAMPAIGN = readCampaign();

  // Keep first-touch values so later CTA events retain their original source.
  // GA4 also reads the UTM query parameters automatically.
  try {
    var storedCampaign = window.localStorage.getItem('micavo_first_touch_campaign');
    if (Object.keys(CAMPAIGN).length && !storedCampaign) {
      window.localStorage.setItem('micavo_first_touch_campaign', JSON.stringify(CAMPAIGN));
    } else if (!Object.keys(CAMPAIGN).length && storedCampaign) {
      CAMPAIGN = JSON.parse(storedCampaign) || {};
    }
  } catch (_) {
    // Continue without persistence when storage is unavailable.
  }

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
    Object.keys(CAMPAIGN).forEach(function (key) {
      params[key] = CAMPAIGN[key];
    });
    Object.keys(extraParams).forEach(function (key) {
      params[key] = extraParams[key];
    });
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  window.trackEvent = trackEvent;

  if (PAGE_TYPE === 'product_landing') {
    trackEvent('landing_view');
  }

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

  // Language switcher tracking. Supports data-lang-btn (Outshine),
  // data-lang-switch (EatOrNot), and .lang-btn[data-lang] (Critical Choice).
  // Note: scoped to .lang-btn specifically (not a bare [data-lang] selector)
  // because EatOrNot's <html> tag also carries its own data-lang attribute,
  // which closest() would otherwise match on every single click.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lang-btn], [data-lang-switch], .lang-btn[data-lang]');
    if (!btn) return;
    var lang = btn.getAttribute('data-lang-btn') || btn.getAttribute('data-lang-switch') || btn.getAttribute('data-lang');
    trackEvent('language_changed', { language: lang, cta_location: 'header' });
  });
})();
