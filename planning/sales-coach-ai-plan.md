# Next Project Plan — "CallCoach AI" (working name)

> Status: idea / pre-build. Written 2026-06-27, updated same day after confirming actual Outshine architecture. Reviewed Micavo's existing three products (EatOrNot AI, Outshine, Critical Choice) for reusable patterns.

## 0. Why this project

Micavo's existing products share one engine: capture input (photo / voice / task) → AI reasoning → actionable card → subscription paywall. That engine caps out around **$99/year per consumer**, because consumer subscription ARPU is structurally low and growth depends on App Store discovery.

This project reuses the **same coaching engine already built for Outshine** (chunked audio capture → Gemini transcription → rolling memory → coaching cards) but points it at a **B2B / prosumer seat with 5-10x higher willingness to pay**: AI coaching for sales calls and customer-facing meetings. B2B SaaS for sales teams commonly prices $50-150/seat/month, and sales orgs already buy similar tools (Gong, Chorus, Avoma) at scale — proving willingness to pay.

**Core bet:** the hard part (chunked audio → Gemini → context-aware coaching cards, with cost guardrails already solved) is already proven in Outshine. The new work is mostly: (1) get the bot into the call, (2) sell to teams instead of individuals, (3) add manager/team analytics.

**Important framing correction:** this is **not real-time**. Outshine's actual cadence is chunk 1 at 5 minutes, then every 10 minutes after — "quality over frequency, context over latency" is the explicit product principle in [Outshine_ARCHITECTURE.md](/Users/kunghungshen/Developer/outshine/Docs/Outshine_ARCHITECTURE.md). CallCoach AI should keep the same cadence and the same framing: a coach that gives you a few well-reasoned nudges per call, not a live captioning/whisper tool. This also matters for the pitch — "real-time" invites comparison to live transcription products and sets an expectation (sub-second feedback) the architecture doesn't deliver.

## 1. Problem statement

Sales reps and customer-facing professionals lose deals not because they lack information, but because they don't know **what to say next** — the right discovery question, the objection-handling line, the next-step ask. Reviewing a call recording afterward happens too late to change that call's outcome; a periodic in-call nudge (every 5-10 minutes) can still catch it before the call ends.

## 2. Target users / ICP

- **Primary buyer:** Sales manager / RevOps lead at a 10-200 person B2B SaaS company with an inside sales or AE team doing video-call selling (Zoom/Meet/Teams).
- **Primary user:** Individual AE / SDR / customer success rep on calls.
- **Secondary market (v2):** customer success / support teams, recruiters, consultants — same engine, different prompt library.

## 3. Goals (MVP)

