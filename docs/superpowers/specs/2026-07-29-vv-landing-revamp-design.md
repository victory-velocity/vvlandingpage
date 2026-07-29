# Victory Velocity Landing Page Revamp — Design

Date: 2026-07-29
Repo: `vvlandingpage` (Next.js 14 App Router, Tailwind present but the site is styled with hand-written CSS in `app/globals.css`)

## Goal

Re-anchor the site on a single, direct proposition for a **general business audience** — not ML growth scientists:

> Victory Velocity is a hands-on agency you can reach, that gets your brand named by AI engines.

The site currently sells three parallel services (GEO, ChatGPT Ads, Weekly Tracking). It becomes one service with a four-step method, and every factual claim in that method is grounded in the `vvAgentSystem` codebase.

## Grounding — what the system provably does

Verified by reading `../vvAgentSystem` directly (not just `PROJECT_STATE.md`). These are the only technical facts the site is permitted to assert.

**Measurement** (`agents/src/tracker.py`, `detection.py`, `engines/`, `stability.py`)

- Four live engines: ChatGPT (`gpt-4o-mini`), Claude (`claude-haiku-4-5`), Gemini (`gemini-2.5-flash`), Perplexity (`sonar`).
- Client config carries brand name, domain, competitors, and an approved intent/query set, each intent with optional **paraphrases**. Each intent is measured as canonical wording plus paraphrases.
- Buckets: `consideration` → "Product Visibility", `awareness` → "Content Authority". `branded` is deferred.
- Per response: brand mentioned; brand **cited** (domain appears, citation URL captured); competitor mentions.
- Mention level classified 1–4: `passing_mention`, `listed_with_context`, `recommended`, `primary_recommendation`.
- `compute_competitive_gaps()` returns, per intent: client mention rate, client average mention level, and for each competitor a mention rate **broken out per engine**.
- Mention rate and citation rate share the same denominator (commit `656960b`).

**Technical audit** (`agents/src/technical_audit/`)

- 26 registered deterministic checks: `robots_txt.access`, `robots_txt.integrity`, `sitemap.discovery`, `sitemap.integrity`, `sitemap.coverage`, `sitemap.entry_health`, `schema.coverage`, `schema.integrity`, `meta_title.integrity`, `meta_description.integrity`, `canonical.integrity`, `tls.certificate`, `tls.https_redirect`, `tls.mixed_content`, `links.internal_health`, `links.external_health`, `images.alt_text`, `images.integrity`, `performance.lighthouse`, `performance.crux`, `performance.lcp_image`, `freshness.dates`, `llms_txt.integrity`, `source_support.link_health`, `integration.gsc_sitemap`, `integration.bing`.
- `robots_txt.access` verifies seven named AI crawlers: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, CCBot.
- Findings group into action cards carrying a risk rating (`low`/`medium`/`high`) and **platform-specific step-by-step instructions** (`remediation.py` has real Squarespace paths, e.g. "Page Settings → SEO").
- Lifecycle is human-gated: review → approve/reject → apply manually → mark applied → re-run audit to verify. Cards never self-apply. Statuses include `resolved` and `regressed`.

**Not in the system.** Third-party/community authority building has no tooling. The Reddit/community scout was built and deliberately reverted (`ec14173`); `PROJECT_STATE.md` says it should not be revived by default. Step 03 is therefore presented as explicitly human-led work. This is a decided position, not an omission.

**Reachability.** Confirmed by the user: a persistent shared channel per client (Slack/WhatsApp/text) plus calls scheduled on demand when something is too complicated for text. **Not confirmed and therefore not claimable:** a response-time SLA, a standing recurring call, or a "24/7 answered" promise. Copy asserts *access*, never *response time*.

## Decisions taken

| Question | Decision |
| --- | --- |
| Step 03 has no system behind it | Present as explicitly human-led, anchored to measured gaps. The contrast strengthens the agency positioning. |
| ChatGPT Ads | Cut from the main narrative. Preserved as a single FAQ answer only. `AdsManagerVisual` deleted, Ads `Service` schema entry removed. |
| Site architecture | Homepage keeps the full method inline; FAQ gets a dedicated `/faq` page with full `FAQPage` schema. |
| Method presentation | Sticky scroll-driven panel (option C), with a stacked fallback below 900px. |
| Animation sequencing | Last. Static panels ship first so a motion failure cannot block the release. |

