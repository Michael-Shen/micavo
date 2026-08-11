# Website-first Waitlist 驗證手冊

> 用最小成本先做產品網站與候補名單，確認市場真的有興趣，再決定是否投入 iOS App 開發。

## 1. 這套方法解決什麼問題

有新產品想法時，最危險的做法是先花幾個月開發完整 App，最後才發現沒有人需要。

更穩健的順序是：

1. 定義一個明確的使用者問題。
2. 做一個看得懂、可信任的產品網站。
3. 放上主要功能、畫面與清楚的價值主張。
4. 用 waitlist 收集願意留下 Email 的人。
5. 用 GA4 與 UTM 判斷流量品質和轉換率。
6. 有足夠需求訊號後，再開始 iOS App 開發。

這裡的重點不是追求大量 Email，而是確認：

- 哪一類人願意留下聯絡方式？
- 哪一句價值主張最有效？
- 哪個來源帶來真正有興趣的人？
- 使用者最常閱讀哪些功能與 FAQ？
- 需求是否強到值得投入開發？

## 2. TallCenter 目前使用的架構

```text
使用者
  ↓
TallCenter 靜態網站（GitHub Pages）
  ↓  POST：Email、語言、UTM、來源頁面
Google Apps Script Web App
  ↓  驗證、去重、寫入
私人 Google Sheet

網站同時送出：
  └─ GA4 waitlist_submitted 事件（不包含 Email）
```

TallCenter 實際組件：

- Landing page：`micavo/tallcenter/index.html`
- Waitlist UI：`micavo/tallcenter/waitlist.js`
- Waitlist 樣式：`micavo/tallcenter/waitlist.css`
- 共用 GA4：`micavo/assets/js/analytics.js`
- Apps Script Web App：公開 `/exec` endpoint
- Google Sheet：私人保存候補名單

目前 TallCenter endpoint：

```text
https://script.google.com/macros/s/AKfycby2JrHQ-_3PSpJn8L1CbSZy9ejzdWJSCkOxj4M07Lxc5M5zb1IbNkFUSD0a978M5y-N/exec
```

這個網址本來就會出現在網站前端，因此不能當成密碼。真正需要保護的是 Google Sheet 權限與 Google 帳號。

## 3. 建立 Google Sheet

1. 建立新的 Google 試算表。
2. 檔案命名，例如：`ProductName Waitlist`。
3. 下方工作表分頁命名為 `waitlist`。
4. 不要把試算表設為「知道連結的任何人都可查看」。
5. 只把 Sheet 分享給需要管理候補名單的團隊成員。

Apps Script 會自動建立以下欄位：

| 欄位 | 用途 |
|---|---|
| `submitted_at` | 加入時間 |
| `email` | 聯絡 Email |
| `language` | 網站語言 |
| `utm_source` | 流量來源，例如 Instagram |
| `utm_medium` | 媒介，例如 social、qr |
| `utm_campaign` | 活動名稱 |
| `utm_content` | 素材版本 |
| `page_url` | 送出表單的頁面 |
| `referrer` | 前一個來源頁面 |

不要為了「以後可能有用」而收集姓名、生日、身高、健康資料、學校或城市。Waitlist 原則上只需要 Email 與行銷歸因資料。

## 4. 建立 Apps Script

在 Google Sheet 上方選單：

```text
擴充功能 → Apps Script
```

刪除預設內容，貼上以下程式：

