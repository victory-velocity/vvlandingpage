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

## Design read and dials

Per the `design-taste-frontend` skill (installed from `github.com/Leonxlnx/taste-skill`).

**Design read:** redesign-preserve of an agency landing page for non-technical business owners, with a dark editorial serif language, leaning toward native CSS plus Motion scroll-driven animation.

**Mode:** Redesign - Preserve (skill §11.A). Brand tokens are established and strong; they are starting material, not optional input.

**Dials**, inferred from the existing site rather than the baseline: `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 3`. Motion is the existing reading plus one, per the redesign-preserve row.

**Passes already:** Newsreader is a justified serif (genuinely editorial aesthetic family, brand-established, and not one of the banned Fraunces / Instrument_Serif defaults). Italic emphasis is same-family via `.it`, which is what §4.1 requires. Theme is locked dark across all sections (§4.11). One accent (off-white on off-black), one radius scale.

## Taste audit: violations to fix

Existing code:

| Violation | Where | Rule |
| --- | --- | --- |
| 41 em-dashes site-wide (12 in `page.tsx`, 9 in `ServiceVisuals.tsx`, 4 in `about`) | all pages | §9.G, total ban |
| `window.addEventListener("scroll")` | `app/page.tsx:27` | §5.D, hard ban. Replace with Motion `useScroll` |
| Google Fonts via `<link>` | `app/layout.tsx:118` | §3.A. Migrate to `next/font` |
| Section-number eyebrows (`01 — Generative Engine Optimization`) | `app/page.tsx` | §9.F |
| Eyebrow count roughly 3x the `ceil(sections/3)` ceiling | `.lead-in`, `.way-no` | §4.7 |
| Filled-background progress track | `.mk-report .pbar`, `globals.css:314` | §9.F |
| `lucide-react` dependency, zero usages | `package.json` | §3.C, remove |
| Div-built fake product UI | `ServiceVisuals.tsx` | §4.8, §9.E |

Corrections to this spec's own earlier draft:

- Hero subhead was 23 words against a 20-word cap (§4.7). Shortened.
- The mono strip under the hero CTA is a banned tiny-tagline (§4.7 hero stack discipline) and carried two middle dots against a one-per-line ration (§9.F). Removed from the hero; the reachability claim moves into the agency anchor section.
- Steps numbered `01`-`04` are banned twice (§9.F section-number eyebrows, and generic step labels). Replaced with verb labels.

**Deliberate deviations**, accepted with reasoning:

- **Dark-only.** §6.C wants dual-mode. Dark is an established brand decision and §11.C says brand fidelity wins in redesign-preserve. No light mode. Flagged to the user rather than built.
- **Two marquee tracks in the hero band.** §5 caps marquees at one per page. The two counter-scrolling tracks read as a single visual band, and it is the site's one signature interaction. Kept as one element; no second marquee appears anywhere else on the page.

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

All copy in this section is em-dash free by construction (§9.G). Any rewrite must preserve that.

### Hero

- H1 unchanged: `Be the answer, everywhere they ask.`
- Subhead, 14 words: *A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity.*
- One primary CTA. No tagline strip, no trust micro-strip, no eyebrow. Four text elements maximum, and this hero uses three.

### Agency anchor section

Heading: *You're never talking to a dashboard.*

Body asserts: a shared channel per client, message any time; a call whenever something needs walking through; the people answering are the people doing the work. No response-time commitment. This is where the reachability claim lives, having been moved out of the hero.

### The method

Steps are labelled by verb, not number. No `01`-`04` prefixes anywhere.

**Measure.** *See exactly where AI leaves you out.*
We don't check a handful of generic prompts. We build the real set of buying intents for your business, test each one across multiple phrasings, and run them through ChatGPT, Claude, Gemini and Perplexity. Every answer is recorded three ways: whether you were named, whether you were actually cited with a link, and how strongly you were positioned, from a passing mention up to the primary recommendation. Your named competitors run through the identical set, so you finish with a per-engine map of every intent where they get named and you don't.

**Fix.** *Clear what stops AI reading your site.*
Twenty-six deterministic checks against your site, starting with whether the seven major AI crawlers are even allowed in: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended and CCBot. Then sitemaps, schema markup, meta titles and descriptions, canonicals, HTTPS and mixed content, broken links, image alt text, and page speed. Findings group into action cards with a risk rating and exact step-by-step instructions for your platform. Nothing applies itself. You approve it, we apply it, then we re-run the audit to prove it's fixed.

**Build authority.** *Get named where the models look.*
This part is us, not software. We take the specific intents where your competitors get named and you don't, then build your presence in the places those answers are drawn from: the directories, publications, comparison pages and communities the models pull from for your category. Every placement is chosen against a gap we measured, not a generic list.

**Re-run.** *Prove it moved, then go again.*
We re-run the full measurement and the audit on a cycle. You see visibility movement per intent and per category, where you now sit against each competitor, which fixes were applied and verified, and which regressed. Then we pick the next set of gaps with you.

