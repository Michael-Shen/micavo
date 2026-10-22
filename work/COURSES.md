# 課程上架與名單操作手冊

給之後的自己看：怎麼在 `https://micavo.app/work/` 放課程、收報名名單、開第二門課。

相關檔案：

| 檔案 | 用途 |
|---|---|
| `work/index.html` | 合作頁本體，課程區塊的文字都在這個檔案 |
| `work/apps-script/Code.gs` | 表單寫入 Google 試算表的程式（貼在 Apps Script，不是網站的一部分） |
| `work/apps-script/README.md` | 第一次設定 Google 試算表的步驟 |

---

## 1. 現況：課程「準備中」，收 Email 名單

頁面下方的黑色區塊會顯示課程名稱、一段說明和一個 Email 欄位。訪客留下 Email 後，資料會寫進 Google 試算表的 **Course waitlist** 分頁，同時寄一封通知信到 `hello@micavo.app`。

試算表欄位：

| Time | Email | Course | Language | Page | Referrer |
|---|---|---|---|---|---|
| 報名時間 | 訪客 Email | 哪一門課（`id` + 英文標題） | 訪客當時看的語言 | 從哪個頁面報名 | 從哪裡來的 |

---

## 2. 修改課程名稱與說明（最常做）

打開 `work/index.html`，搜尋 `var COURSE = {`（大約在第 292 行）：

```js
var COURSE = {
  id: 'first-app-with-ai',
  title: {
    en: 'Courses: build and launch your first app with AI',
    zh: '課程：用 AI 做出並上架你的第一個 App',
    ja: '講座：AI で初めてのアプリを作って公開'
  },
  blurb: {
    en: "I'm turning what I learned from shipping 6+ apps into a course. Leave your email and you'll hear from me first.",
    zh: '我正在把做 6 款以上 App 學到的東西整理成課程。留下 Email，開課時你會最先收到通知。',
    ja: '6 本以上のアプリ開発で学んだことを講座にまとめています。メールアドレスを残していただければ、最初にお知らせします。'
  }
};
```

| 欄位 | 作用 | 注意 |
|---|---|---|
| `id` | 寫進試算表的 Course 欄，用來分辨是哪一門課 | 只用英文、數字、連字號；**同一門課不要中途改** |
| `title` | 頁面上的大標題 | `en` / `zh` / `ja` **三種語言都要改** |
| `blurb` | 標題下面的說明 | 同上，三種語言都要改 |

改完存檔 → commit → push，GitHub Pages 幾分鐘後更新。

### 容易出錯的地方

- **字串裡有單引號**（例如 `I'm`）時，整段要用**雙引號**包起來，不然 JavaScript 會語法錯誤，整個表單會失效。
- **只改了一種語言**，其他語言的訪客還是會看到舊名稱。
- 改完請在頁面上實際送一筆自己的 Email（見第 6 節）。

---

## 3. 課程開賣時：另外開一個「現在可報名」區塊

已經開課的課程**不要**再走 Email 名單，直接放一個獨立區塊，附上課連結。「準備中」的黑色名單區塊保留，留給下一門還沒開的課。

### 3.1 新增「現在可報名」區塊

在 `work/index.html` 找到這一行，**在它前面**貼上下面的區塊：

```html
    <div class="courses" id="courses">
```

```html
    <section id="courses-open">
      <h2><span class="en">Courses available now</span><span class="zh">現在可以報名的課程</span><span class="ja">受付中の講座</span></h2>
      <p class="sub"><span class="en">Learn the way I build.</span><span class="zh">跟我學我做 App 的方法。</span><span class="ja">私の開発の進め方を学べます。</span></p>
      <div class="cards">
        <div class="card">
          <h3><span class="en">課程英文名稱</span><span class="zh">課程中文名稱</span><span class="ja">講座の日本語名</span></h3>
          <p><span class="en">One or two sentences about what students will be able to do.</span><span class="zh">一到兩句話，說明學完能做到什麼。</span><span class="ja">受講後にできるようになることを1〜2文で。</span></p>
          <p style="margin-top:16px">
            <a class="button primary" href="https://你的上課報名網址" target="_blank" rel="noopener noreferrer"
               data-ga-event="course_enroll_clicked" data-ga-param-product="Micavo" data-ga-param-cta-location="work_courses_open">
              <span class="en">Enroll</span><span class="zh">我要報名</span><span class="ja">申し込む</span>
            </a>
          </p>
        </div>
      </div>
    </section>
```