## Information architecture

```
/          Nav · Hero + marquee · The shift · Agency anchor · The method · FAQ teaser · Contact · Footer
/faq       Full question set, FAQPage schema
/blog      unchanged
/blog/[post]  unchanged
/about     unchanged (nav swapped for shared component)
```

Removed from `/`: the "Three ways to win the generative front door" services section.

## Copy

### Hero

- H1 unchanged: `Be the answer, everywhere they ask.`
- Subhead: *A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity — with an open line to us the whole way.*
- Mono strip below CTA: `Open channel · Calls whenever you need one · You talk to the people doing the work`

### Agency anchor section

Heading: *You're never talking to a dashboard.*

Body asserts: a shared channel per client, message any time; a call whenever something needs walking through; the people answering are the people doing the work. No response-time commitment.

### The method

**01 — Visibility test across intents.** *"See exactly where AI leaves you out."*
We don't check a handful of generic prompts. We build the real set of buying intents for your business, test each across multiple phrasings, and run them through ChatGPT, Claude, Gemini and Perplexity. Every answer is recorded three ways: whether you were named, whether you were actually cited with a link, and how strongly you were positioned — from a passing mention to the primary recommendation. Your named competitors run through the identical set, so you finish with a per-engine map of every intent where they get named and you don't.

**02 — Technical site audit.** *"Fix what's stopping AI from reading you."*
Twenty-six deterministic checks against your site, starting with whether the seven major AI crawlers are even allowed in — GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended and CCBot. Then sitemaps, schema markup, meta titles and descriptions, canonicals, HTTPS and mixed content, broken internal and external links, image alt text, and page speed. Findings group into action cards with a risk rating and exact step-by-step instructions for your platform. Nothing applies itself: you approve it, we apply it, then we re-run the audit to prove it's fixed.

**03 — Third-party authority.** *"Get named where the models are looking."*
This part is us, not software. We take the specific intents where your competitors get named and you don't, and go build your presence in the places those answers are drawn from — the directories, publications, comparison pages and communities the models pull from for your category. Every placement is chosen against a gap we measured, not a generic list.

**04 — Re-run and iterate.** *"Prove it moved, then do it again."*
We re-run the full measurement and the audit on a cycle. You see visibility movement per intent and per category, where you now sit against each competitor, which fixes were applied and verified — and which regressed. Then we pick the next set of gaps with you.

### FAQ (`/faq`)

Approximately twelve questions: what Victory Velocity does; how this differs from SEO; which engines are measured; how the intents to test are chosen; what the technical audit covers; whether you change the client's site yourself (no — approve, then apply, then verify); how movement is proven; how fast results move; how to reach the team; what's needed to start; platform support; and one answer covering ChatGPT Ads.

Answers must stay within the grounding section above. No invented metrics, timelines, client counts, or case-study numbers.

## Components

New:

- `components/SiteNav.tsx` — shared client nav, desktop links plus mobile hamburger. Replaces duplicated `.nav` / `.blog-nav` markup across home, about, blog, and faq.
- `components/MobileDrawer.tsx` — right-side full-height drawer. Backdrop blur, staggered link entrance, body scroll lock, Escape to close, focus trap, `aria-expanded` on the trigger.
- `components/method/StickyMethod.tsx` — section shell, scroll progress, active-step state, stacked fallback below 900px.
- `components/method/panels/VisibilityPanel.tsx` — engine × intent heatmap with competitor row.
- `components/method/panels/AuditPanel.tsx` — findings collapsing into an approved action card.
- `components/method/panels/AuthorityPanel.tsx` — SVG node/edge map filling a measured gap.
- `components/method/panels/IteratePanel.tsx` — two cycles side by side, score delta.
- `components/sections/{Hero,Shift,AgencyAnchor,FaqTeaser,Contact}.tsx` — extracted from `app/page.tsx`.
- `app/faq/page.tsx`

