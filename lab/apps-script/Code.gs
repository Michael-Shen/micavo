/**
 * Micavo LAB — Google Apps Script backend
 *
 * Use this as a bound script inside the Google Sheet that stores LAB data.
 * Run initializeLab() once, then deploy as a Web App.
 */

const LAB_CONFIG = Object.freeze({
  pollId: 'w1_ai_control',
  pollTitle: '下一個你想看 Michael 測什麼？',
  options: Object.freeze({
    A: 'AI 控制我所有非必要消費 24 小時',
    B: '免費 AI vs 最貴 AI，到底差在哪？',
    C: 'AI 幫我安排明天的所有行程',
    D: 'AI 幫我用 NT$1000 過完台北一天'
  }),
  siteUrl: 'https://micavo.app/lab/',
  senderName: 'Micavo 麥克實驗室',
  maxValueLength: 500
});

const SHEETS = Object.freeze({
  votes: {
    name: 'Votes',
    headers: ['timestamp', 'vote_id', 'session_id', 'poll_id', 'option_id', 'option_label', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'page_url', 'referrer', 'user_agent', 'email_linked']
  },
  subscribers: {
    name: 'Subscribers',
    headers: ['email', 'status', 'consent', 'consent_version', 'opt_in_at', 'unsubscribed_at', 'vote_id', 'session_id', 'poll_id', 'option_id', 'option_label', 'utm_source', 'utm_medium', 'utm_campaign', 'welcome_sent_at', 'unsubscribe_token']
  },
  events: {
    name: 'Events',
    headers: ['timestamp', 'event_id', 'event_name', 'session_id', 'vote_id', 'poll_id', 'option_id', 'utm_source', 'utm_medium', 'utm_campaign', 'metadata']
  },
  polls: {
    name: 'Polls',
    headers: ['poll_id', 'title', 'status', 'option_a', 'option_b', 'option_c', 'option_d', 'created_at', 'closed_at']
  },
  memberTokens: {
    name: 'MemberTokens',
    headers: ['token_hash', 'email', 'status', 'created_at', 'expires_at', 'last_seen_at']
  }
});

function initializeLab() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('請從目標 Google Sheet 裡開啟 Apps Script，再執行 initializeLab。');

  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  Object.keys(SHEETS).forEach(function (key) {
    ensureSheet_(spreadsheet, SHEETS[key]);
  });

  const pollsSheet = spreadsheet.getSheetByName(SHEETS.polls.name);
  const rows = pollsSheet.getDataRange().getValues();
  const exists = rows.some(function (row, index) { return index > 0 && row[0] === LAB_CONFIG.pollId; });
  if (!exists) {
    pollsSheet.appendRow([
      LAB_CONFIG.pollId,
      LAB_CONFIG.pollTitle,
      'active',
      LAB_CONFIG.options.A,
      LAB_CONFIG.options.B,
      LAB_CONFIG.options.C,
      LAB_CONFIG.options.D,
      new Date(),
      ''
    ]);
  }

  formatSheets_(spreadsheet);
  return 'Micavo LAB 初始化完成：' + spreadsheet.getUrl();
}

function doGet(e) {
  try {
    const action = clean_(e && e.parameter && e.parameter.action, 40);
    if (action === 'getResults') {
      validatePoll_(e.parameter.poll_id);
      return json_({ ok: true, results: getResults_() });
    }
    if (action === 'unsubscribe') return unsubscribePage_(e.parameter);
    return json_({ ok: false, message: 'Unknown action' });
  } catch (error) {
    return json_({ ok: false, message: error.message || 'Unexpected error' });
  }
}

function doPost(e) {
  try {
    const data = parseBody_(e);
    if (data.action === 'submitVoteAndSubscribe') return json_(submitVoteAndSubscribe_(data));
    if (data.action === 'submitReturningVote') return json_(submitReturningVote_(data));
    if (data.action === 'submitVote') return json_(submitVote_(data));
    if (data.action === 'subscribeEmail') return json_(subscribeEmailWithMember_(data));
    return json_({ ok: false, message: 'Unknown action' });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return json_({ ok: false, message: error.message || 'Unexpected error' });
  }
}