- 每多一門已開課的課程，就複製一個 `<div class="card"> ... </div>`，貼在同一個 `<div class="cards">` 裡面。
- 三種語言都要寫。
- 如果要標價格，在說明那行後面加一句，例如 `<span class="en">US$99</span>`（三種語言都要加）。
- 要加連結的網址請放你實際的報名頁（課程平台、付款頁等）。

### 3.2 準備中的區塊怎麼處理

- **還有下一門課要預告**：保留黑色名單區塊，照第 2 節改 `COURSE` 成下一門課。
- **暫時沒有下一門課**：把整個 `<div class="courses" id="courses"> ... </div>` 刪掉（或整段用 `<!-- -->` 註解起來），頁面上就不會再出現「準備中」。

### 3.3 通知名單上的人

課程開賣時，要通知之前留 Email 的人：

1. 打開試算表的 **Course waitlist** 分頁。
2. 用 Course 欄篩出這門課的報名者。
3. 把 Email 欄複製出來，用 BCC 寄開課通知（人數多時請用寄信工具，不要一次塞太多收件人）。

## 4. 開第二門課

1. 在 `COURSE` 區塊把 `id` 改成**新的代號**（例如 `'flutter-basics'`），標題和說明三種語言都換成新課程。
2. 舊課程的報名者還留在試算表裡，Course 欄是舊的 `id`，不會跟新課程混在一起。
3. 「準備中」的黑色區塊目前一次只能放**一門**課。已經開課的課程請放在第 3 節的「現在可報名」區塊，那邊可以放很多門。如果要同時預告兩門以上「準備中」的課，需要改程式，請叫 Claude 幫你改。

---

## 5. 常見問題

| 狀況 | 原因與處理 |
|---|---|
| 送出後顯示「出了點問題」 | 網路問題，或 Apps Script 沒有部署成「所有人可存取」。先在瀏覽器打開 `/exec` 網址，看到 `{"ok":true,...}` 才代表後端正常 |
| 試算表沒有新資料，但頁面顯示成功 | 通常是 Apps Script 部署版本太舊。到 Apps Script：**部署 → 管理部署作業 → 編輯（鉛筆）→ 版本選「新版本」→ 部署**。網址不會變 |
| 沒收到通知信 | 先看垃圾信件夾；再確認 `Code.gs` 最上面 `NOTIFY_EMAIL` 的信箱，以及授權時有允許寄信 |
| Course 欄是空的 | 後端還是舊版（沒有 Course 欄的版本），照上一列重新部署新版本 |
| 想換通知信箱 | 改 `Code.gs` 的 `NOTIFY_EMAIL`，然後照上面步驟重新部署「新版本」 |
| 頁面一直顯示舊的課程名稱 | 瀏覽器快取，用 Cmd+Shift+R 強制重新整理；也確認 push 成功、GitHub Pages 已部署完成 |

---

## 6. 改完之後的檢查清單

- [ ] 三種語言（EN / 中文 / 日本語）切換後，課程名稱和說明都是新的
- [ ] 在頁面上用自己的 Email 送一筆課程名單
- [ ] 試算表 **Course waitlist** 出現新的一列，Course 欄的 `id` 是對的
- [ ] hello@micavo.app 收到通知信
- [ ] 刪掉那筆測試資料

---

## 7. 相關設定速查

- 網站的後端網址（Apps Script `/exec`）寫在 `work/index.html` 的 `var ENDPOINT = '...'`。**重新部署新版本時網址不會變**，所以不用改。如果你是「新增部署作業」而不是「編輯既有部署」，網址就會變，這時要把新網址貼回 `ENDPOINT`。
- 試算表分頁：**Consults**（諮詢表單）、**Course waitlist**（課程名單），都由程式自動建立。
- 每月專案名額的說明文字（「每月只接 1 個專案」）在 `work/index.html` 搜尋 `class="slot"`，三種語言各一份。