```javascript
const SHEET_NAME = 'waitlist';

function doGet() {
  return jsonResponse({
    ok: true,
    service: 'Product Waitlist'
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const params = e && e.parameter ? e.parameter : {};

    // Honeypot：正常使用者不會填寫這個欄位。
    if (params.website) {
      return jsonResponse({ ok: true });
    }

    const email = String(params.email || '')
      .trim()
      .toLowerCase()
      .slice(0, 254);

    if (!isValidEmail(email)) {
      return jsonResponse({
        ok: false,
        error: 'invalid_email'
      });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    ensureHeaders(sheet);

    // 避免同一個 Email 重複寫入。
    const lastRow = sheet.getLastRow();

    if (lastRow >= 2) {
      const existingEmails = sheet
        .getRange(2, 2, lastRow - 1, 1)
        .getDisplayValues()
        .flat()
        .map(value => String(value).trim().toLowerCase());

      if (existingEmails.includes(email)) {
        return jsonResponse({
          ok: true,
          duplicate: true
        });
      }
    }

    sheet.appendRow([
      new Date(),
      email,
      safeValue(params.language, 20),
      safeValue(params.utm_source, 100),
      safeValue(params.utm_medium, 100),
      safeValue(params.utm_campaign, 100),
      safeValue(params.utm_content, 100),
      safeValue(params.page_url, 500),
      safeValue(params.referrer, 500)
    ]);

    return jsonResponse({
      ok: true,
      duplicate: false
    });
  } catch (error) {
    console.error(error);

    return jsonResponse({
      ok: false,
      error: 'server_error'
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    'submitted_at',
    'email',
    'language',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'page_url',
    'referrer'
  ]);

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function safeValue(value, maxLength) {
  const result = String(value || '')
    .trim()
    .slice(0, maxLength);

  // 避免 Spreadsheet formula injection。
  return /^[=+\-@]/.test(result) ? "'" + result : result;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 程式中的重要保護

- Email 基本格式驗證。
- Email 統一轉成小寫。
- 相同 Email 不重複寫入。
- `LockService` 避免多人同時送出造成寫入衝突。
- Honeypot 欄位擋掉一部分簡單機器人。
- 限制每個欄位長度。
- 避免輸入被 Google Sheets 當成公式執行。
- API 回應不洩漏 Sheet 內容。

如果候補名單成長到很大，逐列掃描 Email 的去重方式會變慢。早期驗證階段足夠；規模變大後可改用資料庫、PropertiesService、雜湊索引或專業 Email 平台。

## 5. 部署 Apps Script Web App

在 Apps Script 編輯器中：

1. 點右上角「部署」。
2. 選「新增部署作業」。
3. 類型選「網頁應用程式」。
4. 說明填入版本名稱，例如 `Waitlist v1`。
5. 執行身分選「我」。
6. 誰可以存取選「所有人」。
7. 點「部署」。
8. 第一次會要求 Google 授權。
9. 複製最後產生、以 `/exec` 結尾的網址。

### Google 尚未驗證警告

自己建立、尚未送 Google 公開驗證的 Apps Script，第一次授權時可能出現：

```text
Google hasn't verified this app
```

因為你是程式擁有者，可以：

```text
Advanced → Go to [project name] (unsafe) → Allow
```

這是擁有者授權程式存取自己的 Sheet。網站訪客不應看到這個畫面，前提是部署設定為：

```text
Execute as: Me
Who has access: Anyone
```

### `/dev` 和 `/exec` 的差異

- `/dev`：只有 Script 編輯者能測試，不可放到公開網站。
- `/exec`：正式部署網址，網站必須使用這個。

### 修改 Apps Script 後的必要動作

只按「儲存」不會更新線上的 `/exec` 版本。

每次修改 Apps Script 後：

1. 點「部署」。
2. 點「管理部署作業」。
3. 編輯目前部署。
4. 建立新版本。
5. 再次部署。

通常同一個 deployment 的 `/exec` URL 可以維持不變。

## 6. 測試 Apps Script

### 瀏覽器健康檢查

直接打開 `/exec` URL，預期看到：

```json
{"ok":true,"service":"Product Waitlist"}
```

### 無效 Email 測試

```bash
curl -L -d "email=invalid-email" "YOUR_APPS_SCRIPT_EXEC_URL"
```

預期：

```json
{"ok":false,"error":"invalid_email"}
```

注意：使用 `curl -L -d` 即可。不要同時強制 `-X POST`，因為 Google Apps Script 會重新導向到 `script.googleusercontent.com`；強制 redirect 後仍使用 POST 可能得到 Google Drive 錯誤頁。

### 正式測試

從網站送出自己可使用的 Email，確認：

- 網站顯示成功狀態。
- Sheet 新增一列。
- 時間、語言、UTM、page URL 正確。
- 相同 Email 再送一次不會新增第二列。

## 7. 網站表單的實作原則

網站需要：

- Email 欄位：`type="email"`、`required`、`autocomplete="email"`。
- Honeypot 隱藏欄位。
- 送出中狀態，避免連點。
- 成功、重複、錯誤狀態。
- 手機版可用。
- 鍵盤 focus、Escape 關閉及 `aria-live`。
- 三語文案與錯誤訊息。
- JavaScript 失效時仍保留 mailto fallback。

提交格式範例：

```javascript
const body = new URLSearchParams({
  email: emailInput.value.trim(),
  website: honeypotValue,
  language: document.documentElement.lang,
  utm_source: query.get('utm_source') || '',
  utm_medium: query.get('utm_medium') || '',
  utm_campaign: query.get('utm_campaign') || '',
  utm_content: query.get('utm_content') || '',
  page_url: window.location.href,
  referrer: document.referrer
});

