/**
 * Micavo "Work with me" forms -> Google Sheet (+ an email to you).
 *
 * Setup (5 minutes), see README.md in this folder:
 *  1. Create a Google Sheet (e.g. "Micavo consults"), open Extensions > Apps Script,
 *     and paste this file in.
 *  2. Deploy > New deployment > type "Web app": Execute as "Me",
 *     Who has access "Anyone". Copy the /exec URL.
 *  3. Paste that URL into ENDPOINT in work/index.html.
 */
var NOTIFY_EMAIL = 'hello@micavo.app'; // new requests are emailed here too; set '' to turn off
var SHEETS = {
  consult: ['Time', 'Name', 'Email', 'Need', 'Budget', 'Timeline', 'Message', 'Language', 'Page', 'Referrer'],
  course_waitlist: ['Time', 'Email', 'Course', 'Language', 'Page', 'Referrer']
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.website) return json_({ ok: true }); // honeypot: pretend success
    var type = data.type === 'course_waitlist' ? 'course_waitlist' : 'consult';
    var email = String(data.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'email' });
    if (type === 'consult' && (!data.name || !data.message)) return json_({ ok: false, error: 'missing' });

    var sheet = sheet_(type);
    var row = type === 'consult'
      ? [new Date(), clean_(data.name), email, clean_(data.need), clean_(data.budget), clean_(data.timeline), clean_(data.message), clean_(data.lang), clean_(data.page_url), clean_(data.referrer)]
      : [new Date(), email, clean_(data.course), clean_(data.lang), clean_(data.page_url), clean_(data.referrer)];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      var subject = type === 'consult' ? 'New consult request: ' + clean_(data.name) : 'New course waitlist signup';
      var body = SHEETS[type].map(function (h, i) { return h + ': ' + row[i]; }).join('\n');
      MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body, replyTo: email });
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'server' });
  }
}

function doGet() { return json_({ ok: true, service: 'micavo-work-forms' }); }

function sheet_(type) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var name = type === 'consult' ? 'Consults' : 'Course waitlist';
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) { sheet.appendRow(SHEETS[type]); sheet.setFrozenRows(1); }
  return sheet;
}

// Spreadsheet formulas ("=...", "+...", "@...") are neutralised so a visitor cannot inject one.
function clean_(v) {
  var s = String(v == null ? '' : v).slice(0, 4000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