function subscribeEmailWithMember_(data) {
  const result = subscribeEmail_(data);
  const member = issueMemberToken_(normalizeEmail_(data.email));
  result.member_token = member.token;
  result.member_token_expires_at = member.expiresAt.toISOString();
  return result;
}

function submitVoteAndSubscribe_(data) {
  // Validate the gated fields before recording a vote. If a later transient
  // failure occurs, the same vote/session IDs make the request safely retryable.
  validatePoll_(data.poll_id);
  normalizeEmail_(data.email);
  if (String(data.consent) !== 'true') throw new Error('必須明確同意後才能完成投票。');
  requireId_(data.vote_id, 'vote_id');
  requireId_(data.session_id, 'session_id');

  const voteResult = submitVote_(data);
  data.option_id = voteResult.option_id;
  data.vote_id = voteResult.vote_id;
  const subscriptionResult = subscribeEmail_(data);
  const member = issueMemberToken_(normalizeEmail_(data.email));
  return {
    ok: true,
    duplicate: voteResult.duplicate,
    vote_id: voteResult.vote_id,
    option_id: voteResult.option_id,
    results: voteResult.results,
    already_subscribed: subscriptionResult.already_subscribed,
    welcome_sent: subscriptionResult.welcome_sent,
    member_token: member.token,
    member_token_expires_at: member.expiresAt.toISOString()
  };
}

function submitReturningVote_(data) {
  validatePoll_(data.poll_id);
  requireId_(data.vote_id, 'vote_id');
  requireId_(data.session_id, 'session_id');
  const member = validateMemberToken_(data.member_token);
  const voteResult = submitVote_(data);
  markVoteEmailLinked_(voteResult.vote_id);
  touchMemberToken_(member.rowIndex);
  return {
    ok: true,
    duplicate: voteResult.duplicate,
    vote_id: voteResult.vote_id,
    option_id: voteResult.option_id,
    results: voteResult.results,
    returning_member: true
  };
}

function submitVote_(data) {
  validatePoll_(data.poll_id);
  const optionId = clean_(data.option_id, 1).toUpperCase();
  if (!Object.prototype.hasOwnProperty.call(LAB_CONFIG.options, optionId)) throw new Error('無效的投票選項。');

  const voteId = requireId_(data.vote_id, 'vote_id');
  const sessionId = requireId_(data.session_id, 'session_id');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getSpreadsheet_().getSheetByName(SHEETS.votes.name);
    const rows = sheet.getDataRange().getValues();
    let existingVote = null;
    for (let i = 1; i < rows.length; i += 1) {
      if (rows[i][1] === voteId || (rows[i][2] === sessionId && rows[i][3] === LAB_CONFIG.pollId)) {
        existingVote = rows[i];
        break;
      }
    }

    if (existingVote) {
      return {
        ok: true,
        duplicate: true,
        vote_id: existingVote[1],
        option_id: existingVote[4],
        results: getResultsFromRows_(rows)
      };
    }

    sheet.appendRow([
      new Date(), voteId, sessionId, LAB_CONFIG.pollId, optionId, LAB_CONFIG.options[optionId],
      clean_(data.utm_source, 100), clean_(data.utm_medium, 100), clean_(data.utm_campaign, 100),
      clean_(data.utm_content, 100), clean_(data.utm_term, 100), clean_(data.utm_id, 100),
      clean_(data.page_url), clean_(data.referrer), clean_(data.user_agent), false
    ]);
    appendEvent_('vote_submitted', data, voteId, optionId, '');
    return { ok: true, duplicate: false, vote_id: voteId, option_id: optionId, results: getResults_() };
  } finally {
    lock.releaseLock();
  }
}