1. Join a Zoom/Meet/Teams call as a bot (or via desktop overlay) and capture audio in chunks (first chunk ~5 min, then ~10 min, matching Outshine's existing cadence and cost model).
2. After each chunk, surface 3 coaching cards: discovery question to ask, objection/risk to address, next-step / close line — same card taxonomy as Outshine.
3. Auto-generate a post-call summary: key decisions, objections raised, action items, next steps, deal risk flags — reuse Outshine's summary feature directly.
4. Team dashboard for managers: call volume, common objections across the team, coaching-card adoption rate.
5. Self-serve checkout for small teams (5 seats) + ability to do manual sales-assisted onboarding for 20+ seat deals.

## 4. Non-goals (MVP)

- Live captioning / sub-minute "whisper in your ear" feedback — explicitly not the product; see framing correction above.
- Full call recording/storage compliance suite (legal hold, redaction) — defer to v2.
- CRM write-back (Salesforce/HubSpot sync) — defer to v2, do read-only context pull only if cheap.
- Deal forecasting / win-probability scoring — defer, needs more data than MVP will have.
- Native mobile app — B2B sales calls happen on desktop; mobile is not priority for v1 (though Flutter reuse makes it cheap to add later — see tech stack).

## 5. Core user flow

1. User installs desktop app or invites bot (`callcoach@yourcompany.com`) to a Zoom/Meet/Teams meeting.
2. Bot joins, starts recording in chunks; user sees a small floating overlay window (same visual language as Outshine's "Live AI Coaching" cards).
3. After each ~5-10 minute chunk: new coaching cards surface (Strategic Question / Risk Alert / What to Say Next — reuse Outshine's 3-card taxonomy and Gemini prompt architecture, swap prompt library for sales context).
4. Call ends → AI generates structured summary (decisions, objections, action items, risks, next steps) — reuse Outshine's meeting-summary feature wholesale.
5. Summary + call appears in team dashboard; manager can filter by rep, deal stage, objection type.

## 6. Monetization

- **Team plan:** $79/seat/month (or $790/seat/year), minimum 3 seats. Includes coaching + summaries + team dashboard.
- **Growth/Enterprise plan:** custom pricing, adds CRM sync, SSO, admin controls, longer call-history retention.
- **No perpetual free tier** — 14-day team trial instead (B2B buyers expect trials, not freemium).

## 7. Success metrics (first 90 days post-launch)

- 10 paying teams (3+ seats each) = ~$2-3k MRR minimum to validate.
- Coaching-card "useful" rate (thumbs-up rate on cards) > 40%.
- Week-4 seat retention > 80% within a paying team.
- At least 3 unsolicited reference calls / case studies.

## 8. What's reused from existing Outshine stack vs. net-new

| Component | Reused from Outshine | Net-new for this project |
|---|---|---|
| Chunked audio capture + Gemini transcription (5-10 min cadence) | ✅ same pipeline, same cost-guardrail logic (`_assert_chunk_within_limits`) | — |
| Rolling-memory + coaching-card generation (Gemini, JSON-constrained output) | ✅ same architecture, new prompt library for sales | — |
| Meeting/call summary generation | ✅ near-identical Firestore + Gemini flow | — |
| Card UI / visual language | ✅ same dark purple Flutter design system | Needs a desktop-overlay screen instead of (or alongside) mobile |
| Client framework | ✅ Flutter — Outshine's repo already has macOS/Windows/Linux/Web targets, not just iOS/Android | Build out the desktop-overlay UI on those existing targets |
| Backend | ✅ Firebase 2nd-gen Python callable functions, Firestore, Storage | New callables/collections for teams, seats, call-bot sessions |
| Auth | Partial — Firebase Auth (Apple/Google) works for individuals | Net-new: org/team accounts, manager vs. rep roles, seat invites |
| Billing | Partial — RevenueCat + App Store subscriptions assume one consumer buying for themselves | Net-new: seat-based B2B billing (RevenueCat doesn't really fit team/seat billing — likely Stripe Billing instead) |
| Call ingestion | ❌ Outshine listens via phone mic during an in-person/phone meeting | Net-new: meeting-bot integration to join Zoom/Meet/Teams and capture audio |
| Team dashboard / analytics | ❌ doesn't exist | Net-new |
| Sales motion | ❌ Micavo has only ever done self-serve App Store distribution | Net-new: needs at least lightweight outbound/demo motion |

## 9. Basic tech stack

Reuse Outshine's actual stack as the default — it's the same problem (chunked audio → Gemini → coaching cards → summary) wearing a different prompt library, so there's no reason to introduce a second client framework or backend.

**Client**
- **Flutter**, same as Outshine. Outshine's repo already builds for macOS, Windows, Linux, and Web in addition to iOS/Android — the desktop-overlay window for sales reps is a new screen on an existing target, not a new framework (Electron/Tauri not needed).
- Same Provider-based state management and card-UI components as Outshine; port the "Live AI Coaching" card widgets directly, point them at sales-specific Firestore documents.

**Audio capture + AI pipeline**
- Keep the same chunk cadence: first chunk ~5 minutes, then ~10 minutes, uploaded as `.m4a` to Firebase Storage — do not market or build this as real-time.
- **Gemini 2.5 Flash** (same model Outshine uses) for transcription and for coaching-card generation, with `response_mime_type="application/json"` constrained decoding (already solved the "model emits invalid JSON" problem in Outshine — reuse that pattern, don't re-discover it).
- Reuse the rolling-memory pattern (previous summary + latest chunk → updated memory + new cards) instead of resending the full call transcript each cycle.
- Reuse `_assert_chunk_within_limits`-style guardrails (per-call cap, per-period quota projection) so a forgotten/stuck call recording can't run away on Gemini cost — same risk Outshine already had to solve.

**Backend**
- **Firebase 2nd-gen Python callable functions** (same as Outshine) for: bot-session start/stop, chunk processing, summary finalization.
- **Cloud Firestore** for calls (mirrors Outshine's `meetings/{id}` model), plus new collections for `teams/{teamId}` and `teams/{teamId}/seats/{uid}`.
- **Firebase Storage** for chunk audio, same lifecycle (delete once a call is fully processed).
- New: org/team data model and Firestore security rules for manager-vs-rep read access (Outshine's rules are single-user-owns-their-document; team dashboards need manager-reads-team-data rules).

**Call ingestion (the one genuinely new piece)**
- A managed meeting-bot API (e.g. Recall.ai) to join Zoom/Google Meet/Microsoft Teams calls and hand off raw audio into the same chunked-upload pipeline Outshine already has — don't build a custom per-platform bot from scratch for MVP.

**Auth + billing**
- Firebase Auth still works for individual sign-in; add a `teams` layer on top (team owner invites seats).
- **RevenueCat + App Store/Play Billing don't fit seat-based B2B billing well** — this is the one piece where Outshine's actual subscription stack does *not* transfer. Use **Stripe Billing** for per-seat team subscriptions instead, with a lightweight admin page for adding/removing seats.

**Team dashboard (new)**
- Could stay inside the same Flutter app (web target) rather than spinning up a separate React/Next.js app — reuses the same Firestore queries and design system, and Micavo has no existing React web app to reuse anyway. Build a manager-view Flutter web page before reaching for a new frontend stack.

**Infra**
- Same Firebase project structure/conventions Outshine already uses, to keep ops and on-call knowledge shared across products.
- Reuse the cost-tracking pattern from `meetings/{id}/gemini_usage/{request}` (model, tokens, estimated cost per request) from day one — per-call Gemini spend needs to stay well under per-seat revenue, and Outshine already had to build this once.

## 10. Biggest risks

1. **Meeting-bot reliability**: Zoom/Teams bots can be flaky, rate-limited, or blocked by company IT policy (security review will be a real sales blocker for some enterprise buyers).
2. **Distribution**: B2B requires actual outbound/demo motion — Micavo has no track record selling self-serve to teams; this is the real unknown, not the tech.
3. **Billing fit**: RevenueCat/App Store billing (Outshine's current setup) doesn't map cleanly to seat-based B2B — this is real net-new work, not a reuse.
4. **Cadence expectation mismatch**: if the pitch oversells "real-time," buyers used to live-transcription tools (Gong, Otter) will be disappointed by a 5-10 minute cadence. Lead with "a coach that thinks before it speaks," not speed.
5. **Competitive crowding**: Gong/Chorus/Avoma already do post-call coaching; the differentiation has to be the *in-call* (if delayed) coaching card itself — should not become "Gong but worse."

## 11. Suggested first milestone (validate before building more)

Before writing the dashboard, billing, or desktop overlay: build the smallest possible proof — join one real Zoom call with a test bot, feed the audio into Outshine's existing chunked-upload-and-Gemini-coaching pipeline with a sales prompt swapped in, and confirm the cards are good enough (at the real 5-10 minute cadence, not real-time) that a real rep would want them. If that doesn't feel obviously useful in a live test, the rest of this plan isn't worth building yet.
