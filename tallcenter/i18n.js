(function () {
  'use strict';

  const translations = {
    'zh-Hant': {
      'Height Predictor & Growth Tracker for Teens | TallCenter': '青少年身高預測與成長追蹤 | TallCenter',
      'How it works': '運作方式', 'Features': '功能', 'FAQ': '常見問題', 'Get early access': '搶先體驗',
      'Height predictor & growth tracker': '身高預測與成長追蹤',
      'How tall will I be? See your': '我會長多高？查看你的', 'estimated range.': '預估範圍。',
      'TallCenter uses your family-height inputs to estimate a transparent educational adult-height range—then helps you track measurements and follow general sleep, nutrition, and activity guidance that supports overall health.': 'TallCenter 根據家族身高資料，提供透明、教育用途的成年身高預估範圍，並協助你記錄量測，參考一般睡眠、營養與活動指引，支持整體健康。',
      'Join early access ↗': '加入搶先體驗 ↗', 'Explore the growth tracker': '探索成長追蹤',
      'Designed for ages 10–20': '適合 10–20 歲', 'English · 繁中 · 日本語': 'English · 繁中 · 日本語', 'Transparent method': '透明計算方式',
      'Your range, not a promise.': '這是範圍，不是保證。', 'Method and uncertainty shown.': '清楚呈現方法與不確定性。',
      'Turn insight into action.': '把洞察化為行動。', 'Sleep · Nutrition · Activity': '睡眠 · 營養 · 活動',
      'Know your range': '了解你的範圍', 'Build healthy routines': '建立健康習慣', 'Track your progress': '追蹤你的進度', 'Share the journey': '分享成長旅程',
      'Adult height estimate and daily tracking': '成年身高預估與每日追蹤',
      'From “how tall?” to “what can I do today?”': '從「我會長多高？」到「今天能做什麼？」',
      'A height prediction and growth-tracking loop that moves from understanding to action—without pretending an app can guarantee extra height.': '從了解預估範圍到採取日常行動；我們不會假裝 App 能保證增加身高。',
      '01 · Estimate': '01 · 預估', 'See an honest family-height range.': '查看誠實的家族身高範圍。',
      'The height predictor uses biological parents’ heights and the mid-parental method, with the likely band, broader family reference range, and uncertainty clearly displayed.': '身高預測使用生理父母身高與父母身高中位數方法，清楚呈現較可能區間、較廣家庭參考範圍與不確定性。',
      '02 · Build habits': '02 · 建立習慣', 'Make the healthy choice obvious.': '讓健康選擇變得清楚。',
      'Personalized guidance turns sleep, balanced nutrition, and age-appropriate activity into small, repeatable actions.': '個人化指引把睡眠、均衡營養與適齡活動，化成簡單、可持續的行動。',
      '03 · Track progress': '03 · 追蹤進度', 'Train with a plan you can finish.': '跟著能完成的計畫活動。',
      'Follow guided activity routines, log height measurements, review progress summaries, and share the win when you’re done.': '跟著活動指引、記錄身高量測、查看進度摘要，完成後分享成果。',
      'How TallCenter works': 'TallCenter 如何運作', 'Two minutes to clarity. One day at a time after that.': '兩分鐘了解自己，之後一天一步。',
      'Built for teens and young adults ages 10–20, with a guardian path where required.': '為 10–20 歲青少年與年輕成人設計，並在必要時提供監護人流程。',
      'Tell your story': '填寫你的資料', 'Answer a guided assessment about age, measurements, family height, routines, and recent growth.': '完成包含年齡、量測、家族身高、生活習慣與近期成長的引導式評估。',
      'See your range': '查看預估範圍', 'Review the midpoint, likely band, wider family reference range, inputs, assumptions, and limits.': '查看中位數、較可能區間、較廣家庭參考範圍，以及輸入、假設與限制。',
      'Build your routine': '建立日常習慣', 'Get general sleep, nutrition, and activity guidance shaped by the information you provided.': '根據你提供的資料，取得一般睡眠、營養與活動指引。',
      'Track the trend': '追蹤趨勢', 'Log measurements and check-ins, review weekly or monthly summaries, and celebrate consistency.': '記錄量測與每日完成情況，查看每週或每月摘要，為持續行動喝采。',
      'Built to share': '為分享而設計', 'Your progress deserves more than a screenshot.': '你的進步值得比截圖更好的呈現。',
      'Create polished cards for your educational estimate, completed workouts, and routine summaries. Share the milestone, challenge a friend, and make consistency social.': '把教育用途的預估、完成的活動與習慣摘要製作成精美卡片。分享里程碑、邀請朋友，讓持續行動更有趣。',
      'I want in': '我想加入', 'MY TALLCENTER RANGE': '我的 TALLCENTER 範圍', 'Today’s streak: daily plan complete ✓': '今日連續紀錄：完成每日計畫 ✓', 'Estimates are educational and individual outcomes vary.': '預估僅供教育用途，個人結果會有差異。',
      'Height predictor FAQ': '身高預測常見問題', 'Questions about height prediction and growth tracking': '關於身高預測與成長追蹤的問題',
      'Straight answers about what TallCenter estimates, how the calculation works, and what healthy routines can realistically do.': '清楚說明 TallCenter 會預估什麼、如何計算，以及健康習慣實際能做到什麼。',
      'How tall will I be as an adult?': '我成年後會有多高？', 'No app can know your exact adult height. TallCenter estimates a midpoint and range from your self-reported information and biological parents’ heights. Genetics, health, development, and measurement uncertainty mean your eventual height may fall outside that range.': '沒有任何 App 能知道你確切的成年身高。TallCenter 根據自行填寫的資料與生理父母身高，估算中位數與範圍。遺傳、健康、發育和量測誤差，都可能讓最終身高落在範圍之外。',
      'How does the TallCenter height predictor work?': 'TallCenter 身高預測如何運作？', 'TallCenter uses the mid-parental height method based on biological parents’ heights. It shows a likely band around the midpoint and a wider family reference range so the uncertainty remains visible. It does not infer bone age or diagnose growth conditions.': 'TallCenter 使用基於生理父母身高的父母身高中位數方法，呈現中位數周圍的較可能區間與較廣家庭參考範圍，讓不確定性保持透明。它不會推測骨齡或診斷生長狀況。',
      'Is an online adult height estimate accurate?': '線上成年身高預估準確嗎？', 'An estimate can provide a useful family-based reference, but it is not an exact forecast. Accuracy depends on correct inputs and individual development. A clinician can evaluate growth charts, development, health history, and—when appropriate—medical tests that TallCenter does not perform.': '預估能提供有用的家庭參考，但不是精確預測。準確度取決於輸入資料與個人發育。臨床專業人員能評估生長曲線、發育、健康史，以及 TallCenter 不會進行的醫療檢查。',
      'Can sleep, nutrition, stretching, or exercise make me taller?': '睡眠、營養、伸展或運動能讓我長高嗎？', 'Healthy sleep, varied nutrition, and age-appropriate activity support normal growth and overall wellness, but none can guarantee additional height beyond your individual potential. Stretching and posture work may help how you stand and move; they do not lengthen bones.': '健康睡眠、多樣化營養與適齡活動有助正常成長與整體健康，但都不能保證超越個人潛力增加身高。伸展與姿勢訓練可能改善站姿和動作，但不會讓骨骼變長。',
      'Who is TallCenter designed for?': 'TallCenter 適合誰？', 'TallCenter currently supports teens and young adults ages 10–20. A parent or guardian must manage or consent to use where local law requires it. Adults whose growth plates have closed should expect little or no natural height increase.': 'TallCenter 目前支援 10–20 歲青少年與年輕成人。當地法律要求時，須由父母或監護人管理或同意使用。生長板已閉合的成人，自然身高通常不會或只會有極少變化。',
      'What can I track in TallCenter?': 'TallCenter 可以追蹤什麼？', 'You can record height measurements, complete daily routine check-ins, follow activity routines, review weekly and monthly summaries, enable reminders, and create shareable progress cards. TallCenter also provides general nutrition guidance; it does not record meals or nutrient intake.': '你可以記錄身高量測、完成每日習慣、跟著活動流程、查看每週與每月摘要、設定提醒，並建立可分享的進度卡。TallCenter 也提供一般營養指引，但不會記錄餐點或營養素攝取。',
      'Is TallCenter medical advice?': 'TallCenter 是醫療建議嗎？', 'No. TallCenter is an educational wellness app, not a medical device, bone-age test, diagnosis, or treatment. Speak with a qualified pediatrician or other healthcare professional if you are concerned about growth or development.': '不是。TallCenter 是教育用途的健康 App，不是醫療器材、骨齡檢查、診斷或治療。如對生長或發育有疑慮，請諮詢合格兒科醫師或其他醫療專業人員。',
      'Trust is a feature': '信任也是功能', 'Clear about what TallCenter can—and cannot—do.': '清楚說明 TallCenter 能做與不能做的事。',
      'Transparent method': '透明方法', 'The app explains its family-height calculation, shows uncertainty, and never presents an estimate as destiny.': 'App 說明家族身高計算方式、呈現不確定性，絕不把預估當成命運。',
      'Your data, your control': '你的資料，由你掌控', 'Export your TallCenter data or permanently delete your account and associated app data from Settings.': '你可以在設定中匯出 TallCenter 資料，或永久刪除帳號與相關 App 資料。',
      'No shame, no guarantees': '不羞辱、不保證', 'TallCenter rewards healthy consistency—not centimeters—and does not promise that any routine will make you taller.': 'TallCenter 鼓勵持續的健康行動，而不是公分數，也不承諾任何習慣一定能讓你長高。',
      'Important:': '重要提醒：', 'TallCenter provides educational wellness information. It is not a bone-age test, medical device, diagnosis, treatment, or substitute for professional medical advice. If you have concerns about growth or development, speak with a qualified pediatrician or other healthcare professional.': 'TallCenter 提供教育用途的健康資訊。它不是骨齡檢查、醫療器材、診斷、治療，也不能取代專業醫療建議。如對生長或發育有疑慮，請諮詢合格兒科醫師或其他醫療專業人員。',
      'Coming soon': '即將推出', 'Your future height is uncertain. Your next healthy habit doesn’t have to be.': '未來身高充滿不確定，但下一個健康習慣可以很清楚。', 'Be first to know when TallCenter launches.': 'TallCenter 上線時第一時間收到消息。',
      'TallCenter is a product by Micavo.': 'TallCenter 是 Micavo 旗下產品。', '© 2026 Micavo. TallCenter is a product by Micavo.': '© 2026 Micavo。TallCenter 是 Micavo 旗下產品。', 'Privacy': '隱私權', 'Terms': '服務條款', 'Support': '支援'
    },
    ja: {
      'Height Predictor & Growth Tracker for Teens | TallCenter': '10代向け身長予測・成長トラッカー | TallCenter',
      'How it works': '仕組み', 'Features': '機能', 'FAQ': 'よくある質問', 'Get early access': '先行アクセス',
      'Height predictor & growth tracker': '身長予測・成長トラッカー', 'How tall will I be? See your': '将来の身長は？あなたの', 'estimated range.': '推定範囲を確認。',
      'TallCenter uses your family-height inputs to estimate a transparent educational adult-height range—then helps you track measurements and follow general sleep, nutrition, and activity guidance that supports overall health.': 'TallCenterは家族の身長情報から、教育目的の成人身長範囲を透明性のある形で推定します。測定を記録し、睡眠・栄養・活動に関する一般的なガイダンスで健康を支えます。',
      'Join early access ↗': '先行アクセスに参加 ↗', 'Explore the growth tracker': '成長トラッカーを見る', 'Designed for ages 10–20': '10〜20歳向け', 'English · 繁中 · 日本語': 'English · 繁中 · 日本語', 'Transparent method': '透明な計算方法',
      'Your range, not a promise.': '範囲であり、保証ではありません。', 'Method and uncertainty shown.': '方法と不確実性を明示。', 'Turn insight into action.': '気づきを行動へ。', 'Sleep · Nutrition · Activity': '睡眠 · 栄養 · 活動',
      'Know your range': '範囲を知る', 'Build healthy routines': '健康習慣をつくる', 'Track your progress': '進捗を記録', 'Share the journey': '成長を共有',
      'Adult height estimate and daily tracking': '成人身長推定と毎日の記録', 'From “how tall?” to “what can I do today?”': '「何cmになる？」から「今日できること」へ', 'A height prediction and growth-tracking loop that moves from understanding to action—without pretending an app can guarantee extra height.': '推定を理解し、日々の行動へ。アプリが身長の増加を保証できるとは主張しません。',
      '01 · Estimate': '01 · 推定', 'See an honest family-height range.': '誠実な家族身長の範囲を確認。', 'The height predictor uses biological parents’ heights and the mid-parental method, with the likely band, broader family reference range, and uncertainty clearly displayed.': '実親の身長と両親身長法を用い、可能性の高い範囲、より広い家族参考範囲、不確実性を明確に表示します。',
      '02 · Build habits': '02 · 習慣づくり', 'Make the healthy choice obvious.': '健康的な選択をわかりやすく。', 'Personalized guidance turns sleep, balanced nutrition, and age-appropriate activity into small, repeatable actions.': '睡眠、バランスのよい栄養、年齢に合った活動を、小さく続けやすい行動に変えます。',
      '03 · Track progress': '03 · 進捗記録', 'Train with a plan you can finish.': '続けられるプランで活動。', 'Follow guided activity routines, log height measurements, review progress summaries, and share the win when you’re done.': 'ガイド付き活動を行い、身長測定を記録し、進捗サマリーを確認して成果を共有できます。',
      'How TallCenter works': 'TallCenterの仕組み', 'Two minutes to clarity. One day at a time after that.': '2分で理解。その後は一日ずつ。', 'Built for teens and young adults ages 10–20, with a guardian path where required.': '10〜20歳の青少年・若年成人向け。必要な場合は保護者向けフローも用意しています。',
      'Tell your story': '情報を入力', 'Answer a guided assessment about age, measurements, family height, routines, and recent growth.': '年齢、測定、家族の身長、生活習慣、最近の成長についてガイド付き評価に回答します。', 'See your range': '範囲を確認', 'Review the midpoint, likely band, wider family reference range, inputs, assumptions, and limits.': '中央値、可能性の高い範囲、広い家族参考範囲、入力、前提、限界を確認します。',
      'Build your routine': '習慣をつくる', 'Get general sleep, nutrition, and activity guidance shaped by the information you provided.': '入力情報に基づく睡眠、栄養、活動の一般的なガイダンスを受け取ります。', 'Track the trend': '傾向を追跡', 'Log measurements and check-ins, review weekly or monthly summaries, and celebrate consistency.': '測定とチェックインを記録し、週・月のサマリーを確認して継続を称えます。',
      'Built to share': '共有のためのデザイン', 'Your progress deserves more than a screenshot.': '進捗を、ただのスクリーンショット以上に。', 'Create polished cards for your educational estimate, completed workouts, and routine summaries. Share the milestone, challenge a friend, and make consistency social.': '教育目的の推定、完了した活動、習慣サマリーを美しいカードに。節目を共有し、友人と続けるきっかけにできます。', 'I want in': '参加する', 'MY TALLCENTER RANGE': '私のTALLCENTER範囲', 'Today’s streak: daily plan complete ✓': '今日の継続：デイリープラン完了 ✓', 'Estimates are educational and individual outcomes vary.': '推定は教育目的で、結果には個人差があります。',
      'Height predictor FAQ': '身長予測 FAQ', 'Questions about height prediction and growth tracking': '身長予測と成長記録について', 'Straight answers about what TallCenter estimates, how the calculation works, and what healthy routines can realistically do.': 'TallCenterが何を推定し、どう計算し、健康習慣に何ができるかを明確に説明します。',
      'How tall will I be as an adult?': '成人時の身長はどのくらい？', 'No app can know your exact adult height. TallCenter estimates a midpoint and range from your self-reported information and biological parents’ heights. Genetics, health, development, and measurement uncertainty mean your eventual height may fall outside that range.': '正確な成人身長を知るアプリはありません。TallCenterは自己申告情報と実親の身長から中央値と範囲を推定します。遺伝、健康、発達、測定誤差により、最終身長が範囲外になることもあります。',
      'How does the TallCenter height predictor work?': 'TallCenterの身長予測はどう機能しますか？', 'TallCenter uses the mid-parental height method based on biological parents’ heights. It shows a likely band around the midpoint and a wider family reference range so the uncertainty remains visible. It does not infer bone age or diagnose growth conditions.': '実親の身長に基づく両親身長法を使用し、中央値周辺の可能性の高い範囲と、より広い家族参考範囲を表示します。骨年齢の推定や成長状態の診断は行いません。',
      'Is an online adult height estimate accurate?': 'オンラインの成人身長推定は正確ですか？', 'An estimate can provide a useful family-based reference, but it is not an exact forecast. Accuracy depends on correct inputs and individual development. A clinician can evaluate growth charts, development, health history, and—when appropriate—medical tests that TallCenter does not perform.': '家族に基づく参考情報として役立ちますが、正確な予測ではありません。入力の正確さや個人の発達に左右されます。医療専門家は成長曲線、発達、健康歴、必要な検査を評価できます。',
      'Can sleep, nutrition, stretching, or exercise make me taller?': '睡眠、栄養、ストレッチ、運動で身長は伸びますか？', 'Healthy sleep, varied nutrition, and age-appropriate activity support normal growth and overall wellness, but none can guarantee additional height beyond your individual potential. Stretching and posture work may help how you stand and move; they do not lengthen bones.': '健康的な睡眠、多様な栄養、年齢に合った活動は正常な成長と健康を支えますが、個人の可能性を超える身長増加は保証できません。ストレッチや姿勢改善は立ち方や動きを助けますが、骨を長くするものではありません。',
      'Who is TallCenter designed for?': 'TallCenterは誰向けですか？', 'TallCenter currently supports teens and young adults ages 10–20. A parent or guardian must manage or consent to use where local law requires it. Adults whose growth plates have closed should expect little or no natural height increase.': '現在10〜20歳の青少年・若年成人に対応しています。法律で必要な場合は保護者の管理・同意が必要です。成長板が閉じた成人は自然な身長増加がほとんど期待できません。',
      'What can I track in TallCenter?': 'TallCenterで何を記録できますか？', 'You can record height measurements, complete daily routine check-ins, follow activity routines, review weekly and monthly summaries, enable reminders, and create shareable progress cards. TallCenter also provides general nutrition guidance; it does not record meals or nutrient intake.': '身長測定、毎日の習慣チェック、活動ルーティン、週・月サマリー、リマインダー、共有カードを利用できます。一般的な栄養ガイダンスは提供しますが、食事や栄養摂取量は記録しません。',
      'Is TallCenter medical advice?': 'TallCenterは医療アドバイスですか？', 'No. TallCenter is an educational wellness app, not a medical device, bone-age test, diagnosis, or treatment. Speak with a qualified pediatrician or other healthcare professional if you are concerned about growth or development.': 'いいえ。教育目的のウェルネスアプリであり、医療機器、骨年齢検査、診断、治療ではありません。成長や発達が心配な場合は小児科医などの医療専門家に相談してください。',
      'Trust is a feature': '信頼も機能の一部', 'Clear about what TallCenter can—and cannot—do.': 'TallCenterにできること、できないことを明確に。', 'Transparent method': '透明な方法', 'The app explains its family-height calculation, shows uncertainty, and never presents an estimate as destiny.': '家族身長の計算方法と不確実性を説明し、推定を運命として示しません。', 'Your data, your control': 'データはあなたの管理下に', 'Export your TallCenter data or permanently delete your account and associated app data from Settings.': '設定からデータの書き出しや、アカウントと関連データの完全削除ができます。', 'No shame, no guarantees': '責めない、保証しない', 'TallCenter rewards healthy consistency—not centimeters—and does not promise that any routine will make you taller.': 'センチではなく健康的な継続を大切にし、どの習慣も身長増加を約束しません。',
      'Important:': '重要：', 'TallCenter provides educational wellness information. It is not a bone-age test, medical device, diagnosis, treatment, or substitute for professional medical advice. If you have concerns about growth or development, speak with a qualified pediatrician or other healthcare professional.': 'TallCenterは教育目的の健康情報を提供します。骨年齢検査、医療機器、診断、治療、専門的医療助言の代替ではありません。成長や発達が心配な場合は医療専門家に相談してください。',
      'Coming soon': '近日公開', 'Your future height is uncertain. Your next healthy habit doesn’t have to be.': '将来の身長は不確かでも、次の健康習慣は明確にできます。', 'Be first to know when TallCenter launches.': 'TallCenterの公開をいち早くお知らせします。', 'TallCenter is a product by Micavo.': 'TallCenterはMicavoの製品です。', '© 2026 Micavo. TallCenter is a product by Micavo.': '© 2026 Micavo。TallCenterはMicavoの製品です。', 'Privacy': 'プライバシー', 'Terms': '利用規約', 'Support': 'サポート'
    }
  };

  Object.assign(translations['zh-Hant'], {
    '01 · Predict': '01 · 預測',
    'See your estimated adult height.': '查看你的預估成年身高。',
    'Start with a clear family-height estimate, then turn your result into a polished card that is easy to understand and share.': '先查看清楚的家族身高預估，再把結果製作成容易理解與分享的精美卡片。',
    '02 · Check in': '02 · 每日打卡',
    '03 · Follow your plan': '03 · 跟著你的計畫',
    '04 · Move well': '04 · 好好活動',
    '01 · Check in': '01 · 每日打卡',
    'Make today’s healthy actions obvious.': '讓今天的健康行動一目了然。',
    'Turn sleep, nutrition, and movement guidance into small daily tasks, then build momentum with streaks and XP.': '把睡眠、營養與活動指引轉化成每日小任務，再用連續紀錄與 XP 累積動力。',
    '02 · Follow your plan': '02 · 跟著你的計畫',
    'Keep your whole routine in one place.': '把完整日常計畫放在同一個地方。',
    'See personalized movement, sleep, and nutrition guidance shaped by your assessment and designed to support general wellbeing.': '根據你的評估查看個人化的活動、睡眠與營養指引，支持整體健康。',
    '03 · Move well': '03 · 好好活動',
    'Choose a guided session you can finish.': '選擇你能完成的引導式活動。',
    'Follow short, age-appropriate movement, mobility, posture, and weight-bearing routines with clear timing and steps.': '跟著簡短、適齡的活動、靈活度、姿勢與負重運動流程，每個時間與步驟都清楚呈現。',
    'Height predictor & worldwide comparison': '身高預測與世界各地比較',
    'Estimate your educational adult-height range from family-height inputs, then see how that same height compares across countries. Track your growth and build healthier sleep, nutrition, and activity routines along the way.': '根據家族身高資料預估教育用途的成年身高範圍，再看同一個身高在不同國家的相對排名。同時追蹤成長，建立更健康的睡眠、營養與活動習慣。',
    'See worldwide comparison': '看世界各地身高比較',
    'Compare 12+ regions': '比較 12+ 個國家與地區',
    'How tall around the world?': '你在世界各地，算高嗎？',
    'Compare relative percentiles by country.': '比較不同國家的相對百分位。',
    'Compare across countries': '比較世界各國',
    'Share your Height Passport': '分享你的身高國際護照',
    'Adult height estimate, worldwide comparison, and daily tracking': '成年身高預估、世界各地比較與每日追蹤',
    'From “how tall?” to “where do I rank?”': '從「我會長多高？」到「我在哪個國家算高？」',
    'Understand your educational adult-height estimate, explore how it compares across countries, and turn the insight into healthier daily actions—without pretending an app can guarantee extra height.': '了解教育用途的成年身高預估，探索在各國的相對百分位，再把結果轉化成更健康的日常行動；我們不會假裝 App 能保證增加身高。',
    'Your height, a different story in every country': '同一個身高，換個國家就有不同結果',
    'See how tall you rank around the world.': '看看你在世界各地算多高。',
    'Use the same predicted adult height to explore your estimated relative percentile across 12+ countries and regions. A height that feels average in one place may stand out in another.': '用同一個預測成年身高，探索在 12+ 個國家與地區的估計相對百分位。在一個地方很普通的身高，到另一個國家可能很顯眼。',
    'Compare country-specific relative percentiles': '比較各國的相對身高百分位',
    'Choose your country—no GPS required': '自行選擇國家，不需讀取 GPS',
    'Create a shareable Height Passport': '產生可分享的身高國際護照',
    'Educational statistical comparison only. Percentiles are population estimates, not a live global leaderboard or health assessment.': '僅供教育用途的統計比較。百分位是族群估計，不是即時全球排行榜，也不代表健康評估。',
    'Find my worldwide rank ↗': '看我在世界各地的排名 ↗',
    'Compare worldwide': '比較世界各地',
    'See how your predicted adult height maps to estimated relative percentiles across countries.': '查看你的預測成年身高，在不同國家對應的估計相對百分位。',
    'Build and track': '建立習慣並追蹤',
    'Follow healthy routine guidance, log measurements and check-ins, and celebrate consistency.': '參考健康習慣指引、記錄量測與每日完成狀況，為持續行動喝采。',
    'Questions about height prediction and worldwide comparison': '關於身高預測與世界各地比較的問題',
    'Straight answers about what TallCenter estimates, how country comparisons work, and what healthy routines can realistically do.': '清楚說明 TallCenter 會預估什麼、各國比較如何運作，以及健康習慣實際能做到什麼。',
    'What does my worldwide height rank mean?': '我的世界各地身高排名代表什麼？',
    'TallCenter compares your predicted adult height with published country-level reference distributions and estimates the percentage of people you may be taller than. It is an educational statistical comparison—not a census, live leaderboard, health score, or guarantee.': 'TallCenter 將你的預測成年身高與公開的各國參考分布比較，估算你可能高過多少比例的人。這是教育用途的統計比較，不是人口普查、即時排行榜、健康分數或保證。',
    'You can compare your predicted adult height across countries, record height measurements, complete daily routine check-ins, follow activity routines, review summaries, enable reminders, and create shareable Height Passport cards. TallCenter also provides general nutrition guidance; it does not record meals or nutrient intake.': '你可以比較預測成年身高在不同國家的相對位置、記錄身高量測、完成每日習慣、跟著活動流程、查看摘要、設定提醒，並建立可分享的身高國際護照。TallCenter 也提供一般營養指引，但不會記錄餐點或營養素攝取。'
  });

  Object.assign(translations.ja, {
    '01 · Predict': '01 · 予測',
    'See your estimated adult height.': '推定成人身長を確認。',
    'Start with a clear family-height estimate, then turn your result into a polished card that is easy to understand and share.': 'わかりやすい家族身長の推定から始め、結果を理解しやすくシェアしやすい美しいカードにします。',
    '02 · Check in': '02 · 毎日のチェック',
    '03 · Follow your plan': '03 · プランを実行',
    '04 · Move well': '04 · 健やかに動く',
    '01 · Check in': '01 · 毎日のチェック',
    'Make today’s healthy actions obvious.': '今日の健康行動をわかりやすく。',
    'Turn sleep, nutrition, and movement guidance into small daily tasks, then build momentum with streaks and XP.': '睡眠・栄養・活動のガイダンスを毎日の小さなタスクにし、連続記録とXPで継続の弾みをつけます。',
    '02 · Follow your plan': '02 · プランを実行',
    'Keep your whole routine in one place.': 'すべての習慣を1か所で管理。',
    'See personalized movement, sleep, and nutrition guidance shaped by your assessment and designed to support general wellbeing.': '評価に基づいた個別の活動・睡眠・栄養ガイダンスで、全体的な健康を支えます。',
    '03 · Move well': '03 · 健やかに動く',
    'Choose a guided session you can finish.': '無理なく完了できるガイド付きセッションを選択。',
    'Follow short, age-appropriate movement, mobility, posture, and weight-bearing routines with clear timing and steps.': '短く年齢に合った運動、モビリティ、姿勢、荷重運動を、明確な時間と手順で行えます。',
    'Height predictor & worldwide comparison': '身長予測・世界比較',
    'Estimate your educational adult-height range from family-height inputs, then see how that same height compares across countries. Track your growth and build healthier sleep, nutrition, and activity routines along the way.': '家族の身長から教育目的の成人身長範囲を推定し、同じ身長が各国でどの位置になるか比較できます。成長を記録しながら、より健康的な睡眠・栄養・活動習慣をつくりましょう。',
    'See worldwide comparison': '世界の身長比較を見る',
    'Compare 12+ regions': '12以上の国・地域を比較',
    'How tall around the world?': '世界ではどれくらい高い？',
    'Compare relative percentiles by country.': '国ごとの相対パーセンタイルを比較。',
    'Compare across countries': '世界の国々と比較',
    'Share your Height Passport': 'ハイトパスポートをシェア',
    'Adult height estimate, worldwide comparison, and daily tracking': '成人身長推定・世界比較・毎日の記録',
    'From “how tall?” to “where do I rank?”': '「何cmになる？」から「どの国で高い？」へ',
    'Understand your educational adult-height estimate, explore how it compares across countries, and turn the insight into healthier daily actions—without pretending an app can guarantee extra height.': '教育目的の成人身長推定を理解し、各国での相対パーセンタイルを探り、より健康的な毎日の行動へつなげます。アプリが身長の増加を保証できるとは主張しません。',
    'Your height, a different story in every country': '同じ身長でも、国が変われば見え方が変わる',
    'See how tall you rank around the world.': '世界での相対的な身長ランクを見てみよう。',
    'Use the same predicted adult height to explore your estimated relative percentile across 12+ countries and regions. A height that feels average in one place may stand out in another.': '同じ予測成人身長を使って、12以上の国・地域での推定相対パーセンタイルを確認できます。ある国では平均的な身長が、別の国では目立つこともあります。',
    'Compare country-specific relative percentiles': '国ごとの相対身長パーセンタイルを比較',
    'Choose your country—no GPS required': '国は自分で選択。GPSは不要',
    'Create a shareable Height Passport': 'シェアできるハイトパスポートを作成',
    'Educational statistical comparison only. Percentiles are population estimates, not a live global leaderboard or health assessment.': '教育目的の統計比較です。パーセンタイルは集団推定であり、リアルタイムの世界ランキングや健康評価ではありません。',
    'Find my worldwide rank ↗': '世界でのランクを見る ↗',
    'Compare worldwide': '世界と比較',
    'See how your predicted adult height maps to estimated relative percentiles across countries.': '予測成人身長が各国の推定相対パーセンタイルでどの位置になるか確認します。',
    'Build and track': '習慣をつくり、記録',
    'Follow healthy routine guidance, log measurements and check-ins, and celebrate consistency.': '健康習慣のガイダンスに従い、測定とチェックインを記録し、継続を称えましょう。',
    'Questions about height prediction and worldwide comparison': '身長予測と世界比較について',
    'Straight answers about what TallCenter estimates, how country comparisons work, and what healthy routines can realistically do.': 'TallCenterが何を推定し、国別比較がどう機能し、健康習慣に現実的に何ができるかを明確に説明します。',
    'What does my worldwide height rank mean?': '世界での身長ランクは何を意味しますか？',
    'TallCenter compares your predicted adult height with published country-level reference distributions and estimates the percentage of people you may be taller than. It is an educational statistical comparison—not a census, live leaderboard, health score, or guarantee.': 'TallCenterは予測成人身長を公開された国別参考分布と比較し、何％の人より高い可能性があるかを推定します。教育目的の統計比較であり、国勢調査、リアルタイムランキング、健康スコア、保証ではありません。',
    'You can compare your predicted adult height across countries, record height measurements, complete daily routine check-ins, follow activity routines, review summaries, enable reminders, and create shareable Height Passport cards. TallCenter also provides general nutrition guidance; it does not record meals or nutrient intake.': '予測成人身長の国別比較、身長測定の記録、毎日の習慣チェック、活動ルーティン、サマリー、リマインダー、シェアできるハイトパスポートを利用できます。一般的な栄養ガイダンスも提供しますが、食事や栄養摂取量は記録しません。'
  });

  const howSection = document.querySelector('#how');
  if (howSection) {
    howSection.insertAdjacentHTML('beforebegin', '<section class="section youth-voices soft" aria-labelledby="youth-voices-title"><div class="wrap"><div class="section-heading"><p class="eyebrow">Young perspectives</p><h2 id="youth-voices-title">Built around the questions young people actually ask.</h2><p>Three ways TallCenter turns curiosity about height into something clear, social, and actionable.</p></div><div class="voice-grid"><article class="voice-card"><div class="voice-avatar" aria-hidden="true">🌏</div><span class="scenario-label">Understand my range</span><blockquote>“I used to only wonder how tall I might be. Now I can see a range—and understand what that number actually means.”</blockquote><p>See the estimate clearly</p></article><article class="voice-card featured"><div class="voice-avatar" aria-hidden="true">🚀</div><span class="scenario-label">Compare with friends</span><blockquote>“The country comparison is the first thing I’d send to my friends. The same height feels completely different around the world.”</blockquote><p>Make height comparison social</p></article><article class="voice-card"><div class="voice-avatar" aria-hidden="true">🌱</div><span class="scenario-label">Build today’s routine</span><blockquote>“The daily plan turns sleep, food, and movement into small things I can actually finish today.”</blockquote><p>Take one healthy step today</p></article></div></div></section>');
  }

  Object.assign(translations['zh-Hant'], {
    'Young perspectives': '年輕人的視角',
    'Built around the questions young people actually ask.': '從年輕人真正會問的問題出發。',
    'Three ways TallCenter turns curiosity about height into something clear, social, and actionable.': 'TallCenter 用三種方式，把對身高的好奇變得清楚、好玩，也更容易採取行動。',
    'Understand my range': '看懂我的預測範圍',
    '“I used to only wonder how tall I might be. Now I can see a range—and understand what that number actually means.”': '「以前我只會一直猜自己能長多高。現在我能看到一個範圍，也更懂這個數字代表什麼。」',
    'See the estimate clearly': '清楚理解預測結果',
    'Compare with friends': '和朋友一起比較',
    '“The country comparison is the first thing I’d send to my friends. The same height feels completely different around the world.”': '「世界各國比較是我第一個想傳給朋友看的功能。同一個身高，換個國家感覺完全不一樣。」',
    'Make height comparison social': '讓身高比較變得更有趣',
    'Build today’s routine': '完成今天的小計畫',
    '“The daily plan turns sleep, food, and movement into small things I can actually finish today.”': '「每日計畫把睡眠、飲食和活動變成今天真的做得完的小任務。」',
    'Take one healthy step today': '今天完成一個健康行動'
  });

  Object.assign(translations.ja, {
    'Young perspectives': '若い世代の視点',
    'Built around the questions young people actually ask.': '若い人が本当に抱く疑問から設計。',
    'Three ways TallCenter turns curiosity about height into something clear, social, and actionable.': '身長への好奇心を、わかりやすく、友達と楽しめて、行動につながる3つの体験へ。',
    'Understand my range': '予測範囲を理解',
    '“I used to only wonder how tall I might be. Now I can see a range—and understand what that number actually means.”': '「前は将来の身長を想像するだけでした。今は範囲を見て、その数字の意味も理解できます。」',
    'See the estimate clearly': '予測結果をわかりやすく確認',
    'Compare with friends': '友達と比較',
    '“The country comparison is the first thing I’d send to my friends. The same height feels completely different around the world.”': '「国別比較は最初に友達へ送りたい機能。同じ身長でも国が変わると印象が全然違います。」',
    'Make height comparison social': '身長比較をもっと楽しく',
    'Build today’s routine': '今日の習慣をつくる',
    '“The daily plan turns sleep, food, and movement into small things I can actually finish today.”': '「毎日のプランなら、睡眠・食事・運動が今日できる小さな行動になります。」',
    'Take one healthy step today': '今日できる健康行動をひとつ'
  });

  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    textNodes.push({ node, original: node.nodeValue, key: node.nodeValue.trim() });
  }

  const originalTitle = document.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  const originalDescription = metaDescription ? metaDescription.content : '';
  const storyGrid = document.querySelector('.story-grid');
  let carouselPreviousButton = null;
  let carouselNextButton = null;
  let carouselIndicators = [];
  let currentCarouselLanguage = 'en';

  if (storyGrid) {
    const shell = document.createElement('div');
    shell.className = 'feature-carousel';
    storyGrid.parentNode.insertBefore(shell, storyGrid);
    shell.appendChild(storyGrid);

    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.innerHTML = '<button type="button" class="carousel-arrow previous" aria-label="Previous feature">←</button><button type="button" class="carousel-arrow next" aria-label="Next feature">→</button>';
    shell.appendChild(controls);
    carouselPreviousButton = controls.querySelector('.previous');
    carouselNextButton = controls.querySelector('.next');

    const cards = Array.from(storyGrid.querySelectorAll('.story-card'));
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    shell.appendChild(indicators);

    const cardStride = () => {
      const firstCard = cards[0];
      if (!firstCard) return storyGrid.clientWidth || 1;
      const gap = parseFloat(getComputedStyle(storyGrid).columnGap) || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };
    const visibleCardCount = () => Math.max(1, Math.round(storyGrid.clientWidth / cardStride()));
    const carouselPositionCount = () => Math.max(1, cards.length - visibleCardCount() + 1);
    const activeSlideIndex = () => {
      const maxIndex = carouselPositionCount() - 1;
      return Math.max(0, Math.min(maxIndex, Math.round(storyGrid.scrollLeft / cardStride())));
    };
    const indicatorLabel = (index) => {
      if (currentCarouselLanguage === 'zh-Hant') return `第 ${index + 1} 頁`;
      if (currentCarouselLanguage === 'ja') return `スライド ${index + 1}`;
      return `Slide ${index + 1}`;
    };
    const rebuildIndicators = () => {
      const count = carouselPositionCount();
      if (carouselIndicators.length === count) return;
      indicators.replaceChildren();
      carouselIndicators = Array.from({ length: count }, (_, index) => {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('aria-label', indicatorLabel(index));
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
        return indicator;
      });
    };
    const updateCarouselState = () => {
      rebuildIndicators();
      const activeIndex = activeSlideIndex();
      carouselIndicators.forEach((indicator, index) => {
        const active = index === activeIndex;
        indicator.classList.toggle('active', active);
        if (active) indicator.setAttribute('aria-current', 'true');
        else indicator.removeAttribute('aria-current');
      });
    };
    function goToSlide(index) {
      const count = carouselPositionCount();
      const normalizedIndex = (index + count) % count;
      storyGrid.scrollTo({
        left: normalizedIndex * cardStride(),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
    const moveCarousel = (direction) => goToSlide(activeSlideIndex() + direction);

    carouselPreviousButton.addEventListener('click', () => moveCarousel(-1));
    carouselNextButton.addEventListener('click', () => moveCarousel(1));
    storyGrid.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', () => requestAnimationFrame(updateCarouselState), { passive: true });
    requestAnimationFrame(updateCarouselState);
  }
  const localizedScreenshots = {
    en: {
      src: './assets/english.png',
      alt: 'TallCenter adult height prediction share card'
    },
    'zh-Hant': {
      src: './assets/chinese.png',
      alt: 'TallCenter 成年身高預測分享卡'
    },
    ja: {
      src: './assets/JP.png',
      alt: 'TallCenter 成人身長予測シェアカード'
    }
  };
  const localizedCompareScreenshots = {
    en: {
      src: './assets/english_compare.png',
      alt: 'TallCenter worldwide adult-height comparison passport'
    },
    'zh-Hant': {
      src: './assets/chinese_comapre.png',
      alt: 'TallCenter 世界各地成年身高比較護照'
    },
    ja: {
      src: './assets/jp_compare.png',
      alt: 'TallCenter 世界の成人身長比較パスポート'
    }
  };
  const localizedFeatureScreenshots = {
    en: [
      {
        src: './assets/plan_today.png',
        alt: 'TallCenter daily plan showing check-ins, streaks, XP, and healthy routine tasks'
      },
      {
        src: './assets/personalized_growth_plan.png',
        alt: 'TallCenter personalized growth plan with movement and sleep guidance'
      },
      {
        src: './assets/movement_posture.png',
        alt: 'TallCenter guided movement and posture routines'
      }
    ],
    'zh-Hant': [
      {
        src: './assets/today_check_chinese.png',
        alt: 'TallCenter 今日計畫、每日打卡、連續紀錄與健康任務'
      },
      {
        src: './assets/today_myPlan_chinese.png',
        alt: 'TallCenter 個人化成長計畫與活動、睡眠指引'
      },
      {
        src: './assets/today_exercise_chinese.png',
        alt: 'TallCenter 活動與姿勢引導課程'
      }
    ],
    ja: [
      {
        src: './assets/plan_today_ja.png',
        alt: 'TallCenterの毎日プラン、チェックイン、連続記録、XP、健康習慣タスク'
      },
      {
        src: './assets/personalized_growth_plan_ja.png',
        alt: 'TallCenterの運動と睡眠ガイダンスを含む個人向け成長プラン'
      },
      {
        src: './assets/movement_posture_ja.png',
        alt: 'TallCenterのガイド付き運動と姿勢ルーティン'
      }
    ]
  };

  function normalizedLanguage(value) {
    const lang = String(value || '').toLowerCase();
    if (lang.startsWith('zh')) return 'zh-Hant';
    if (lang.startsWith('ja')) return 'ja';
    return 'en';
  }

  function applyLanguage(language, updateUrl) {
    const lang = normalizedLanguage(language);
    const dictionary = translations[lang] || {};
    textNodes.forEach(({ node, original, key }) => {
      if (lang === 'en' || !dictionary[key]) {
        node.nodeValue = original;
        return;
      }
      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.nodeValue = leading + dictionary[key] + trailing;
    });
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    const screenshot = localizedScreenshots[lang];
    document.querySelectorAll('[data-localized-screenshot]').forEach((image) => {
      image.src = screenshot.src;
      image.alt = screenshot.alt;
    });
    const compareScreenshot = localizedCompareScreenshots[lang];
    document.querySelectorAll('[data-localized-compare]').forEach((image) => {
      image.src = compareScreenshot.src;
      image.alt = compareScreenshot.alt;
    });
    const featureScreenshots = localizedFeatureScreenshots[lang] || localizedFeatureScreenshots.en;
    document.querySelectorAll('.story-grid .story-card img:not([data-localized-screenshot])').forEach((image, index) => {
      const featureScreenshot = featureScreenshots[index];
      if (!featureScreenshot) return;
      image.src = featureScreenshot.src;
      image.alt = featureScreenshot.alt;
    });
    document.title = lang === 'en' ? originalTitle : (dictionary[originalTitle] || originalTitle);
    if (metaDescription) {
      metaDescription.content = lang === 'zh-Hant'
        ? 'TallCenter 根據家族身高預估成年身高範圍，比較世界各國的相對身高百分位，並協助建立健康習慣。適合 10–20 歲。'
        : lang === 'ja'
          ? 'TallCenterは家族の身長から成人身長範囲を推定し、世界各国の相対身長パーセンタイルを比較し、健康習慣の形成を支えます。10〜20歳向け。'
          : originalDescription;
    }
    document.querySelectorAll('[data-lang-switch]').forEach((button) => {
      const active = button.dataset.langSwitch === lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (carouselPreviousButton && carouselNextButton) {
      currentCarouselLanguage = lang;
      const previousLabel = lang === 'zh-Hant' ? '上一個功能' : lang === 'ja' ? '前の機能' : 'Previous feature';
      const nextLabel = lang === 'zh-Hant' ? '下一個功能' : lang === 'ja' ? '次の機能' : 'Next feature';
      carouselPreviousButton.setAttribute('aria-label', previousLabel);
      carouselPreviousButton.title = previousLabel;
      carouselNextButton.setAttribute('aria-label', nextLabel);
      carouselNextButton.title = nextLabel;
      carouselIndicators.forEach((indicator, index) => {
        indicator.setAttribute('aria-label', lang === 'zh-Hant'
          ? `第 ${index + 1} 頁`
          : lang === 'ja'
            ? `スライド ${index + 1}`
            : `Slide ${index + 1}`);
      });
    }
    localStorage.setItem('tallcenter-language', lang);
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (lang === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState({}, '', url);
    }
  }

  document.querySelectorAll('[data-lang-switch]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.langSwitch, true));
  });

  const requested = new URLSearchParams(location.search).get('lang');
  const saved = localStorage.getItem('tallcenter-language');
  applyLanguage(requested || saved || navigator.language, false);
})();