function subscribeEmail_(data) {
  validatePoll_(data.poll_id);
  if (String(data.consent) !== 'true') throw new Error('必須明確同意後才能訂閱。');

  const email = normalizeEmail_(data.email);
  const voteId = requireId_(data.vote_id, 'vote_id');
  const sessionId = requireId_(data.session_id, 'session_id');
  const optionId = clean_(data.option_id, 1).toUpperCase();
  if (!Object.prototype.hasOwnProperty.call(LAB_CONFIG.options, optionId)) throw new Error('無效的投票選項。');

  const spreadsheet = getSpreadsheet_();
  const votesSheet = spreadsheet.getSheetByName(SHEETS.votes.name);
  const voteRows = votesSheet.getDataRange().getValues();
  const voteRowIndex = voteRows.findIndex(function (row, index) {
    return index > 0 && row[1] === voteId && row[2] === sessionId && row[3] === LAB_CONFIG.pollId;
  });
  if (voteRowIndex < 1) throw new Error('找不到對應的投票，請重新整理後再試。');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = spreadsheet.getSheetByName(SHEETS.subscribers.name);
    const rows = sheet.getDataRange().getValues();
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i += 1) {
      if (String(rows[i][0]).toLowerCase() === email) { rowIndex = i + 1; break; }
    }

    const now = new Date();
    const wasSubscribed = rowIndex > 0 && sheet.getRange(rowIndex, 2).getValue() === 'subscribed';
    const existingToken = rowIndex > 0 ? String(sheet.getRange(rowIndex, 16).getValue() || '') : '';
    const token = existingToken || Utilities.getUuid();
    const values = [
      email, 'subscribed', true, clean_(data.consent_version, 100), now, '', voteId, sessionId,
      LAB_CONFIG.pollId, optionId, LAB_CONFIG.options[optionId], clean_(data.utm_source, 100),
      clean_(data.utm_medium, 100), clean_(data.utm_campaign, 100), '', token
    ];

    if (rowIndex > 0) sheet.getRange(rowIndex, 1, 1, values.length).setValues([values]);
    else {
      sheet.appendRow(values);
      rowIndex = sheet.getLastRow();
    }

    votesSheet.getRange(voteRowIndex + 1, 16).setValue(true);
    appendEvent_('email_opt_in', data, voteId, optionId, JSON.stringify({ already_subscribed: wasSubscribed }));

    let welcomeSent = false;
    if (!wasSubscribed) {
      welcomeSent = sendWelcome_(email, optionId, token);
      if (welcomeSent) sheet.getRange(rowIndex, 15).setValue(new Date());
    }

    return { ok: true, already_subscribed: wasSubscribed, welcome_sent: welcomeSent };
  } finally {
    lock.releaseLock();
  }
}

function sendWelcome_(email, optionId, token) {
  const serviceUrl = ScriptApp.getService().getUrl();
  if (!serviceUrl) throw new Error('Apps Script 尚未部署成 Web App，無法建立退訂連結。');
  const unsubscribeUrl = serviceUrl + '?action=unsubscribe&email=' + encodeURIComponent(email) + '&token=' + encodeURIComponent(token);
  const subject = '你投了 ' + optionId + '｜歡迎加入麥克實驗室 🧪';
  const optionLabel = escapeHtml_(LAB_CONFIG.options[optionId]);
  const html = [
    '<div style="max-width:600px;margin:auto;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#151515;line-height:1.7">',
    '<div style="padding:22px 26px;background:#151515;color:#fff;font-size:22px;font-weight:800">micavo <span style="color:#f7b916;font-size:11px">LAB</span></div>',
    '<div style="padding:32px 26px;border:1px solid #e3e1da;border-top:0">',
    '<p style="margin:0 0 8px;color:#9a6a00;font-size:12px;font-weight:800;letter-spacing:1px">VOTE RECEIVED</p>',
    '<h1 style="margin:0 0 18px;font-size:27px;line-height:1.35">你剛剛投了 ' + escapeHtml_(optionId) + ' 🔥</h1>',
    '<p>你的選擇是：<strong>' + optionLabel + '</strong></p>',
    '<p>這輪結束後，我會告訴你誰贏；影片正式上線時，也會寄信通知你。</p>',
    '<p style="margin:28px 0"><a href="' + LAB_CONFIG.siteUrl + '" style="display:inline-block;padding:13px 20px;background:#151515;color:#fff;text-decoration:none;border-radius:6px;font-weight:700">回到麥克實驗室 →</a></p>',
    '<p style="font-size:13px;color:#777">謝謝你一起決定下一個實驗。<br>Michael / Micavo</p>',
    '<hr style="border:0;border-top:1px solid #e8e6df;margin:28px 0 18px">',
    '<p style="font-size:11px;color:#999">每月約 1–2 封。若不想再收到通知，可<a href="' + unsubscribeUrl + '" style="color:#777">隨時取消訂閱</a>。</p>',
    '</div></div>'
  ].join('');

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: '你投了 ' + optionId + '：' + LAB_CONFIG.options[optionId] + '\n\n這輪結束後，我會告訴你誰贏。\n\n取消訂閱：' + unsubscribeUrl,
    htmlBody: html,
    name: LAB_CONFIG.senderName
  });
  return true;
}

