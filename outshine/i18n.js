(function () {
  var translations = {
    en: {
      nav: { features: "Live Coaching", personas: "Personas", summary: "Summary", pricing: "Pricing", contact: "Contact" },
      hero: {
        eyebrow: "AI Career Copilot",
        title_html: "Get seen. <span class=\"accent\">Outshine</span> every meeting.",
        subtitle: "Your AI Career Copilot for every meeting — live coaching, persona-aware suggestions, and instant summaries.",
        cta1: "Download on the App Store",
        cta2: "See How It Works",
        status: "AI Coach Listening",
        building: "Building context… 3/5 min"
      },
      live: {
        eyebrow: "Context-Aware Coaching",
        title_html: "Live AI <span class=\"accent\">coaching</span> during meetings.",
        subtitle: "Get context-aware suggestions tailored to the conversation, every step of the way.",
        updated: "With you for the whole meeting",
        c1_label: "Strategic Question",
        c1_title: "How will we measure success?",
        c1_body: "Ask the question that moves the discussion forward.",
        c2_label: "Risk Alert",
        c2_title: "What could be the biggest risk?",
        c2_body: "Surface potential risks before they become problems.",
        c3_label: "What to Say Next",
        c3_title: "Should we clarify who owns this decision?",
        c3_body: "Drive clarity and accountability."
      },
      personas: {
        eyebrow: "Persona Coach",
        title_html: "Coaching tailored to <span class=\"accent\">your role</span>.",
        subtitle: "Different roles. Different priorities. Better advice for you.",
        roles: { founder: "Founder", pm: "PM", em: "Eng Manager", sales: "Sales", exec: "Executive", consultant: "Consultant" },
        focus_for: "Coaching focus for",
        f1_title: "Revenue Impact",
        f1_body: "Questions that connect discussions to growth, monetization, and ROI.",
        f2_title: "Customer Impact",
        f2_body: "Surface customer problems, value and long-term differentiation.",
        f3_title: "Strategic Tradeoffs",
        f3_body: "Evaluate tradeoffs, focus on what really moves the needle.",
        footnote: "Outshine adapts to your role as the conversation unfolds, so you can contribute with confidence."
      },
      summary: {
        eyebrow: "After The Meeting",
        title_html: "Leave every meeting with <span class=\"accent\">total clarity</span>.",
        subtitle: "AI summaries, key decisions, action items, open questions, and risks — automatically.",
        heading: "Meeting Summary",
        meeting_title: "Product Roadmap Review",
        meeting_meta: "May 15, 2024 · 45:32 · 8 participants",
        summary_label: "Summary",
        summary_body: "The team reviewed Q3 roadmap priorities, aligned on the MVP scope for Project Aurora, and discussed resource allocation and launch timeline.",
        decisions_label: "Key Decisions",
        d1: "Focus on Aurora MVP for Q3 launch",
        d2: "Defer integration with System X to Q4",
        d3: "Allocate 2 additional engineers to backend",
        actions_label: "Action Items",
        a1: "Finalize Aurora PRD",
        a2: "Confirm design scope",
        a3: "Update resource plan",
        questions_label: "Open Questions",
        q1: "What is the long-term plan for System X integration?",
        q2: "Do we have customer data for use case #3?",
        risks_label: "Risks",
        r1: "Launch delay due to backend dependencies",
        r2: "Limited bandwidth from design team in June"
      },
      how: {
        eyebrow: "How It Works",
        title_html: "Coaching cards while <span class=\"accent\">you talk</span>.",
        subtitle: "Get AI-powered suggestions throughout the meeting, so you always know what to say next.",
        s1_title: "You speak",
        s1_body: "We listen in the background and capture key points.",
        s2_title: "AI analyzes",
        s2_body: "Outshine transcribes and understands the context as the meeting progresses.",
        s3_title: "Get coaching",
        s3_body: "Receive 3 types of coaching cards throughout the conversation.",
        s4_title: "Contribute with confidence",
        s4_body: "Use AI-suggested questions and insights to guide the conversation.",
        privacy_title: "Your conversations stay private and secure.",
        privacy_body: "We never share your data."
      },
      demo: {
        eyebrow: "See It In Action",
        title_html: "Watch Outshine <span class=\"accent\">coach a real meeting</span>.",
        subtitle: "From meeting setup to live coaching cards to hidden insights — see the full flow in under a minute."
      },
      final: {
        title_html: "Don't Just Attend Meetings.<br><span class=\"accent\">Outshine</span> Them.",
        subtitle: "Every meeting is an opportunity to grow your career.",
        f1_title: "Ask Smarter",
        f1_body: "Get strategic questions that move conversations forward.",
        f2_title: "Speak with Confidence",
        f2_body: "Know what to say, even in tough moments.",
        f3_title: "Grow Your Career",
        f3_body: "More impact. More visibility. More opportunities.",
        cta: "Download on the App Store"
      },
      pricing: {
        eyebrow: "Pricing",
        title: "Start free. Upgrade when you're ready.",
        subtitle: "Outshine starts by helping you answer the question that matters in the moment: what should I say next?",
        free_badge: "One-time free credit",
        free_title: "Free",
        free_body: "60 minutes, once — experience a full recording, live coaching, and summary cycle before you pay anything.",
        pro_badge: "Most popular",
        pro_title: "Pro",
        pro_body: "400 meeting minutes a month with live coaching, smart suggestion cards, strategic prompts, meeting summaries, and persona modes.",
        premium_badge: "New",
        premium_title: "Premium",
        premium_body: "800 meeting minutes a month, plus AI Memory that carries context across meetings and an after-meeting AI conversation for deeper, more personalized coaching over time."
      },
      footer: {
        copy: "© 2026 Micavo",
        home: "Micavo",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      }
    },

    zh: {
      nav: { features: "即時教練", personas: "角色模式", summary: "會議摘要", pricing: "訂價", contact: "聯絡我們" },
      hero: {
        eyebrow: "AI 職場副駕駛",
        title_html: "讓自己被看見，在職場<span class=\"accent\">發光發熱</span>。",
        subtitle: "Outshine 是你的 AI 職場副駕駛，陪你度過每一場會議——即時教練、角色化建議與即時摘要。",
        cta1: "前往 App Store 下載",
        cta2: "看看怎麼運作",
        status: "AI 教練聆聽中",
        building: "正在建立脈絡… 3/5 分鐘"
      },
      live: {
        eyebrow: "情境感知教練",
        title_html: "會議中的即時 AI <span class=\"accent\">教練</span>。",
        subtitle: "根據對話內容，全程提供有脈絡的建議。",
        updated: "全程都在你身邊",
        c1_label: "策略性問題",
        c1_title: "我們要如何衡量成功？",
        c1_body: "問出能推動討論前進的問題。",
        c2_label: "風險提醒",
        c2_title: "最大的風險可能是什麼？",
        c2_body: "在風險變成問題之前先提出來。",
        c3_label: "接下來該說什麼",
        c3_title: "我們是否該釐清這個決定由誰負責？",
        c3_body: "釐清責任歸屬，推動共識。"
      },
      personas: {
        eyebrow: "角色教練",
        title_html: "依你的<span class=\"accent\">角色</span>量身打造的教練。",
        subtitle: "不同角色，不同重點，給你更貼切的建議。",
        roles: { founder: "創辦人", pm: "產品經理", em: "工程主管", sales: "銷售", exec: "高階主管", consultant: "顧問" },
        focus_for: "的教練重點：",
        f1_title: "營收影響",
        f1_body: "把討論連結到成長、營利與投資回報的問題。",
        f2_title: "客戶影響",
        f2_body: "找出客戶痛點、價值與長期差異化。",
        f3_title: "策略取捨",
        f3_body: "評估取捨，聚焦真正關鍵的事。",
        footnote: "Outshine 會隨著對話進行依你的角色調整建議，讓你能更有自信地參與討論。"
      },
      summary: {
        eyebrow: "會議結束後",
        title_html: "讓每場會議都<span class=\"accent\">清晰明確</span>地結束。",
        subtitle: "自動產生 AI 摘要、關鍵決策、待辦事項、待解問題與風險。",
        heading: "會議摘要",
        meeting_title: "產品路線圖回顧",
        meeting_meta: "2024 年 5 月 15 日 · 45:32 · 8 位參與者",
        summary_label: "摘要",
        summary_body: "團隊回顧了第三季路線圖的優先順序，敲定了 Aurora 專案的 MVP 範圍，並討論資源分配與上線時程。",
        decisions_label: "關鍵決策",
        d1: "第三季專注於 Aurora MVP 上線",
        d2: "將與 System X 的整合延到第四季",
        d3: "為後端團隊增派 2 名工程師",
        actions_label: "待辦事項",
        a1: "完成 Aurora PRD",
        a2: "確認設計範疇",
        a3: "更新資源計畫",
        questions_label: "待解問題",
        q1: "System X 整合的長期計畫是什麼？",
        q2: "我們有第 3 個使用案例的客戶資料嗎？",
        risks_label: "風險",
        r1: "後端相依性可能導致上線延遲",
        r2: "六月設計團隊人力有限"
      },
      how: {
        eyebrow: "運作方式",
        title_html: "你說話的同時，<span class=\"accent\">持續</span>提供教練建議。",
        subtitle: "在會議全程持續提供 AI 建議，讓你隨時知道接下來該說什麼。",
        s1_title: "你發言",
        s1_body: "我們在背景聆聽，並擷取重點內容。",
        s2_title: "AI 分析",
        s2_body: "Outshine 會隨著會議進行轉錄並理解語境。",
        s3_title: "取得教練建議",
        s3_body: "在會議過程中持續收到三種教練卡。",
        s4_title: "自信參與",
        s4_body: "運用 AI 建議的問題與觀點，引導對話方向。",
        privacy_title: "你的對話內容保持私密與安全。",
        privacy_body: "我們絕不分享你的資料。"
      },
      demo: {
        eyebrow: "實際操作",
        title_html: "看 Outshine 如何<span class=\"accent\">即時指導一場會議</span>。",
        subtitle: "從設定會議、即時教練卡，到挖掘隱藏洞察——一分鐘內看完完整流程。"
      },
      final: {
        title_html: "別只是<span class=\"accent\">出席</span>會議，<br>要<span class=\"accent\">脫穎而出</span>。",
        subtitle: "每場會議都是成長職涯的機會。",
        f1_title: "問得更聰明",
        f1_body: "提出能推動對話前進的策略性問題。",
        f2_title: "自信發言",
        f2_body: "知道該說什麼，即使在艱難時刻。",
        f3_title: "加速職涯成長",
        f3_body: "更多影響力、更多曝光、更多機會。",
        cta: "前往 App Store 下載"
      },
      pricing: {
        eyebrow: "訂價",
        title: "免費開始，準備好再升級。",
        subtitle: "Outshine 從解決你當下最關心的問題開始：接下來該說什麼？",
        free_badge: "一次性免費額度",
        free_title: "免費版",
        free_body: "一次性 60 分鐘，免費體驗完整的錄音、即時教練與會議摘要流程，無需先付費。",
        pro_badge: "最受歡迎",
        pro_title: "專業版",
        pro_body: "每月 400 分鐘會議時間，含即時教練、智慧建議卡、策略提示、會議摘要與角色模式。",
        premium_badge: "新功能",
        premium_title: "進階版",
        premium_body: "每月 800 分鐘會議時間，外加跨會議的 AI 記憶與會後 AI 對話，讓教練建議隨著時間更貼合你。"
      },
      footer: {
        copy: "© 2026 Micavo",
        home: "Micavo",
        privacy: "隱私權政策",
        terms: "服務條款"
      }
    },

    ja: {
      nav: { features: "ライブコーチング", personas: "ペルソナ", summary: "会議の要約", pricing: "料金", contact: "お問い合わせ" },
      hero: {
        eyebrow: "AIキャリアコパイロット",
        title_html: "見られる存在になり、職場で<span class=\"accent\">輝く</span>。",
        subtitle: "Outshineは、あらゆる会議に対応するあなたのAIキャリアコパイロットです。ライブコーチング、ペルソナに応じた提案、即座の要約を提供します。",
        cta1: "App Storeでダウンロード",
        cta2: "仕組みを見る",
        status: "AIコーチが聞いています",
        building: "コンテキストを構築中… 3/5分"
      },
      live: {
        eyebrow: "コンテキストに応じたコーチング",
        title_html: "会議中のライブAI<span class=\"accent\">コーチング</span>。",
        subtitle: "会話の文脈に合わせて、会議の間ずっと提案を取得。",
        updated: "会議中はずっとあなたのそばに",
        c1_label: "戦略的な質問",
        c1_title: "成功をどう測定しますか？",
        c1_body: "議論を前進させる質問をしましょう。",
        c2_label: "リスクアラート",
        c2_title: "最大のリスクは何でしょうか？",
        c2_body: "リスクが問題になる前に表面化しましょう。",
        c3_label: "次に言うべきこと",
        c3_title: "この決定の責任者を明確にすべきでしょうか？",
        c3_body: "明確さと責任を促進します。"
      },
      personas: {
        eyebrow: "ペルソナコーチ",
        title_html: "あなたの<span class=\"accent\">役割</span>に合わせたコーチング。",
        subtitle: "役割が違えば優先事項も違う。あなたに合ったアドバイスを。",
        roles: { founder: "創業者", pm: "PM", em: "エンジニアリングマネージャー", sales: "セールス", exec: "役員", consultant: "コンサルタント" },
        focus_for: "向けのコーチングフォーカス",
        f1_title: "収益インパクト",
        f1_body: "成長、収益化、ROIに関する議論につなげる質問。",
        f2_title: "顧客インパクト",
        f2_body: "顧客課題、価値、長期的な差別化を明らかに。",
        f3_title: "戦略的トレードオフ",
        f3_body: "トレードオフを評価し、本当に重要なことに集中。",
        footnote: "Outshineは会議が進むにつれてあなたの役割に合わせて適応し、自信を持って発言できるようにします。"
      },
      summary: {
        eyebrow: "会議後",
        title_html: "すべての会議を<span class=\"accent\">完全な明確さ</span>で終える。",
        subtitle: "AIによる要約、重要な決定、アクションアイテム、未解決の質問、リスクを自動的に。",
        heading: "会議の要約",
        meeting_title: "プロダクトロードマップレビュー",
        meeting_meta: "2024年5月15日 · 45:32 · 参加者8名",
        summary_label: "要約",
        summary_body: "チームはQ3ロードマップの優先事項を見直し、Project AuroraのMVPスコープに合意し、リソース配分とローンチ計画について議論しました。",
        decisions_label: "主な決定事項",
        d1: "Q3ローンチに向けてAurora MVPに集中",
        d2: "System Xとの統合をQ4に延期",
        d3: "バックエンドにエンジニア2名を追加配置",
        actions_label: "アクションアイテム",
        a1: "Aurora PRDを完成させる",
        a2: "デザインスコープを確認する",
        a3: "リソース計画を更新する",
        questions_label: "未解決の質問",
        q1: "System X統合の長期計画は？",
        q2: "ユースケース#3の顧客データはありますか？",
        risks_label: "リスク",
        r1: "バックエンドの依存関係によるローンチ延期",
        r2: "6月のデザインチームのリソース不足"
      },
      how: {
        eyebrow: "仕組み",
        title_html: "話している間も、<span class=\"accent\">継続的</span>にコーチング。",
        subtitle: "会議の間ずっとAIの提案を取得し、次に何を言うべきか常に把握。",
        s1_title: "あなたが話す",
        s1_body: "バックグラウンドで聞き取り、重要なポイントを記録します。",
        s2_title: "AIが分析",
        s2_body: "Outshineが会議の進行に合わせて文字起こしと文脈理解を行います。",
        s3_title: "コーチングを受ける",
        s3_body: "会議の間、3種類のコーチングカードを継続的に取得。",
        s4_title: "自信を持って発言",
        s4_body: "AIが提案する質問や視点を活用して議論を導きます。",
        privacy_title: "あなたの会話は常にプライベートかつ安全です。",
        privacy_body: "データを共有することはありません。"
      },
      demo: {
        eyebrow: "実際の動作",
        title_html: "Outshineが<span class=\"accent\">実際の会議をコーチング</span>する様子。",
        subtitle: "会議の設定からライブコーチングカード、隠れたインサイトまで——1分足らずで全体の流れをご覧いただけます。"
      },
      final: {
        title_html: "会議に<span class=\"accent\">参加するだけ</span>じゃない。<br><span class=\"accent\">Outshine</span>しよう。",
        subtitle: "すべての会議はキャリアを成長させるチャンスです。",
        f1_title: "より賢く質問",
        f1_body: "議論を前進させる戦略的な質問を。",
        f2_title: "自信を持って発言",
        f2_body: "難しい場面でも、何を言うべきか分かる。",
        f3_title: "キャリアを成長させる",
        f3_body: "より大きなインパクト、可視性、チャンス。",
        cta: "App Storeでダウンロード"
      },
      pricing: {
        eyebrow: "料金",
        title: "無料で始めて、準備ができたらアップグレード。",
        subtitle: "Outshineは、今この瞬間に大事な問いに応えることから始まります：次に何を言うべきか？",
        free_badge: "一度限りの無料クレジット",
        free_title: "Free",
        free_body: "一度だけ60分間、録音・ライブコーチング・要約までの全体験を無料で。お支払いの前にお試しいただけます。",
        pro_badge: "人気No.1",
        pro_title: "Pro",
        pro_body: "月400分の会議時間、ライブコーチング、スマート提案カード、戦略的プロンプト、会議の要約、ペルソナモード付き。",
        premium_badge: "New",
        premium_title: "Premium",
        premium_body: "月800分の会議時間に加え、会議をまたいで記憶するAIメモリーと会議後のAI対話で、コーチングが時間とともにより個人に最適化されます。"
      },
      footer: {
        copy: "© 2026 Micavo",
        home: "Micavo",
        privacy: "プライバシーポリシー",
        terms: "利用規約"
      }
    }
  };

  var appStoreLinks = {
    en: "https://apps.apple.com/us/app/outshine/id6782229641",
    zh: "https://apps.apple.com/tw/app/outshine/id6782229641?l=zh-Hant-TW",
    ja: "https://apps.apple.com/jp/app/outshine/id6782229641"
  };

  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o && o[k] !== undefined ? o[k] : undefined; }, obj);
  }

  function applyLanguage(lang) {
    var dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-app-store-link]").forEach(function (link) {
      link.href = appStoreLinks[lang] || appStoreLinks.en;
    });

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

    var personaActive = document.querySelector(".persona-tab.active");
    if (personaActive) {
      var roleKey = personaActive.getAttribute("data-role-key");
      var focusEl = document.querySelector("[data-focus-for]");
      if (focusEl && roleKey) {
        var roleName = get(dict, "personas.roles." + roleKey);
        var prefix = get(dict, "personas.focus_for");
        focusEl.textContent = lang === "ja" ? roleName + prefix : prefix + " " + roleName;
      }
    }

    try { localStorage.setItem("outshine-lang", lang); } catch (e) {}
  }

  function detectLanguage() {
    try {
      var param = new URLSearchParams(window.location.search).get("lang");
      if (param && translations[param]) return param;
    } catch (e) {}
    try {
      var saved = localStorage.getItem("outshine-lang");
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

    document.querySelectorAll(".persona-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".persona-tab").forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        applyLanguage(document.documentElement.lang || "en");
      });
    });

    applyLanguage(detectLanguage());

    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has("lang")) {
        params.delete("lang");
        var query = params.toString();
        var cleanUrl = window.location.pathname + (query ? "?" + query : "") + window.location.hash;
        window.history.replaceState({}, "", cleanUrl);
      }
    } catch (e) {}
  });
})();
