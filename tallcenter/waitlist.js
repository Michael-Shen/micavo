(function () {
  'use strict';

  const ENDPOINT = 'https://script.google.com/macros/s/AKfycby2JrHQ-_3PSpJn8L1CbSZy9ejzdWJSCkOxj4M07Lxc5M5zb1IbNkFUSD0a978M5y-N/exec';
  const copy = {
    en: {
      eyebrow: 'TallCenter for iPhone',
      title: 'Be first to try TallCenter.',
      body: 'Leave your email and we’ll let you know when early access opens.',
      label: 'Email address',
      placeholder: 'you@example.com',
      submit: 'Join the waitlist',
      sending: 'Joining…',
      privacy: 'By joining, you agree to receive TallCenter launch updates. You can unsubscribe anytime.',
      successTitle: 'You’re on the list ✨',
      successBody: 'We’ll email you when TallCenter early access is ready.',
      duplicateBody: 'This email is already on the list. We’ll keep you posted.',
      error: 'Something went wrong. Please try again.',
      close: 'Close'
    },
    'zh-Hant': {
      eyebrow: 'TallCenter iPhone 版',
      title: '搶先體驗 TallCenter',
      body: '留下 Email，開放搶先體驗時我們會第一時間通知你。',
      label: 'Email 地址',
      placeholder: 'you@example.com',
      submit: '加入候補名單',
      sending: '加入中…',
      privacy: '加入即表示你同意接收 TallCenter 上線通知；你可以隨時取消訂閱。',
      successTitle: '你已加入候補名單 ✨',
      successBody: 'TallCenter 開放搶先體驗時，我們會寄信通知你。',
      duplicateBody: '這個 Email 已在候補名單中，我們會持續通知你最新消息。',
      error: '送出失敗，請稍後再試一次。',
      close: '關閉'
    },
    ja: {
      eyebrow: 'TallCenter iPhone版',
      title: 'TallCenterを先行体験',
      body: 'メールアドレスを登録すると、先行アクセス開始時にお知らせします。',
      label: 'メールアドレス',
      placeholder: 'you@example.com',
      submit: 'ウェイトリストに参加',
      sending: '登録中…',
      privacy: '登録するとTallCenterのリリース情報を受け取ることに同意したものとします。いつでも配信停止できます。',
      successTitle: '登録が完了しました ✨',
      successBody: 'TallCenterの先行アクセス準備ができ次第、メールでお知らせします。',
      duplicateBody: 'このメールアドレスはすでに登録されています。最新情報をお待ちください。',
      error: '送信できませんでした。もう一度お試しください。',
      close: '閉じる'
    }
  };

  const language = () => {
    const lang = document.documentElement.lang || 'en';
    if (lang.toLowerCase().startsWith('zh')) return 'zh-Hant';
    if (lang.toLowerCase().startsWith('ja')) return 'ja';
    return 'en';
  };

  document.body.insertAdjacentHTML('beforeend', `
    <div class="waitlist-modal" hidden>
      <div class="waitlist-backdrop" data-waitlist-close></div>
      <section class="waitlist-dialog" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
        <button class="waitlist-close" type="button" data-waitlist-close aria-label="Close">×</button>
        <div class="waitlist-content">
          <div class="waitlist-mark" aria-hidden="true">↗</div>
          <p class="waitlist-eyebrow"></p>
          <h2 id="waitlist-title"></h2>
          <p class="waitlist-intro"></p>
          <form class="waitlist-form">
            <label for="waitlist-email"></label>
            <div class="waitlist-field-row">
              <input id="waitlist-email" name="email" type="email" inputmode="email" autocomplete="email" required maxlength="254">
              <button type="submit"></button>
            </div>
            <input class="waitlist-honeypot" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
            <p class="waitlist-privacy"></p>
            <p class="waitlist-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </section>
    </div>`);

  const modal = document.querySelector('.waitlist-modal');
  const dialog = modal.querySelector('.waitlist-dialog');
  const form = modal.querySelector('.waitlist-form');
  const emailInput = modal.querySelector('#waitlist-email');
  const submitButton = form.querySelector('button[type="submit"]');
  const status = modal.querySelector('.waitlist-status');
  let opener = null;

  function localizedCopy() {
    return copy[language()] || copy.en;
  }

  function renderCopy() {
    const text = localizedCopy();
    modal.querySelector('.waitlist-eyebrow').textContent = text.eyebrow;
    modal.querySelector('#waitlist-title').textContent = text.title;
    modal.querySelector('.waitlist-intro').textContent = text.body;
    modal.querySelector('label[for="waitlist-email"]').textContent = text.label;
    emailInput.placeholder = text.placeholder;
    submitButton.textContent = text.submit;
    modal.querySelector('.waitlist-privacy').textContent = text.privacy;
    modal.querySelector('.waitlist-close').setAttribute('aria-label', text.close);
  }

  function openModal(trigger) {
    opener = trigger || document.activeElement;
    renderCopy();
    form.hidden = false;
    form.reset();
    form.querySelector('.waitlist-field-row').hidden = false;
    form.querySelector('label').hidden = false;
    form.querySelector('.waitlist-privacy').hidden = false;
    submitButton.disabled = false;
    submitButton.textContent = localizedCopy().submit;
    status.textContent = '';
    status.className = 'waitlist-status';
    modal.hidden = false;
    document.body.classList.add('waitlist-open');
    requestAnimationFrame(() => {
      modal.classList.add('is-visible');
      emailInput.focus();
    });
  }

  function closeModal() {
    modal.classList.remove('is-visible');
    document.body.classList.remove('waitlist-open');
    window.setTimeout(() => {
      modal.hidden = true;
      if (opener && typeof opener.focus === 'function') opener.focus();
    }, 180);
  }

  document.querySelectorAll('a[href^="mailto:support@micavo.app?subject=TallCenter%20early%20access"]').forEach((cta) => {
    cta.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(cta);
    });
  });

  modal.querySelectorAll('[data-waitlist-close]').forEach((element) => {
    element.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
    if (event.key === 'Tab' && !modal.hidden) {
      const focusable = Array.from(dialog.querySelectorAll('button:not([disabled]),input:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const text = localizedCopy();
    submitButton.disabled = true;
    submitButton.textContent = text.sending;
    status.textContent = '';
    status.className = 'waitlist-status';

    const query = new URLSearchParams(window.location.search);
    const body = new URLSearchParams({
      email: emailInput.value.trim(),
      website: form.elements.website.value,
      language: language(),
      utm_source: query.get('utm_source') || '',
      utm_medium: query.get('utm_medium') || '',
      utm_campaign: query.get('utm_campaign') || '',
      utm_content: query.get('utm_content') || '',
      page_url: window.location.href,
      referrer: document.referrer
    });

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body,
        redirect: 'follow'
      });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'Submission failed');

      form.querySelector('.waitlist-field-row').hidden = true;
      form.querySelector('label').hidden = true;
      form.querySelector('.waitlist-privacy').hidden = true;
      status.className = 'waitlist-status success';
      status.innerHTML = `<strong>${text.successTitle}</strong><span>${result.duplicate ? text.duplicateBody : text.successBody}</span>`;

      if (typeof window.trackEvent === 'function') {
        window.trackEvent('waitlist_submitted', {
          product: 'TallCenter',
          language: language(),
          duplicate: Boolean(result.duplicate)
        });
      }
    } catch (_) {
      status.className = 'waitlist-status error';
      status.textContent = text.error;
      submitButton.disabled = false;
      submitButton.textContent = text.submit;
    }
  });
})();