function unsubscribePage_(params) {
  const email = normalizeEmail_(params.email);
  const token = clean_(params.token, 100);
  const sheet = getSpreadsheet_().getSheetByName(SHEETS.subscribers.name);
  const rows = sheet.getDataRange().getValues();
  let found = false;

  for (let i = 1; i < rows.length; i += 1) {
    if (String(rows[i][0]).toLowerCase() === email && String(rows[i][15]) === token) {
      sheet.getRange(i + 1, 2).setValue('unsubscribed');
      sheet.getRange(i + 1, 6).setValue(new Date());
      appendEvent_('unsubscribed', { session_id: rows[i][7], poll_id: rows[i][8], utm_source: rows[i][11], utm_medium: rows[i][12], utm_campaign: rows[i][13] }, rows[i][6], rows[i][9], '');
      revokeMemberTokens_(email);
      found = true;
      break;
    }
  }

  const title = found ? '已取消訂閱' : '退訂連結無效';
  const message = found ? '你不會再收到麥克實驗室的 Email。謝謝你曾經參與！' : '這個連結已失效，或找不到對應的訂閱資料。';
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>' + title + '</title><body style="margin:0;background:#f7f6f2;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#151515"><main style="max-width:560px;margin:12vh auto;padding:40px 28px;background:#fff;border:1px solid #ddd;border-radius:16px;text-align:center"><div style="font-size:25px;font-weight:900">micavo <small style="font-size:10px;color:#d99600">LAB</small></div><h1 style="margin-top:32px">' + title + '</h1><p style="color:#666;line-height:1.7">' + message + '</p><a href="' + LAB_CONFIG.siteUrl + '" style="display:inline-block;margin-top:18px;padding:13px 20px;border-radius:7px;background:#151515;color:#fff;text-decoration:none;font-weight:700">回到麥克實驗室</a></main></body>');
}

function getResults_() {
  const rows = getSpreadsheet_().getSheetByName(SHEETS.votes.name).getDataRange().getValues();
  return getResultsFromRows_(rows);
}

function getResultsFromRows_(rows) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (let i = 1; i < rows.length; i += 1) {
    if (rows[i][3] === LAB_CONFIG.pollId && Object.prototype.hasOwnProperty.call(counts, rows[i][4])) counts[rows[i][4]] += 1;
  }
  return { counts: counts, total: counts.A + counts.B + counts.C + counts.D };
}

function appendEvent_(eventName, data, voteId, optionId, metadata) {
  getSpreadsheet_().getSheetByName(SHEETS.events.name).appendRow([
    new Date(), Utilities.getUuid(), eventName, clean_(data.session_id, 100), clean_(voteId, 100),
    LAB_CONFIG.pollId, clean_(optionId, 1), clean_(data.utm_source, 100), clean_(data.utm_medium, 100),
    clean_(data.utm_campaign, 100), clean_(metadata)
  ]);
}

function issueMemberToken_(email) {
  const token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
  const expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
  const sheet = getOrCreateMemberTokensSheet_();
  sheet.appendRow([hashToken_(token), email, 'active', new Date(), expiresAt, new Date()]);
  return { token: token, expiresAt: expiresAt };
}

function validateMemberToken_(token) {
  const rawToken = String(token || '').trim();
  if (!/^[a-f0-9]{64}$/.test(rawToken)) throw new Error('裝置識別已失效，請重新輸入 Email。');
  const hash = hashToken_(rawToken);
  const sheet = getOrCreateMemberTokensSheet_();
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i += 1) {
    if (rows[i][0] !== hash) continue;
    if (rows[i][2] !== 'active' || !(rows[i][4] instanceof Date) || rows[i][4].getTime() <= Date.now()) {
      throw new Error('裝置識別已失效，請重新輸入 Email。');
    }
    if (!isSubscribed_(String(rows[i][1]).toLowerCase())) {
      sheet.getRange(i + 1, 3).setValue('revoked');
      throw new Error('訂閱已取消，請重新輸入 Email 並確認同意。');
    }
    return { email: String(rows[i][1]).toLowerCase(), rowIndex: i + 1 };
  }
  throw new Error('裝置識別已失效，請重新輸入 Email。');
}

