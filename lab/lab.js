(function () {
  'use strict';

  var CONFIG = {
    // Paste the deployed Google Apps Script Web App /exec URL here.
    appsScriptUrl: 'https://script.google.com/macros/s/AKfycbwx7hhQdxgAVL-W4Lk_zdq1DXEvz4HPTosSVOYNEtCp7EBAPrdTMvJRVecqQgw9zOKnvA/exec',
    pollId: 'w1_ai_control',
    consentVersion: 'lab_opt_in_v1_2026-08-16',
    // Leave youtubeId empty until the winning video is public. Example ID:
    // https://www.youtube.com/watch?v=dQw4w9WgXcQ → dQw4w9WgXcQ
    latestVideo: {
      youtubeId: '',
      title: '',
      description: ''
    }
  };

  var OPTION_LABELS = {
    A: 'AI 控制我所有非必要消費 24 小時',
    B: '免費 AI vs 最貴 AI，到底差在哪？',
    C: 'AI 幫我安排明天的所有行程',
    D: 'AI 幫我用 NT$1000 過完台北一天'
  };

  var STORAGE_PREFIX = 'micavo_lab_' + CONFIG.pollId + '_';
  var MEMBER_STORAGE_KEY = 'micavo_lab_member';
  var selectedOption = '';
  var voteId = localStorageSafeGet(STORAGE_PREFIX + 'vote_id') || '';
  var votedOption = localStorageSafeGet(STORAGE_PREFIX + 'option') || '';
  var sessionId = getOrCreateId('micavo_lab_session_id', 'session');
  var campaign = readCampaign();
  var memberToken = readMemberToken();

  var options = Array.prototype.slice.call(document.querySelectorAll('.poll-card'));
  var submitVoteButton = document.getElementById('submit-vote');
  var voteEmailForm = document.getElementById('vote-email-form');
  var modal = document.getElementById('confirm-modal');
  var modalTitle = document.getElementById('modal-title');
  var modalLetter = document.getElementById('modal-letter');
  var modalStatus = document.getElementById('modal-status');
  var voteStatus = document.getElementById('vote-status');
  var subscribeButton = document.getElementById('subscribe-button');

  document.getElementById('year').textContent = new Date().getFullYear();
  renderLatestVideo();
  track('lab_page_view');

  if (votedOption && OPTION_LABELS[votedOption]) {
    selectedOption = votedOption;
    markSelected(votedOption);
    lockPoll();
    loadResults();
  }

  options.forEach(function (card) {
    card.addEventListener('click', function () {
      if (votedOption) return;
      selectedOption = card.getAttribute('data-option');
      markSelected(selectedOption);
      submitVoteButton.disabled = false;
      setStatus(voteStatus, '已選擇 ' + selectedOption + '，按下按鈕就會正式計票。', '');
      track('poll_option_click', { option_id: selectedOption });
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (button) {
    button.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  submitVoteButton.addEventListener('click', function () {
    submitSelectedVote(false);
  });

  async function submitSelectedVote(isRetry) {
    if (!selectedOption || votedOption) return;
    if (!CONFIG.appsScriptUrl) {
      setStatus(voteStatus, '投票系統尚未完成 Google Sheet 連線，請稍後再試。', 'error');
      return;
    }

    setButtonLoading(submitVoteButton, true, '正在送出…');
    setStatus(voteStatus, '', '');
    var newVoteId = createId('vote');
    try {
      var payload = {
        action: memberToken ? 'submitReturningVote' : 'submitVote',
        poll_id: CONFIG.pollId,
        option_id: selectedOption,
        vote_id: newVoteId,
        session_id: sessionId,
        member_token: memberToken || ''
      };
      var response = await apiPost(payload);
      if (!response.ok) throw new Error(response.message || '投票送出失敗');

      voteId = response.vote_id || newVoteId;
      votedOption = response.option_id || selectedOption;
      selectedOption = votedOption;
      localStorageSafeSet(STORAGE_PREFIX + 'vote_id', voteId);
      localStorageSafeSet(STORAGE_PREFIX + 'option', votedOption);
      track('vote_submitted', { option_id: votedOption, vote_id: voteId });
      if (memberToken) track('returning_member_vote', { option_id: votedOption });
      lockPoll();
      renderResults(response.results || {});
      if (memberToken) document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
      else openEmailStep();
    } catch (error) {
      if (!isRetry && memberToken && /裝置識別|訂閱已取消/.test(error.message || '')) {
        clearMemberToken();
        setButtonLoading(submitVoteButton, false, '提交我的投票 <span>→</span>');
        return submitSelectedVote(true);
      }
      setStatus(voteStatus, error.message || '目前無法送出，請稍後再試。', 'error');
    } finally {
      if (votedOption) setButtonLoading(submitVoteButton, true, '你的票已送出 ✓');
      else setButtonLoading(submitVoteButton, false, '提交我的投票 <span>→</span>');
    }
  }

  function openEmailStep() {
    modalLetter.textContent = votedOption;
    modalTitle.textContent = OPTION_LABELS[votedOption];
    setStatus(modalStatus, '', '');
    modal.hidden = false;
    document.body.classList.add('modal-open');
    document.getElementById('email-input').focus();
    track('email_step_view', { option_id: votedOption, vote_id: voteId });
  }

  voteEmailForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!voteId || !votedOption) return;
    var emailInput = document.getElementById('email-input');
    var consentInput = document.getElementById('consent-input');
    if (!emailInput.checkValidity()) {
      setStatus(modalStatus, '請輸入有效的 Email。', 'error');
      emailInput.focus();
      return;
    }
    if (!consentInput.checked) {
      setStatus(modalStatus, '請先確認你同意收到麥克實驗室通知。', 'error');
      consentInput.focus();
      return;
    }

    setButtonLoading(subscribeButton, true, '正在加入…');
    setStatus(modalStatus, '', '');
    try {
      var response = await apiPost({
        action: 'subscribeEmail',
        email: emailInput.value.trim().toLowerCase(),
        consent: 'true',
        consent_version: CONFIG.consentVersion,
        vote_id: voteId,
        session_id: sessionId,
        poll_id: CONFIG.pollId,
        option_id: votedOption
      });
      if (!response.ok) throw new Error(response.message || '訂閱失敗');
      if (response.member_token && response.member_token_expires_at) saveMemberToken(response.member_token, response.member_token_expires_at);
      track('email_opt_in', { option_id: votedOption, method: 'optional_post_vote' });
      closeModal();
    } catch (error) {
      setStatus(modalStatus, error.message || '目前無法訂閱，請稍後再試。', 'error');
    } finally {
      setButtonLoading(subscribeButton, false, '告訴我結果 <span>→</span>');
    }
  });

  document.addEventListener('click', function (event) {
    var tracked = event.target.closest('[data-track]');
    if (tracked) track(tracked.getAttribute('data-track'));
  });

  async function loadResults() {
    if (!CONFIG.appsScriptUrl) return;
    try {
      var url = new URL(CONFIG.appsScriptUrl);
      url.searchParams.set('action', 'getResults');
      url.searchParams.set('poll_id', CONFIG.pollId);
      var response = await fetch(url.toString(), { redirect: 'follow' });
      var data = await response.json();
      if (data.ok) renderResults(data.results || {});
    } catch (_) {
      setStatus(voteStatus, '你的票已送出；即時結果目前暫時無法更新。', 'error');
    }
  }

  async function apiPost(payload) {
    var body = Object.assign({}, payload, campaign, {
      page_url: window.location.href.slice(0, 500),
      referrer: document.referrer.slice(0, 500),
      user_agent: navigator.userAgent.slice(0, 500)
    });
    var response = await fetch(CONFIG.appsScriptUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    });
    return response.json();
  }

  function renderResults(results) {
    var counts = results.counts || results;
    var total = Number(results.total || 0);
    if (!total) {
      total = Object.keys(OPTION_LABELS).reduce(function (sum, key) { return sum + Number(counts[key] || 0); }, 0);
    }
    var list = document.getElementById('results-list');
    list.innerHTML = '';
    Object.keys(OPTION_LABELS).forEach(function (key) {
      var count = Number(counts[key] || 0);
      var percentage = total ? Math.round((count / total) * 100) : 0;
      var row = document.createElement('div');
      row.className = 'result-row' + (key === votedOption ? ' chosen' : '');
      row.innerHTML = '<span class="result-letter">' + key + '</span>' +
        '<span class="result-name">' + escapeHtml(OPTION_LABELS[key]) + '</span>' +
        '<span class="result-track"><span class="result-bar" style="width:' + percentage + '%"></span></span>' +
        '<span class="result-number">' + percentage + '% · ' + count + ' 票</span>';
      list.appendChild(row);
    });
    document.getElementById('result-lock').hidden = true;
    list.hidden = false;
    var totalEl = document.getElementById('total-votes');
    totalEl.textContent = '總投票數：' + total + ' 票';
    totalEl.hidden = false;
    document.getElementById('result-updated').textContent = '剛剛更新';
  }

  function renderLatestVideo() {
    var video = CONFIG.latestVideo || {};
    var youtubeId = String(video.youtubeId || '').trim();
    if (!/^[a-zA-Z0-9_-]{6,20}$/.test(youtubeId)) return;

    var section = document.getElementById('latest-experiment');
    var videoUrl = 'https://www.youtube.com/watch?v=' + encodeURIComponent(youtubeId);
    document.getElementById('latest-video-title').textContent = video.title || '最新完成的 Micavo LAB 實驗';
    document.getElementById('latest-video-description').textContent = video.description || '這是由大家投票選出的實驗。現在來看最後結果。';
    document.getElementById('latest-video-image').src = 'https://i.ytimg.com/vi/' + encodeURIComponent(youtubeId) + '/hqdefault.jpg';
    document.querySelectorAll('[data-latest-video-link]').forEach(function (link) { link.href = videoUrl; });
    section.hidden = false;
  }

  function markSelected(optionId) {
    options.forEach(function (card) {
      var isSelected = card.getAttribute('data-option') === optionId;
      card.classList.toggle('selected', isSelected);
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });
  }

  function lockPoll() {
    options.forEach(function (card) { card.disabled = true; });
    submitVoteButton.disabled = true;
    submitVoteButton.innerHTML = '你的票已送出 ✓';
    setStatus(voteStatus, '你投給了 ' + votedOption + '：' + OPTION_LABELS[votedOption], 'success');
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    var selectedCard = document.querySelector('.poll-card[data-option="' + selectedOption + '"]');
    if (selectedCard) selectedCard.focus();
    if (votedOption) document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function readMemberToken() {
    try {
      var member = JSON.parse(localStorage.getItem(MEMBER_STORAGE_KEY) || '{}');
      if (!member.token || !member.expires_at || new Date(member.expires_at).getTime() <= Date.now()) {
        localStorage.removeItem(MEMBER_STORAGE_KEY);
        return '';
      }
      return member.token;
    } catch (_) {
      return '';
    }
  }

  function saveMemberToken(token, expiresAt) {
    memberToken = token;
    try { localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify({ token: token, expires_at: expiresAt })); } catch (_) {}
  }

  function clearMemberToken() {
    memberToken = '';
    try { localStorage.removeItem(MEMBER_STORAGE_KEY); } catch (_) {}
  }

  function readCampaign() {
    var params = new URLSearchParams(window.location.search);
    var data = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'].forEach(function (key) {
      var value = params.get(key);
      if (value) data[key] = value.slice(0, 100);
    });
    var storageKey = 'micavo_lab_first_touch';
    try {
      var stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
      if (Object.keys(data).length && !Object.keys(stored).length) localStorage.setItem(storageKey, JSON.stringify(data));
      if (!Object.keys(data).length) data = stored;
    } catch (_) {}
    return data;
  }

  function track(eventName, params) {
    params = Object.assign({ poll_id: CONFIG.pollId }, campaign, params || {});
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
  }

  function getOrCreateId(key, prefix) {
    var value = localStorageSafeGet(key);
    if (!value) {
      value = createId(prefix);
      localStorageSafeSet(key, value);
    }
    return value;
  }

  function createId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return prefix + '_' + window.crypto.randomUUID();
    return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 12);
  }

  function localStorageSafeGet(key) { try { return localStorage.getItem(key); } catch (_) { return ''; } }
  function localStorageSafeSet(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function escapeHtml(value) { var el = document.createElement('div'); el.textContent = value; return el.innerHTML; }
  function setStatus(element, message, type) { element.textContent = message; element.className = 'form-status' + (type ? ' ' + type : ''); }
  function setButtonLoading(button, loading, content) { button.disabled = loading; button.innerHTML = content; }
})();