const response = await fetch(APPS_SCRIPT_EXEC_URL, {
  method: 'POST',
  body,
  redirect: 'follow'
});

const result = await response.json();

if (!response.ok || !result.ok) {
  throw new Error(result.error || 'Submission failed');
}
```

不要把 Email 傳入 GA4、console、URL query string 或公開頁面。

## 8. CTA 設計

主要 CTA 應該有一致目的，例如：

- Join the waitlist
- 加入候補名單
- ウェイトリストに参加

CTA 可出現在：

- Header
- Hero 首屏
- 核心功能段落
- 頁尾 Final CTA

所有 CTA 應開啟同一個表單，不要讓不同按鈕產生不同且難以維護的流程。

保留 CTA 位置資訊，方便分析哪個位置轉換最好：

```html
data-ga-event="waitlist_clicked"
data-ga-param-product="ProductName"
data-ga-param-cta-location="hero"
```

## 9. GA4 與轉換事件

至少追蹤：

| 事件 | 意義 |
|---|---|
| `landing_view` | 產品頁瀏覽 |
| `waitlist_clicked` | 使用者打開候補表單 |
| `waitlist_submitted` | Apps Script 確認成功寫入或已存在 |
| `language_changed` | 切換語言 |
| `scroll_depth` | 看到頁面 25%、50%、75%、90% |
| `faq_opened` | 使用者關心的疑問 |
| `engaged_10_seconds` | 非立即跳出 |

真正的主要 conversion 應該是：

```text
waitlist_submitted
```

`waitlist_clicked` 只代表打開表單，不代表完成加入。

GA4 絕對不要傳送：

- Email
- 姓名
- 身高、體重
- 生日
- 健康或發育資訊
- 自由輸入文字

## 10. UTM 命名方式

分享不同來源時使用 UTM：

```text
https://example.com/product/
  ?utm_source=instagram
  &utm_medium=social
  &utm_campaign=prelaunch
  &utm_content=share_card_1
