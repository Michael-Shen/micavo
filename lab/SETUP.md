# Micavo LAB 設定指南

前端位於 `lab/`，後端範本位於 `lab/apps-script/`。Google Sheet 尚未設定前，頁面會正常顯示，但不會假裝投票成功或顯示假票數。

## 1. 建立 Google Sheet

1. 使用管理 Micavo 的 Google 帳號建立一份空白 Google Sheet。
2. 建議命名為 `Micavo LAB — Votes & Subscribers`。
3. 在 Sheet 選擇「擴充功能 → Apps Script」。
4. 將 `apps-script/Code.gs` 的內容貼到 Apps Script 的 `Code.gs`。
5. 在 Apps Script 左側「專案設定」勾選顯示 `appsscript.json`，再用本資料夾的版本取代它。

## 2. 初始化資料表

1. 在 Apps Script 函式選單選擇 `initializeLab`。
2. 按「執行」，並同意 Spreadsheet 與寄信權限。
3. 回到 Sheet，確認出現：
   - `Votes`
   - `Subscribers`
   - `Events`
   - `Polls`
4. `Polls` 應已包含 `w1_ai_control`。

不要自行更改第一列表頭；Apps Script 依靠固定欄位順序讀寫資料。

## 3. 部署 Apps Script Web App

1. 按右上角「部署 → 新增部署作業」。
2. 類型選擇「網頁應用程式」。
3. 執行身分：`我`。
4. 誰可以存取：`所有人`。
5. 部署後複製以 `/exec` 結尾的 Web App URL。
6. 打開 `lab/lab.js`，將 URL 貼到：

```js
appsScriptUrl: 'https://script.google.com/macros/s/你的部署ID/exec',
```

請勿使用以 `/dev` 結尾的測試 URL。

## 4. 發布前測試

使用無痕視窗打開：

```text
https://micavo.app/lab/?utm_source=youtube&utm_medium=pinned_comment&utm_campaign=w1_ai_control
```

逐項確認：

- [ ] 第一屏看到四個正確選項。
- [ ] 選項被選取後，確認按鈕才可使用。
- [ ] 確認 Modal 顯示正確字母與標題。
- [ ] 投票後 `Votes` 增加一列。
- [ ] 投票後顯示四個選項的即時比例。
- [ ] 同一瀏覽器重新整理後不能重複投票。
- [ ] UTM source、medium、campaign 正確寫入。
- [ ] 留下 Email 前必須勾選明確同意。
- [ ] `Subscribers` 增加或更新一列，狀態為 `subscribed`。
- [ ] 收到 Welcome Email，內容顯示正確選項。
- [ ] 點 Welcome Email 的退訂連結後，狀態變成 `unsubscribed`。
- [ ] GA4 DebugView 可看到 `lab_page_view`、`poll_option_click`、`vote_submitted`、`email_opt_in`。

若要重測同一瀏覽器，可在 DevTools → Application → Local Storage 刪除以 `micavo_lab_w1_ai_control_` 開頭的兩個值。後端仍會依 session ID 阻擋同一瀏覽器重複灌票；完整重測請改用新的無痕視窗。

## 5. 日常管理

- 投票結果：在 `Votes` 使用樞紐分析，Rows 選 `option_id`、Values 使用 `COUNTA vote_id`。
- 來源分析：Rows 使用 `utm_source` / `utm_medium` / `utm_campaign`。
- 寄結果或影片通知前，只選取 `Subscribers.status = subscribed`。
- 不要把 AsianLaunch、TallCenter 或其他產品帳號 Email 匯入這張表。
- 一般 Gmail / Apps Script 有每日寄信配額；名單接近 100–500 或開始需要 bounce/click tracking 時，應換成正式 ESP。

## 更新 Apps Script

修改 `Code.gs` 後，必須到「部署 → 管理部署作業 → 編輯」，選擇「新版本」並重新部署。僅按儲存不會更新公開 `/exec` 版本。