function isSubscribed_(email) {
  const rows = getSpreadsheet_().getSheetByName(SHEETS.subscribers.name).getDataRange().getValues();
  return rows.some(function (row, index) {
    return index > 0 && String(row[0]).toLowerCase() === email && row[1] === 'subscribed';
  });
}

function touchMemberToken_(rowIndex) {
  getOrCreateMemberTokensSheet_().getRange(rowIndex, 6).setValue(new Date());
}

function markVoteEmailLinked_(voteId) {
  const sheet = getSpreadsheet_().getSheetByName(SHEETS.votes.name);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i += 1) {
    if (rows[i][1] === voteId) {
      sheet.getRange(i + 1, 16).setValue(true);
      return;
    }
  }
}

function revokeMemberTokens_(email) {
  const sheet = getOrCreateMemberTokensSheet_();
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i += 1) {
    if (String(rows[i][1]).toLowerCase() === email && rows[i][2] === 'active') sheet.getRange(i + 1, 3).setValue('revoked');
  }
}

function getOrCreateMemberTokensSheet_() {
  const spreadsheet = getSpreadsheet_();
  ensureSheet_(spreadsheet, SHEETS.memberTokens);
  const sheet = spreadsheet.getSheetByName(SHEETS.memberTokens.name);
  if (sheet.getLastRow() === 1) {
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, SHEETS.memberTokens.headers.length).setBackground('#151515').setFontColor('#ffffff').setFontWeight('bold');
  }
  return sheet;
}

function hashToken_(token) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token, Utilities.Charset.UTF_8);
  return Utilities.base64EncodeWebSafe(digest).replace(/=+$/, '');
}

function getSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('尚未初始化 Google Sheet，請先執行 initializeLab。');
  return SpreadsheetApp.openById(id);
}

function ensureSheet_(spreadsheet, definition) {
  let sheet = spreadsheet.getSheetByName(definition.name);
  if (!sheet) sheet = spreadsheet.insertSheet(definition.name);
  if (sheet.getLastRow() === 0) sheet.appendRow(definition.headers);
  else {
    const current = sheet.getRange(1, 1, 1, definition.headers.length).getValues()[0];
    if (current.join('|') !== definition.headers.join('|')) throw new Error(definition.name + ' 的欄位與預期不符，請勿直接覆蓋既有資料。');
  }
}

function formatSheets_(spreadsheet) {
  Object.keys(SHEETS).forEach(function (key) {
    const sheet = spreadsheet.getSheetByName(SHEETS[key].name);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, SHEETS[key].headers.length).setBackground('#151515').setFontColor('#ffffff').setFontWeight('bold');
    sheet.autoResizeColumns(1, SHEETS[key].headers.length);
  });
}

function validatePoll_(pollId) {
  if (clean_(pollId, 100) !== LAB_CONFIG.pollId) throw new Error('找不到這一輪投票。');
}

function requireId_(value, field) {
  const cleaned = clean_(value, 100);
  if (!/^[a-z]+_[a-zA-Z0-9_-]{8,}$/.test(cleaned)) throw new Error(field + ' 格式不正確。');
  return cleaned;
}

function normalizeEmail_(value) {
  const email = String(value || '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email 格式不正確。');
  return email;
}

function clean_(value, maxLength) {
  let result = String(value == null ? '' : value).trim().slice(0, maxLength || LAB_CONFIG.maxValueLength);
  if (/^[=+\-@]/.test(result)) result = "'" + result;
  return result;
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Request body is missing.');
  const data = JSON.parse(e.postData.contents);
  if (!data || typeof data !== 'object') throw new Error('Invalid request body.');
  return data;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml_(value) {
  return String(value || '').replace(/[&<>"']/g, function (character) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
  });
}