```

建議固定命名規則：

| 欄位 | 範例 |
|---|---|
| `utm_source` | instagram、tiktok、threads、friend_share |
| `utm_medium` | social、qr、referral、email |
| `utm_campaign` | prelaunch_2026、beta_recruitment |
| `utm_content` | hero_video、share_card_1、country_card |

全部使用小寫、英文與底線，避免同一來源出現 `Instagram`、`instagram`、`ig` 三種寫法。

## 11. 隱私、安全與合規

Waitlist 會收集 Email，因此：

- Privacy Policy 要說明會收集 Email 與用途。
- 明確告知 Email 用於產品上線或測試通知。
- 提供取消訂閱或聯絡方式。
- 不要出售候補名單。
- 不要把 Sheet 公開。
- 不要把 Email 傳入 GA4。
- 不要在前端放任何 Google 密碼、API secret 或 OAuth token。
- Apps Script URL 是公開 endpoint，不是 secret。

如果產品服務青少年，waitlist 更應避免收集：

- 精確生日
- 學校
- 城市
- 身高或健康資料
- 家長資訊
- 照片

除非確實需要並完成相應的同意與法規設計。

## 12. 常見問題與除錯

### GET 正常，但 POST 失敗

檢查：

- 是否使用 `/exec`。
- 部署權限是否為 Anyone。
- 是否 Execute as Me。
- Apps Script 修改後是否重新部署新版本。
- 瀏覽器 Network 是否顯示 CORS 或 redirect 問題。

### 網站顯示成功，但 Sheet 沒有資料

檢查：

- 工作表名稱是否與 `SHEET_NAME` 相同。
- Apps Script Executions 是否有錯誤。
- 是否部署了舊版本。
- 是否綁定錯誤的 Google Sheet。

### 重複 Email 還是出現多列

檢查：

- Email 是否在程式裡先 `trim().toLowerCase()`。
- 去重欄是否真的是 Email 欄。
- 是否有兩個不同 Apps Script 寫入不同 Sheet。

### 修改網站後仍看到舊版

GitHub Pages 和瀏覽器可能快取 JS/CSS。加入版本參數：

```html
<script src="./waitlist.js?v=20260811-2" defer></script>
<link rel="stylesheet" href="./waitlist.css?v=20260811-2">
```

每次重要更新改變版本字串。

## 13. Website-first 驗證指標

不要只看總流量。至少觀察：

```text
Landing → CTA click → Waitlist submit
```

核心指標：

- Landing page sessions
- CTA click-through rate
- Waitlist conversion rate
- Email 完成率：submit / form open
- 不同 UTM source 的 conversion rate
- 不同語言的 conversion rate
- FAQ 與 scroll depth
- 回訪與分享流量

### 如何決定是否開始 iOS 開發

沒有適用所有產品的固定數字，但可以先訂自己的門檻，例如：

- 有足夠目標使用者看過頁面，而不是朋友捧場。
- 至少一個獲客來源持續帶來候補名單。
- 使用者能清楚重述產品價值。
- 有人主動詢問價格、測試或上線時間。
- 訪談後仍確認問題存在，而不是只覺得設計漂亮。
- Waitlist conversion 在多次流量測試後仍有一致表現。

Waitlist 是需求訊號，不等於付費意願。進入完整開發前，最好再做：

- 5–10 位目標使用者訪談。
- 可點擊 prototype 或 TestFlight 測試。
- 價格或付費方案意願測試。
- 明確的 MVP 範圍。

## 14. 新產品標準流程

```text
Idea
  ↓
一句話問題與目標客群
  ↓
Landing page 文案與 mockup
  ↓
Privacy / Terms / Analytics
  ↓
Google Sheet + Apps Script waitlist
  ↓
UTM 流量測試
  ↓
分析轉換與訪談
  ↓
Go：設計 MVP / iOS App
或
Iterate：換定位、文案、客群
或
Stop：不投入完整開發
```

## 15. 可交給 AI 的完整 Prompt

下一次有新產品時，可複製下面整段並替換中括號內容：

```text
我要為一個新產品建立 website-first 的市場驗證流程。

產品資料：
- 產品名稱：[PRODUCT_NAME]
- 一句話定位：[ONE_SENTENCE_VALUE_PROPOSITION]
- 目標使用者：[TARGET_AUDIENCE]
- 要解決的問題：[CORE_PROBLEM]
- 預計平台：[例如 iOS only]
- 支援語言：[例如 English、繁體中文、日本語]
- 網站 repo/path：[REPOSITORY_OR_PATH]
- 正式網址：[WEBSITE_URL]
- GA4 Measurement ID：[GA4_ID；若已有共用 analytics，請先檢查]
- Google Apps Script /exec endpoint：[APPS_SCRIPT_EXEC_URL；如果還沒有，先建立整合碼但不要放一個會失敗的假 endpoint]

請完整實作一個可重複使用的 waitlist 系統，要求如下：

