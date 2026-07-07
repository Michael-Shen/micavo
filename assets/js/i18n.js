(function () {
  var translations = {
    en: {
      nav: { products: "Products", contact: "Contact" },
      hero: {
        eyebrow: "Decision intelligence product studio",
        title: "AI products for the choices people make every day.",
        subtitle: "Micavo builds focused, privacy-conscious software that turns personal context into practical recommendations. Our products help people decide what to eat, what to prioritize, and what to do next.",
        cta_explore: "Explore Products",
        cta_work: "Work With Micavo"
      },
      status: { live: "Live on App Store" },
      carousel: {
        eatornot: { desc: "Nutrition decisions powered by meal analysis, calorie budgets, macro context, and permission-based Apple Health data." },
        outshine: { desc: "An AI Career Copilot that helps professionals know what to say next in meetings and become more influential over time." },
        critical_choice: { desc: "A productivity app built around the Eisenhower Matrix, helping users separate urgent noise from important work." }
      },
      common: { view_product: "View product" },
      products_section: {
        eyebrow: "Products",
        title: "Built around real decision moments.",
        subtitle: "Each Micavo product focuses on one high-friction question, then makes the next step clearer through thoughtful UX and AI-assisted reasoning."
      },
      product_eatornot: {
        status: "AI nutrition coach",
        desc: "EatOrNot AI helps people decide whether a meal fits their day. It supports photo and voice food input, estimates calories and macros, tracks daily nutrition progress, and uses authorized Apple Health context for personalized coaching.",
        f1: "Photo and voice meal analysis with clear eat-or-adjust guidance.",
        f2: "Daily calorie and macro tracking designed for quick decisions.",
        f3: "Pro and Premium coaching for weekly insights and habit patterns.",
        open: "Open EatOrNot AI"
      },
      product_outshine: {
        desc: "Outshine is an AI Career Copilot for meetings: live coaching cards that help users ask sharper questions and know what to say next, plus an after-meeting summary.",
        f1: "Live coaching cards: a strategic question, a career signal, and what to say next.",
        f2: "One-time free 60-minute credit, then Pro (400 min/month) or Premium (800 min/month, cross-meeting AI memory, post-meeting AI conversation).",
        f3: "Automatic meeting summaries with decisions, action items, open questions, and risks.",
        open: "Open Outshine"
      },
      product_critical: {
        status: "Productivity system",
        desc: "Critical Choice brings the Eisenhower Matrix into a modern task manager. It helps users sort work by urgency and importance, focus on high-leverage tasks, sync calendar events, and collaborate through cloud projects.",
        f1: "Visual quadrant organization for urgent and important work.",
        f2: "Daily task view, achievements, calendar sync, and cloud sync.",
        f3: "Premium features for teams, custom tags, assignments, and collaboration.",
        open: "Open Critical Choice"
      },
      matrix: {
        q1: "Crises, deadlines, emergencies.",
        q2: "Planning, growth, meaningful work.",
        q3: "Interruptions and other people's priorities.",
        q4: "Busywork and time wasters."
      },
      approach_section: {
        eyebrow: "Approach",
        title: "Small products, serious product thinking.",
        subtitle: "Micavo favors narrow, useful products over broad AI demos. The goal is software that feels calm, actionable, and trustworthy in daily life."
      },
      principles: {
        p1_title: "Decisions, not dashboards",
        p1_desc: "EatOrNot never shows a calorie dashboard. Every meal gets one verdict: eat it, or adjust it.",
        p2_title: "Context, not guesswork",
        p2_desc: "Critical Choice syncs your calendar so the quadrant view reflects your actual day — not a task list you have to update by hand every time your schedule changes.",
        p3_title: "Action, not novelty",
        p3_desc: "Outshine doesn't wait for the meeting to end. Mid-call, it hands you one sharp question, one risk, and one line to say next — not a dashboard."
      },
      contact: {
        title: "Building practical AI for personal operating systems.",
        subtitle: "For product questions, support, partnerships, or media inquiries, reach Micavo directly."
      },
      footer: {
        copy: "© 2026 Micavo. All rights reserved.",
        contact: "Contact"
      }
    },
    zh: {
      nav: { products: "產品", contact: "聯絡我們" },
      hero: {
        eyebrow: "決策智慧產品工作室",
        title: "為日常生活中的每個抉擇打造 AI 產品。",
        subtitle: "Micavo 打造專注且注重隱私的軟體，將個人情境轉化為實用建議。我們的產品協助使用者決定吃什麼、該優先做什麼、接下來該做什麼。",
        cta_explore: "探索產品",
        cta_work: "與 Micavo 合作"
      },
      status: { live: "已上架 App Store" },
      carousel: {
        eatornot: { desc: "透過餐點分析、卡路里預算、營養素情境，以及經授權的 Apple Health 資料，做出更聰明的飲食決策。" },
        outshine: { desc: "AI 職場教練，協助專業人士在會議中知道接下來該說什麼，並隨時間累積更大的影響力。" },
        critical_choice: { desc: "以艾森豪矩陣為核心的生產力應用，協助使用者從緊急雜訊中分辨出真正重要的工作。" }
      },
      common: { view_product: "查看產品" },
      products_section: {
        eyebrow: "產品",
        title: "圍繞真實抉擇時刻打造。",
        subtitle: "每個 Micavo 產品都聚焦於一個高摩擦的問題，透過周到的使用者體驗與 AI 輔助推理，讓下一步更清楚。"
      },
      product_eatornot: {
        status: "AI 營養教練",
        desc: "EatOrNot AI 協助使用者判斷一餐是否適合當天所需。支援拍照與語音輸入食物、估算卡路里與營養素、追蹤每日營養進度，並運用經授權的 Apple Health 情境提供個人化建議。",
        f1: "拍照與語音餐點分析，提供清楚的「吃」或「調整」建議。",
        f2: "每日卡路里與營養素追蹤，協助快速決策。",
        f3: "Pro 與 Premium 教練功能，提供每週洞察與習慣分析。",
        open: "開啟 EatOrNot AI"
      },
      product_outshine: {
        desc: "Outshine 是會議專用的 AI 職場教練：即時教練卡片協助使用者提出更精準的問題、知道接下來該說什麼，並提供會後摘要。",
        f1: "即時教練卡片：策略性問題、職涯訊號，以及接下來該說什麼。",
        f2: "首次免費 60 分鐘體驗，之後可選擇 Pro（每月 400 分鐘）或 Premium（每月 800 分鐘，具跨會議 AI 記憶與會後 AI 對話）。",
        f3: "自動產出會議摘要，涵蓋決策、行動項目、待解問題與風險。",
        open: "開啟 Outshine"
      },
      product_critical: {
        status: "生產力系統",
        desc: "Critical Choice 將艾森豪矩陣帶入現代化的任務管理工具，協助使用者依緊急與重要程度排序工作、聚焦高槓桿任務、同步行事曆，並透過雲端專案協作。",
        f1: "以視覺化象限組織緊急與重要的工作。",
        f2: "每日任務檢視、成就系統、行事曆同步與雲端同步。",
        f3: "適合團隊的進階功能：自訂標籤、任務指派與協作。",
        open: "開啟 Critical Choice"
      },
      matrix: {
        q1: "危機、截止期限、緊急事件。",
        q2: "規劃、成長、有意義的工作。",
        q3: "干擾與他人的優先事項。",
        q4: "瑣事與浪費時間的事。"
      },
      approach_section: {
        eyebrow: "理念",
        title: "小而精的產品，嚴謹的產品思維。",
        subtitle: "Micavo 偏好專注、實用的產品，而非廣泛的 AI 展示。目標是讓軟體在日常生活中感覺沉穩、可行且值得信賴。"
      },
      principles: {
        p1_title: "決策，而非儀表板",
        p1_desc: "EatOrNot 從不秀出卡路里儀表板。每一餐只給一個判斷：吃，或調整。",
        p2_title: "情境，而非猜測",
        p2_desc: "Critical Choice 同步你的行事曆，讓象限視圖反映你今天實際的行程——不是一份要你手動維護、行程一變就得重新調整的清單。",
        p3_title: "行動，而非新奇",
        p3_desc: "Outshine 不會等到會議結束才給摘要。會議進行中，它就直接給你一個尖銳的問題、一個風險提醒，以及接下來該說的一句話——不是儀表板。"
      },
      contact: {
        title: "為個人作業系統打造實用的 AI。",
        subtitle: "如有產品問題、支援需求、合作機會或媒體詢問，歡迎直接聯絡 Micavo。"
      },
      footer: {
        copy: "© 2026 Micavo. 版權所有。",
        contact: "聯絡我們"
      }
    },
    ja: {
      nav: { products: "プロダクト", contact: "お問い合わせ" },
      hero: {
        eyebrow: "意思決定インテリジェンス・プロダクトスタジオ",
        title: "日々の選択のためのAIプロダクト。",
        subtitle: "Micavoは、個人のコンテキストを実用的な提案へと変える、焦点を絞ったプライバシー重視のソフトウェアを開発しています。私たちのプロダクトは、何を食べるか、何を優先するか、次に何をすべきかを決めるお手伝いをします。",
        cta_explore: "プロダクトを見る",
        cta_work: "Micavoと仕事をする"
      },
      status: { live: "App Storeで公開中" },
      carousel: {
        eatornot: { desc: "食事分析、カロリー予算、栄養素のコンテキスト、許可制のApple Healthデータを活用した栄養に関する意思決定。" },
        outshine: { desc: "会議で次に何を話すべきかを教えてくれるAIキャリアコパイロット。プロフェッショナルの影響力を時間とともに高めます。" },
        critical_choice: { desc: "アイゼンハワー・マトリクスを軸にした生産性アプリ。緊急な雑音と本当に重要な仕事を見分けるお手伝いをします。" }
      },
      common: { view_product: "プロダクトを見る" },
      products_section: {
        eyebrow: "プロダクト",
        title: "リアルな意思決定の瞬間を中心に設計。",
        subtitle: "Micavoの各プロダクトは、一つの摩擦の大きい問いに焦点を当て、思慮深いUXとAIによる推論で次の一歩を明確にします。"
      },
      product_eatornot: {
        status: "AI栄養コーチ",
        desc: "EatOrNot AIは、その食事が今日の自分に合っているかを判断するお手伝いをします。写真や音声での食事入力、カロリーと栄養素の推定、日々の栄養進捗の追跡、許可されたApple Healthのコンテキストを使ったパーソナライズされたコーチングに対応しています。",
        f1: "写真・音声による食事分析と、明確な「食べる／調整する」ガイダンス。",
        f2: "素早い判断のための日々のカロリー・栄養素トラッキング。",
        f3: "週次インサイトと習慣パターンのためのProおよびPremiumコーチング。",
        open: "EatOrNot AIを開く"
      },
      product_outshine: {
        desc: "Outshineは会議のためのAIキャリアコパイロットです。ライブコーチングカードが、より鋭い質問や次の発言を考える手助けをし、会議後には要約も提供します。",
        f1: "ライブコーチングカード：戦略的な質問、キャリアシグナル、次に言うべきこと。",
        f2: "初回無料60分クレジット、その後はPro（月400分）またはPremium（月800分、会議をまたぐAIメモリー、会議後のAI対話）。",
        f3: "決定事項、アクションアイテム、未解決の質問、リスクを含む自動会議要約。",
        open: "Outshineを開く"
      },
      product_critical: {
        status: "生産性システム",
        desc: "Critical Choiceは、アイゼンハワー・マトリクスを現代的なタスクマネージャーに取り入れています。緊急度と重要度で仕事を整理し、レバレッジの高いタスクに集中し、カレンダーを同期し、クラウドプロジェクトで協働できます。",
        f1: "緊急かつ重要な仕事のためのビジュアルな象限管理。",
        f2: "デイリータスクビュー、実績、カレンダー同期、クラウド同期。",
        f3: "チーム向けのPremium機能：カスタムタグ、割り当て、コラボレーション。",
        open: "Critical Choiceを開く"
      },
      matrix: {
        q1: "危機、締め切り、緊急事態。",
        q2: "計画、成長、意義のある仕事。",
        q3: "割り込みや他人の優先事項。",
        q4: "雑務や時間の浪費。"
      },
      approach_section: {
        eyebrow: "アプローチ",
        title: "小さなプロダクトに、本気のプロダクト思考を。",
        subtitle: "Micavoは、広範なAIデモよりも、狭く実用的なプロダクトを重視します。目指すのは、日常生活の中で落ち着いていて、行動につながり、信頼できるソフトウェアです。"
      },
      principles: {
        p1_title: "意思決定を、ダッシュボードではなく",
        p1_desc: "EatOrNotはカロリーダッシュボードを見せません。各食事に出す判断は一つだけ：食べるか、調整するか。",
        p2_title: "コンテキストを、当て推量ではなく",
        p2_desc: "Critical Choiceはカレンダーを同期し、象限ビューがあなたの実際の一日を反映します——予定が変わるたびに手動で更新しなければならないタスクリストではありません。",
        p3_title: "行動を、目新しさではなく",
        p3_desc: "Outshineは会議後にまとめて要約しません。会議中に、鋭い質問、リスク、次に言うべき一言をその場で提示します——ダッシュボードではありません。"
      },
      contact: {
        title: "パーソナルOSのための実用的なAIを構築する。",
        subtitle: "プロダクトに関するご質問、サポート、パートナーシップ、取材のお問い合わせは、Micavoまで直接ご連絡ください。"
      },
      footer: {
        copy: "© 2026 Micavo. All rights reserved.",
        contact: "お問い合わせ"
      }
    }
  };

  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o && o[k] !== undefined ? o[k] : undefined; }, obj);
  }

  function applyLanguage(lang) {
    var dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = get(dict, key);
      if (val === undefined) return;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });

    try { localStorage.setItem("micavo-lang", lang); } catch (e) {}
  }

  function detectLanguage() {
    try {
      var saved = localStorage.getItem("micavo-lang");
      if (saved && translations[saved]) return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("zh") === 0) return "zh";
    if (nav.indexOf("ja") === 0) return "ja";
    return "en";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang-btn"));
      });
    });

    applyLanguage(detectLanguage());
  });
})();
