// Language switching for the span-based pages (.en / .zh / .ja).
// Page sets window.PAGE_META = { title: {en,zh,ja}, description: {en,zh,ja} } before loading this file.
(function () {
  var META = window.PAGE_META || {};
  var HTML_LANG = { en: 'en', zh: 'zh-Hant', ja: 'ja' };

  // Official App Store listings (same set the product pages use), per language.
  var STORE = {
    eatornot: {
      en: 'https://apps.apple.com/us/app/eatornot-ai/id6771192711',
      zh: 'https://apps.apple.com/us/app/eatornot-ai-%E7%86%B1%E9%87%8F%E6%95%99%E7%B7%B4/id6771192711?l=zh-Hant-TW',
      ja: 'https://apps.apple.com/jp/app/eatornot-ai/id6771192711?l=ja'
    },
    outshine: {
      en: 'https://apps.apple.com/us/app/outshine/id6782229641',
      zh: 'https://apps.apple.com/tw/app/outshine/id6782229641?l=zh-Hant-TW',
      ja: 'https://apps.apple.com/jp/app/outshine/id6782229641'
    },
    critical_choice: {
      en: 'https://apps.apple.com/tw/app/critical-choice/id6756776644?l=en-GB',
      zh: 'https://apps.apple.com/tw/app/%E9%97%9C%E9%8D%B5%E4%BB%BB%E5%8B%99/id6756776644',
      ja: 'https://apps.apple.com/jp/app/critical-choice/id6756776644?l=ja'
    },
    tallcenter: {
      en: 'https://apps.apple.com/tw/app/id6797482622',
      zh: 'https://apps.apple.com/tw/app/tallcenter-%E8%BA%AB%E9%AB%98%E9%A0%90%E6%B8%AC%E8%88%87%E6%88%90%E9%95%B7%E8%BF%BD%E8%B9%A4/id6797482622?l=zh-Hant-TW',
      ja: 'https://apps.apple.com/tw/app/id6797482622?l=ja'
    },
    flipordie: {
      en: 'https://apps.apple.com/us/app/flipordie-phone-focus-timer/id6814387401',
      zh: 'https://apps.apple.com/us/app/flipordie-%E6%88%92%E6%89%8B%E6%A9%9F%E8%87%AA%E5%BE%8B%E6%8C%91%E6%88%B0/id6814387401?l=zh-Hant-TW',
      ja: 'https://apps.apple.com/jp/app/flipordie-%E7%BF%92%E6%85%A3%E5%8C%96-%E5%85%88%E5%BB%B6%E3%81%B0%E3%81%97%E9%98%B2%E6%AD%A2/id6814387401'
    }
  };

  function apply(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = HTML_LANG[lang];
    if (META.title && META.title[lang]) document.title = META.title[lang];
    var d = document.querySelector('meta[name="description"]');
    if (d && META.description && META.description[lang]) d.setAttribute('content', META.description[lang]);
    document.querySelectorAll('[data-app]').forEach(function (a) {
      var urls = STORE[a.getAttribute('data-app')];
      if (urls) a.href = urls[lang] || urls.en;
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      var on = b.getAttribute('data-lang-btn') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  var q = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('micavo-lang'); } catch (e) {}
  var nav = (navigator.language || '').toLowerCase();
  var pick = HTML_LANG[q] ? q : (HTML_LANG[saved] ? saved : (nav.indexOf('zh') === 0 ? 'zh' : nav.indexOf('ja') === 0 ? 'ja' : 'en'));
  apply(pick);

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-btn]');
    if (!b) return;
    var l = b.getAttribute('data-lang-btn');
    apply(l);
    try { localStorage.setItem('micavo-lang', l); } catch (err) {}
  });
})();
