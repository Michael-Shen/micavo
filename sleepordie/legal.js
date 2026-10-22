// Builds a table of contents from the policy's section headings (shows in the visible language,
// and rebuilds when the language is switched).
(function () {
  var cards = [].slice.call(document.querySelectorAll('.legal-card h2'));
  if (!cards.length) return;
  var layout = document.querySelector('.legal-layout');
  var nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', 'On this page');
  var list = document.createElement('ol');
  nav.appendChild(list);
  layout.appendChild(nav);
  cards.forEach(function (h, i) { h.parentNode.id = 'sec-' + (i + 1); h.parentNode.style.scrollMarginTop = '88px'; });
  function visibleText(h) {
    var spans = [].slice.call(h.querySelectorAll('span'));
    for (var i = 0; i < spans.length; i++) {
      if (getComputedStyle(spans[i]).display !== 'none') return spans[i].textContent;
    }
    return h.textContent;
  }
  function render() {
    list.innerHTML = '';
    cards.forEach(function (h, i) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#sec-' + (i + 1);
      a.textContent = visibleText(h).replace(/^\d+\.\s*/, '');
      li.appendChild(a);
      list.appendChild(li);
    });
  }
  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
})();