### FAQ (`/faq`)

Approximately twelve questions: what Victory Velocity does; how this differs from SEO; which engines are measured; how the intents to test are chosen; what the technical audit covers; whether you change the client's site yourself (no — approve, then apply, then verify); how movement is proven; how fast results move; how to reach the team; what's needed to start; platform support; and one answer covering ChatGPT Ads.

Answers must stay within the grounding section above. No invented metrics, timelines, client counts, or case-study numbers.

## Components

New:

- `components/SiteNav.tsx` — shared client nav, desktop links plus mobile hamburger. Replaces duplicated `.nav` / `.blog-nav` markup across home, about, blog, and faq.
- `components/MobileDrawer.tsx` — right-side full-height drawer. Backdrop blur, staggered link entrance, body scroll lock, Escape to close, focus trap, `aria-expanded` on the trigger.
- `components/method/StickyMethod.tsx` — section shell, scroll progress, active-step state, stacked fallback below 900px.
- `components/method/ScreenPanel.tsx` — frames a real dashboard screenshot in the site's dark style: hairline border, 12px radius, deep soft shadow, `next/image` with explicit dimensions so CLS stays at zero. One component, three instances.
- `components/method/AuthorityPanel.tsx` — the Build authority step has no dashboard surface, so it takes no product screenshot. See below.
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

## Panel content

Div-built product mockups are banned (§4.8, §9.E). Three of the four steps show a real screenshot of the real dashboard instead. This is both compliant and more persuasive: the machinery visibly exists.

**Required from the user before these panels can be built:**

| Step | Screenshot needed | Source |
| --- | --- | --- |
| Measure | Queries tab showing per-intent mention and citation rates with the competitor comparison visible | vvAgentSystem dashboard, client detail → Queries |
| Fix | Audit tab showing grouped action cards with risk ratings, ideally one approved and one pending | client detail → Audit |
| Re-run | Runs or Overview showing two cycles and the movement between them | client detail → Runs |

Client names and domains should be blurred or swapped for a demo client before sending. Export at 2x for retina, PNG or WebP, roughly 16:10. These land in `public/dashboard/`.

The **Build authority** step deliberately has no product screenshot, because it is human work with no dashboard surface. Rendering a fake one would misrepresent the service and re-introduce the banned pattern. It becomes a full-width typographic section instead, which also breaks the zigzag run that §4.7 caps at two consecutive image-plus-text splits.

## Motion

Deferred to the final phase, per the user's sequencing.

- **Panel transitions:** cross-fade plus a small `y` on step change, `AnimatePresence`. Justified as storytelling: the visual tracks the step being read.
- **Screenshot entry:** each screenshot reveals once on first activation, opacity and `y` only. No perpetual loops on informational content (§5).
- **Authority step:** since it has no screenshot, its motion is a staggered text reveal via `whileInView` (§5.C canonical skeleton), not GSAP.
- **Nav:** hide-on-scroll driven by `useScroll`, replacing the banned scroll listener.
- **Marquee highlight:** interval-driven index advance, CSS colour transition.

Every animation above answers "what does this communicate?" in one sentence, per §5's motion-motivated rule. Animate `transform` and `opacity` only.

Under `prefers-reduced-motion: reduce`, panels render final state immediately, the marquee highlight stops cycling, and the sticky cross-fade becomes an instant swap. `globals.css:464` already establishes this convention; `useReducedMotion()` from Motion covers the JS side.

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
- `grep -r "—" app components` returns zero matches. This is mechanical and non-negotiable (§9.G).
- `grep -rn "addEventListener(\"scroll\"" app components` returns zero matches.
- Eyebrow count: instances of uppercase-tracking micro-labels above section headlines is at most `ceil(sectionCount / 3)`.
- Manual check at 375px, 768px, and 1440px: drawer opens, closes, and traps focus; sticky method tracks scroll on desktop and is fully absent below 900px; marquee highlight advances; nav renders on one line and stays under 80px tall.
- `prefers-reduced-motion: reduce`: no marquee cycling, panels at final state, reveals disabled.
- Every rendered claim traceable to the grounding section.
- Full §14 pre-flight checklist run before declaring done.

## Out of scope

- AI-generated video. Explicitly deferred by the user to after the main fixes land.
- Blog content changes beyond the shared nav swap.
- Any change to `vvAgentSystem`.

## Open items

- **Blocking for three panels only:** the dashboard screenshots listed under Panel content. Everything else in the plan proceeds without them; the panels ship with reserved, correctly-sized placeholder slots until the images arrive.
- The `design-taste-frontend` skill was read from a clone rather than installed, because writing to `~/.claude/skills/` was blocked. The user should run `/plugin marketplace add Leonxlnx/taste-skill` so it registers for future sessions.
- Dark-only is a deliberate deviation from §6.C. If the user wants a light mode, it is a separate piece of work.
- `.gitignore` has been modified to add `.superpowers/` (brainstorming session artefacts).
