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
  var FIRST_TOUCH_KEY = 'micavo_first_touch_campaign_' + PRODUCT.toLowerCase().replace(/\s+/g, '_');

  // Keep first-touch values so later CTA events retain their original source.
  // GA4 also reads the UTM query parameters automatically.
  try {
    var storedCampaign = window.localStorage.getItem(FIRST_TOUCH_KEY);
    if (Object.keys(CAMPAIGN).length && !storedCampaign) {
      window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(CAMPAIGN));
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

    if (CAMPAIGN.utm_source === 'share_card') {
      trackEvent('share_card_landing', {
        share_method: CAMPAIGN.utm_medium || 'unknown',
        card_template: CAMPAIGN.utm_campaign || 'unknown'
      });
    }
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

    var eventName = el.getAttribute('data-ga-event');
    trackEvent(eventName, params);

    // GA4's recommended lead event makes the primary conversion available
    // to standard acquisition reporting while retaining our detailed event.
    if (eventName === 'waitlist_clicked') {
      trackEvent('generate_lead', {
        method: el.href && el.href.indexOf('mailto:') === 0 ? 'email' : 'website',
        cta_location: params.cta_location || 'unknown',
        link_url: params.link_url,
        link_text: params.link_text
      });
    }
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

  // Measure whether visitors consume the page, without firing repeatedly as
  // they move up and down. These thresholds are intentionally low-cardinality.
  var sentDepths = {};
  function trackScrollDepth() {
    var root = document.documentElement;
    var scrollable = root.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    var percent = Math.round((window.scrollY / scrollable) * 100);
    [25, 50, 75, 90].forEach(function (depth) {
      if (percent >= depth && !sentDepths[depth]) {
        sentDepths[depth] = true;
        trackEvent('scroll_depth', { percent_scrolled: depth });
      }
    });
  }
  window.addEventListener('scroll', trackScrollDepth, { passive: true });

  // FAQ interest is a useful pre-launch intent signal and helps identify the
  // concerns that prevent visitors from joining early access.
  document.addEventListener('toggle', function (e) {
    if (!e.target.matches || !e.target.matches('.faq-list details') || !e.target.open) return;
    var summary = e.target.querySelector('summary');
    trackEvent('faq_opened', {
      faq_question: summary ? summary.textContent.trim().slice(0, 100) : 'unknown'
    });
  }, true);

  // Distinguish a meaningful visit from an immediate bounce. The event only
  // fires while the landing page is visible.
  window.setTimeout(function () {
    if (document.visibilityState === 'visible') {
      trackEvent('engaged_10_seconds');
    }
  }, 10000);
})();