1. 先檢查現有網站結構、語系、analytics、privacy、terms、CTA 和部署方式，不要破壞現有功能。
2. 建立清楚、手機優先、符合品牌的 Email waitlist 表單或 modal。
3. 所有主要 CTA 導向同一個 waitlist 流程；JavaScript 失效時保留合理 fallback。
4. 表單只收 Email，不收姓名、生日、健康資料或其他不必要資訊。
5. 支援網站現有全部語言，包括標題、說明、欄位、送出中、成功、重複、錯誤與隱私提示。
6. 使用 POST application/x-www-form-urlencoded 提交到 Apps Script /exec endpoint。
7. 傳送 email、language、utm_source、utm_medium、utm_campaign、utm_content、page_url、referrer 與 honeypot 欄位。
8. 前端需有 email validation、送出中狀態、防止連點、成功／重複／錯誤處理。
9. Modal 必須支援鍵盤、Escape 關閉、focus 管理、aria-modal、aria-live 與 reduced motion。
10. GA4 記錄 waitlist_clicked 和 waitlist_submitted；絕對不可把 Email 或個人資料傳進 analytics。
11. Apps Script 需包含 doGet health check、doPost、Email 驗證、lowercase normalization、重複 Email 檢查、LockService、honeypot、欄位長度限制、formula injection 防護與 JSON response。
12. Google Sheet 欄位至少包含 submitted_at、email、language、UTM、page_url、referrer。
13. 更新 Privacy Policy，說明 Email 收集用途、通知方式與取消聯絡方法；不要宣稱未實作的功能。
14. 使用 cache-busting 版本更新 JS/CSS。
15. 保留現有使用者修改與不相關檔案，不要做破壞性 git 操作。
16. 實作後執行語法、格式、端點 GET、無效 Email POST、桌機與手機版檢查。
17. 無效 Email 測試不可寫入 Sheet；未經允許不要用假 Email 汙染正式候補名單。
18. 如果缺少 Apps Script /exec URL 或需要 Google 帳號授權，清楚停在安全階段並告訴我下一步，不要部署一個壞掉的 CTA。
19. 完成後列出修改檔案、測試結果、GA4 事件、部署 commit，並請我用自己的 Email 做一次 end-to-end 驗收。

重要原則：
- 這是客戶會看到的正式網站，不要把內部製作備註、AI 說明、示意資料聲明或待辦文字放進頁面。
- 不要捏造真實客戶評價、下載量、使用者數、醫療效果或 App Store 狀態。
- 所有文案需 customer-facing、可信、簡潔。
- 優先使用既有技術與設計系統，避免過度設計。
- 先回報你發現的風險；在授權範圍內完成實作、測試與部署。
```

## 16. 每次上線前 Checklist

### Google Sheet / Apps Script

- [ ] Sheet 保持私人。
- [ ] 工作表名稱與程式一致。
- [ ] GET health check 正常。
- [ ] 使用正式 `/exec` URL。
- [ ] Execute as Me。
- [ ] Access 設為 Anyone。
- [ ] 修改後已部署新版本。
- [ ] 無效 Email 不會新增資料。
- [ ] 重複 Email 不會新增第二列。

### Website

- [ ] 所有主要 CTA 都能開啟表單。
- [ ] Email 欄位支援 autocomplete。
- [ ] 手機不 overflow。
- [ ] 三語內容正確。
- [ ] 成功、錯誤、重複狀態正確。
- [ ] 鍵盤與 Escape 可操作。
- [ ] JS/CSS 有 cache-busting。
- [ ] 沒有內部備註或測試文字。

### Analytics / Privacy

- [ ] `waitlist_clicked` 有送出。
- [ ] `waitlist_submitted` 有送出。
- [ ] Analytics 不包含 Email。
- [ ] UTM 有寫入 Sheet。
- [ ] Privacy Policy 說明 Email 用途。
- [ ] 有取消訂閱或聯絡方式。

### 驗收

- [ ] 用自己的 Email 完成一次 end-to-end 測試。
- [ ] Sheet 確實新增一列。
- [ ] GA4 Realtime / DebugView 看得到事件。
- [ ] 相同 Email 再送一次不重複寫入。
- [ ] 英文、繁中、日文各測一次主要畫面。

---

這份流程的核心不是「如何收 Email」，而是建立一個可以重複使用的產品決策系統：先用網站驗證問題與需求，再決定是否值得投入真正的 iOS 開發。
