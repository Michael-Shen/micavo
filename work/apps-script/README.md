# Work-with-me forms → Google Sheet

The consult form and the course waitlist on `/work/` post JSON to a Google Apps Script web app that appends a row to a Google Sheet and emails `hello@micavo.app`.

1. Create a Google Sheet (for example "Micavo consults"). Open **Extensions → Apps Script**, delete the default code and paste `Code.gs`.
2. **Deploy → New deployment → Web app.** Execute as: **Me**. Who has access: **Anyone**. Authorize when asked (it needs the Sheet and Gmail send permission).
3. Copy the **/exec** URL and paste it into `ENDPOINT` near the bottom of `work/index.html`.
4. Submit the form once from the live page. A "Consults" tab with headers appears in the Sheet.

Until `ENDPOINT` is filled in, the forms fall back to opening the visitor's email app addressed to `hello@micavo.app`, so nothing is ever broken or lost.

Changing the script later: **Deploy → Manage deployments → Edit → New version** (the URL stays the same).