Modified: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/about/page.tsx`, `app/blog/page.tsx`, `app/blog/the-biggest-shift-in-marketing-since-google-ads/page.tsx`, `app/sitemap.ts`, `public/llms.txt`, `components/ServiceVisuals.tsx`.

Deleted: `AdsManagerVisual` and its `mk-form` CSS block.

`app/page.tsx` is 357 lines today and would roughly double; the section extraction keeps each file focused. `app/globals.css` is 766 lines and gains a nav drawer and a full method section, so `app/styles/nav.css` and `app/styles/method.css` are split out and imported from `globals.css`.

## Sticky method mechanics

- Section is roughly `400vh` tall. The visual column is `position: sticky; top: <nav height + gutter>`.
- `useScroll({ target, offset: ["start start", "end end"] })` from framer-motion (already a dependency at `^12.40.0`) yields `scrollYProgress`.
- `useMotionValueEvent(scrollYProgress, "change", …)` maps progress to an active index 0–3 with hysteresis, so a boundary scroll doesn't flicker.
- Panels cross-fade through `AnimatePresence` (opacity plus a small `y`).
- Copy column renders all four steps stacked; the non-active steps dim rather than disappear, so the whole method is readable as text regardless of scroll position.
- Below 900px the sticky behaviour is dropped entirely and the section renders as four stacked copy + visual pairs. Same panel components, different layout — this is the mobile-Safari escape hatch.

## Panel animation

Deferred to the final phase. Each panel replays when its step becomes active.

- **Visibility** — cells fill on a stagger (opacity plus `scaleY`, origin bottom) sweeping left to right by engine; competitor row lands last and brighter; a gap marker draws between the rows.
- **Audit** — findings stream in, then several collapse into one grouped action card using framer-motion's `layout` prop; ends on the approve → applied state flip.
- **Authority** — SVG graph: brand node centre, platform nodes fade in, edges draw via animated `pathLength`.
- **Iterate** — score counter ticks via a motion value through `useTransform(v => Math.round(v))`; bars regrow; delta badge pops.

Under `prefers-reduced-motion: reduce`, every panel renders its final state immediately and the marquee highlight stops cycling. `globals.css:464` already establishes this convention.

## Marquee highlight

`HOT_A = 2` in `app/page.tsx:9` pins the highlight to Perplexity permanently. Replace with state advancing through all eight engines on an interval near 1.8s, applying `.hot` where `i % ENGINES.length === hot`. Add a colour transition to `.track .eng` so the change fades. Interval does not start under reduced motion.

## SEO and schema

- Move the `FAQPage` block out of `app/layout.tsx` (where it currently applies to every page) into `app/faq/page.tsx`. Home's teaser carries no schema.
- Remove the ChatGPT Ads `Service` entry from the org graph. Keep and reword the GEO and tracking `Service` entries to match the new method.
- Rewrite `metadata` title and description in `app/layout.tsx` around the agency positioning.
- Add `/faq` to `app/sitemap.ts`.
- Update `public/llms.txt` to describe the four-step method and the agency anchor.

## Verification

- `npm run build` and `npm run lint` clean.
- Manual check at 375px, 768px, and 1440px: drawer opens/closes/traps focus; sticky method tracks scroll on desktop and is fully absent below 900px; marquee highlight advances.
- `prefers-reduced-motion: reduce` — no marquee cycling, panels at final state, reveals disabled.
- Every rendered claim traceable to the grounding section.

## Out of scope

- AI-generated video. Explicitly deferred by the user to after the main fixes land.
- Blog content changes beyond the shared nav swap.
- Any change to `vvAgentSystem`.

## Open items

- The user referenced a `taste` skill to be used on every visual change. It is not present in the available skills list for this session. Resolve before implementation; if unavailable, aesthetic consistency is held by working strictly within the existing token system (`--serif`, `--sans`, `--mono`, `--ink*`, `--hair`, `.rv` reveal, hairline borders, 2px radii on CTAs).
- `.gitignore` has been modified to add `.superpowers/` (brainstorming session artefacts). Uncommitted.
