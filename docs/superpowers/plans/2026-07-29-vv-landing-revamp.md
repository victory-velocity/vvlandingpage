# Victory Velocity Landing Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-anchor victoryvelocity.ca on a single proposition (a reachable agency that gets your brand named by AI engines), delivered through a four-step method grounded in the real vvAgentSystem, with a working mobile nav and a dedicated FAQ page.

**Architecture:** Next.js 14 App Router. The homepage becomes a composition of focused section components instead of one 357-line file. A shared client `SiteNav` replaces duplicated nav markup on four pages. The method section is a scroll-driven sticky panel on desktop that degrades to a stacked layout below 900px. Styling stays in hand-written CSS using the existing token system; Tailwind is installed but effectively unused and stays that way.

**Tech Stack:** Next.js 14.2, React 18, TypeScript, framer-motion 12, hand-written CSS with custom properties, `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-07-29-vv-landing-revamp-design.md`. Read it before starting. All factual copy claims are constrained by its "Grounding" section; do not invent metrics, timelines, or client numbers.

---

## Why there are no unit tests

This repo has no test framework and no test files. The product is a presentational marketing site: unit-testing JSX output would assert that markup equals itself.

The real correctness constraints here are the taste-skill rules (zero em-dashes, no scroll listeners, no numbered step eyebrows), and those **are** mechanically checkable. Task 1 builds `scripts/preflight.mjs` as the red/green harness. It fails on the current codebase (41 em-dashes, 1 scroll listener), and stays in the loop for every later task. That is the TDD cycle for this project.

Visual correctness is verified by `npm run build` plus explicit manual viewport checks, listed per task.

---

## File Structure

**Create**

| Path | Responsibility |
| --- | --- |
| `scripts/preflight.mjs` | Mechanical taste-rule checker. Single source of truth for the bans. |
| `components/SiteNav.tsx` | The one nav for every page. Desktop links, scroll hide/show, mobile trigger. |
| `components/MobileDrawer.tsx` | Right-side drawer: focus trap, scroll lock, Escape, staggered entrance. |
| `components/sections/Hero.tsx` | H1, subhead, CTA, marquee band. |
| `components/sections/Shift.tsx` | The "customers stopped searching" moment. |
| `components/sections/AgencyAnchor.tsx` | Reachability claim. The positioning anchor. |
| `components/sections/FaqTeaser.tsx` | Five questions plus a link to `/faq`. |
| `components/sections/Contact.tsx` | Contact form and submit state machine. |
| `components/method/StickyMethod.tsx` | Section shell, scroll progress, active step, mobile fallback. |
| `components/method/ScreenPanel.tsx` | Frames one dashboard screenshot. Three instances. |
| `components/method/AuthorityPanel.tsx` | The human-led step. Typographic, no product UI. |
| `components/method/steps.ts` | Step copy as data. Single source for both layouts. |
| `app/faq/page.tsx` | Full FAQ plus `FAQPage` schema. |
| `app/styles/nav.css` | Nav and drawer styles. |
| `app/styles/method.css` | Method section styles. |

**Modify**

| Path | Change |
| --- | --- |
| `app/layout.tsx` | `next/font`, metadata rewrite, schema graph rewrite, drop `FAQPage`. |
| `app/page.tsx` | Becomes a thin composition of section components. |
| `app/globals.css` | Font vars point at `next/font`, import the two new stylesheets, delete `mk-form` block. |
| `app/about/page.tsx`, `app/blog/page.tsx`, `app/blog/the-biggest-shift.../page.tsx` | Swap inline nav for `SiteNav`, purge em-dashes. |
| `app/sitemap.ts` | Add `/faq`. |
| `public/llms.txt` | Rewrite around the four-step method. |
| `components/ServiceVisuals.tsx` | Delete `AdsManagerVisual`, purge em-dashes. |
| `package.json` | Add `preflight` script, remove unused deps. |

**Delete:** `components/ui/{button,card,input,label,textarea}.tsx` (zero imports across the repo).

---

## Task 1: Preflight guardrail

**Files:**
- Create: `scripts/preflight.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the checker**

Create `scripts/preflight.mjs`:

```js
#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["app", "components", "public/llms.txt"];
const EXTS = new Set([".tsx", ".ts", ".css", ".txt"]);

const RULES = [
  {
    id: "em-dash",
    label: "em-dash or en-dash is banned (taste skill 9.G)",
    test: (line) => /[—–]/.test(line),
  },
  {
    id: "scroll-listener",
    label: "window.addEventListener('scroll') is banned (taste skill 5.D)",
    test: (line) => /addEventListener\(\s*['"]scroll['"]/.test(line),
  },
  {
    id: "numbered-eyebrow",
    label: "numbered step eyebrow is banned (taste skill 9.F)",
    test: (line) => /["'>]\s*0\d\s*[-—–]\s*[A-Z]/.test(line),
  },
];

function walk(path, out = []) {
  const stats = statSync(path);
  if (stats.isFile()) {
    if (EXTS.has(extname(path))) out.push(path);
    return out;
  }
  for (const entry of readdirSync(path)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    walk(join(path, entry), out);
  }
  return out;
}

const files = ROOTS.flatMap((root) => walk(root));
let failures = 0;

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const rule of RULES) {
      if (rule.test(line)) {
        failures += 1;
        console.error(`${file}:${index + 1}  [${rule.id}] ${rule.label}`);
        console.error(`    ${line.trim().slice(0, 100)}`);
      }
    }
  });
}

if (failures > 0) {
  console.error(`\npreflight: ${failures} violation(s)`);
  process.exit(1);
}

console.log(`preflight: clean (${files.length} files scanned)`);
```

- [ ] **Step 2: Register the script**

In `package.json`, add to `"scripts"`:

```json
"preflight": "node scripts/preflight.mjs"
```

- [ ] **Step 3: Run it and confirm it FAILS**

Run: `npm run preflight`

Expected: non-zero exit, roughly 42 violations. You should see 12 em-dash hits in `app/page.tsx`, 9 in `components/ServiceVisuals.tsx`, 4 in `app/about/page.tsx`, 1 scroll-listener hit at `app/page.tsx:27`, and numbered-eyebrow hits on the `01 —` service labels.

This failing output is the baseline. Later tasks drive it to zero.

- [ ] **Step 4: Commit**

```bash
git add scripts/preflight.mjs package.json
git commit -m "chore: add taste-rule preflight checker"
```

---

## Task 2: Migrate fonts to next/font

Removes the render-blocking Google Fonts `<link>` (taste skill 3.A) and eliminates the FOUT that currently costs CLS.

**Files:**
- Modify: `app/layout.tsx:114-133`, `app/globals.css:16-18`, `app/globals.css:681`

- [ ] **Step 1: Declare the fonts**

At the top of `app/layout.tsx`, after the existing imports:

```tsx
import { Newsreader, Schibsted_Grotesk, IBM_Plex_Mono, Cormorant_Garamond } from "next/font/google";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});
```

- [ ] **Step 2: Apply them and delete the link tags**

Replace the `RootLayout` return with:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${cormorant.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual'` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Both `<link rel="preconnect">` tags and the `<link href="https://fonts.googleapis.com/...">` tag are deleted.

- [ ] **Step 3: Point the CSS tokens at the new variables**

In `app/globals.css`, replace lines 16-18:

```css
  --serif: var(--font-serif), Georgia, serif;
  --sans: var(--font-sans), system-ui, sans-serif;
  --mono: var(--font-mono), ui-monospace, SFMono-Regular, monospace;
```

And replace the `.about-name` font stack at line 681:

```css
  font-family: var(--font-cormorant), Georgia, serif;
```

- [ ] **Step 4: Verify**

Run: `npm run build && npm run dev`

Expected: build succeeds. Open `http://localhost:3000`, confirm headings still render in Newsreader (serif with true italics), nav links in Schibsted Grotesk, and the `01` step numbers in IBM Plex Mono. Open `/about` and confirm the name renders in Cormorant Garamond. View source and confirm no `fonts.googleapis.com` link remains.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "perf: self-host fonts via next/font"
```

---

## Task 3: Remove dead code

`components/ui/*` has zero imports anywhere in the repo. `lucide-react` has zero usages.

**Files:**
- Delete: `components/ui/button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`
- Modify: `package.json`

- [ ] **Step 1: Confirm they are genuinely unused**

Run:

```bash
grep -rn "@/components/ui\|lucide-react" app components lib
```

Expected: no output. If anything prints, stop and do not delete that module.

- [ ] **Step 2: Delete**

```bash
rm -r components/ui
npm uninstall lucide-react @base-ui/react class-variance-authority shadcn
```

- [ ] **Step 3: Check whether `lib/utils.ts` is now orphaned**

Run: `grep -rn "@/lib/utils" app components`

If there is no output, also run `rm lib/utils.ts && npm uninstall clsx tailwind-merge`. If there is output, leave all four in place.

- [ ] **Step 4: Verify**

Run: `npm run build`

Expected: build succeeds with no module-not-found errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: drop unused shadcn scaffold and icon deps"
```

---

## Task 4: Shared nav with mobile drawer

Today `.nav .links { display: none }` at 900px leaves mobile users with no navigation at all. This is the highest-value fix in the plan.

**Files:**
- Create: `components/SiteNav.tsx`, `components/MobileDrawer.tsx`, `app/styles/nav.css`
- Modify: `app/globals.css`, `app/page.tsx`, `app/about/page.tsx`, `app/blog/page.tsx`, `app/blog/the-biggest-shift-in-marketing-since-google-ads/page.tsx`

- [ ] **Step 1: Create the drawer**

Create `components/MobileDrawer.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export type NavLink = { href: string; label: string };

export function MobileDrawer({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div className={`drawer-root${open ? " open" : ""}`} aria-hidden={!open}>
      <button className="drawer-scrim" onClick={onClose} tabIndex={-1} aria-label="Close menu" />
      <div className="drawer-panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu">
        <nav className="drawer-links">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{ transitionDelay: open ? `${80 + index * 55}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="cta solid drawer-cta" onClick={onClose}>
          Work With Us
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the nav**

Create `components/SiteNav.tsx`. Note it uses `useScroll` from framer-motion, not a scroll listener:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { MobileDrawer, type NavLink } from "./MobileDrawer";

const LINKS: NavLink[] = [
  { href: "/#method", label: "Method" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(!menuOpen && y > 80 && y > previous);
  });

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}${hidden ? " hide" : ""}`}>
        <Link href="/" className="mark">Victory&nbsp;Velocity</Link>

        <div className="links">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>

        <Link href="/#contact" className="cta nav-cta">Work With Us</Link>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} />
    </>
  );
}
```

- [ ] **Step 3: Create the styles**

Create `app/styles/nav.css`:

```css
/* ---- mobile drawer trigger ---- */
.nav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}
.nav-burger span {
  display: block;
  height: 1px;
  width: 22px;
  background: var(--white);
  transition: transform .3s ease;
}

/* ---- drawer ---- */
.drawer-root {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  visibility: hidden;
}
.drawer-root.open { pointer-events: auto; visibility: visible; }

.drawer-scrim {
  position: absolute;
  inset: 0;
  border: none;
  padding: 0;
  background: rgba(14,14,15,0.6);
  backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity .35s ease;
  cursor: pointer;
}
.drawer-root.open .drawer-scrim { opacity: 1; }

.drawer-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(86vw, 380px);
  background: var(--ink-soft);
  border-left: 1px solid var(--hair);
  padding: 108px 34px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateX(100%);
  transition: transform .42s cubic-bezier(.2,.7,.2,1);
}
.drawer-root.open .drawer-panel { transform: translateX(0); }

.drawer-links { display: flex; flex-direction: column; gap: 4px; }
.drawer-links a {
  font-family: var(--serif);
  font-size: 30px;
  line-height: 1.35;
  color: var(--white);
  padding: 8px 0;
  opacity: 0;
  transform: translateX(14px);
  transition: opacity .4s ease, transform .4s cubic-bezier(.2,.7,.2,1);
}
.drawer-root.open .drawer-links a { opacity: 1; transform: none; }

.drawer-cta { justify-content: center; }

@media (max-width: 900px) {
  .nav-burger { display: flex; }
  .nav .nav-cta { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .drawer-panel, .drawer-scrim, .drawer-links a { transition: none; }
}
```

- [ ] **Step 4: Import the stylesheet**

At the very top of `app/globals.css`, above the `:root` block:

```css
@import "./styles/nav.css";
```

- [ ] **Step 5: Swap the nav into every page**

In `app/page.tsx`, delete the entire `{/* ── NAV ── */}` block (lines 70-80) and the `navScrolled` / `navHidden` state plus the scroll half of the `useEffect`. Render `<SiteNav />` in its place and add `import { SiteNav } from "@/components/SiteNav";`.

In `app/about/page.tsx`, `app/blog/page.tsx`, and `app/blog/the-biggest-shift-in-marketing-since-google-ads/page.tsx`, delete the `<nav className="blog-nav">...</nav>` block and replace with `<SiteNav />`, adding the same import. These are Server Components; `SiteNav` carries its own `"use client"`, so this is valid.

- [ ] **Step 6: Verify**

Run: `npm run preflight`

Expected: the `scroll-listener` violation at `app/page.tsx:27` is gone. Em-dash violations remain; that is expected until Task 10.

Run: `npm run build && npm run dev`

Manual checks at 375px:
- Burger is visible, desktop links and desktop CTA are hidden.
- Tapping the burger slides the drawer in from the right with links staggering in.
- Background does not scroll while the drawer is open.
- Escape closes it; focus returns to the burger.
- Tab cycles only inside the drawer and does not escape to the page behind.
- Tapping the scrim closes it.

At 1440px: nav renders on one line, is 78px tall (under the 80px cap), burger is hidden, and hide-on-scroll-down still works.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: shared nav with working mobile drawer"
```

---

## Task 5: Rotating marquee highlight

`HOT_A = 2` at `app/page.tsx:9` pins the highlight to Perplexity permanently. The user asked for it to advance between models.

**Files:**
- Modify: `app/page.tsx` (moving into `components/sections/Hero.tsx` in Task 7; if Task 7 is already done, edit there instead)
- Modify: `app/globals.css:120-126`

- [ ] **Step 1: Replace the constant with rotating state**

Delete `const HOT_A = 2;`. Inside the component:

```tsx
const [hot, setHot] = useState(0);

useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const id = setInterval(() => setHot((prev) => (prev + 1) % ENGINES.length), 1800);
  return () => clearInterval(id);
}, []);
```

Then change the first track's className expression from `i % ENGINES.length === HOT_A` to `i % ENGINES.length === hot`.

- [ ] **Step 2: Make the change fade instead of snap**

In `app/globals.css`, add a transition to the `.track .eng` rule (line 120):

```css
.track .eng {
  font-family: var(--serif); font-size: clamp(30px, 4vw, 50px); color: var(--faint);
  display: inline-flex; align-items: center; gap: 64px;
  transition: color .55s ease;
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`

Expected: the highlighted engine advances through all eight names roughly every 1.8s, fading rather than snapping. Enable "Reduce motion" in macOS System Settings, reload, and confirm the highlight stays on ChatGPT and does not cycle.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat: rotate marquee engine highlight"
```

---

## Task 6: Extract homepage sections

Pure refactor, no visual change. Do this before rewriting copy so the diffs in Task 7 stay readable.

**Files:**
- Create: `components/sections/Hero.tsx`, `Shift.tsx`, `Contact.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Move the hero**

Create `components/sections/Hero.tsx` with `"use client"` at the top. Move the `ENGINES` / `SEQ` constants, the marquee highlight state from Task 5, and the entire `<header className="hero">` block into it. Export `function Hero()`.

- [ ] **Step 2: Move the shift**

Create `components/sections/Shift.tsx` (no `"use client"` needed, it is static markup). Move the entire `<section className="shift sec-pad">` block. Export `function Shift()`.

- [ ] **Step 3: Move the contact form**

Create `components/sections/Contact.tsx` with `"use client"`. Move the `form` and `status` state, `handleSubmit`, and the entire `<section className="close" id="contact">` block. Export `function Contact()`.

- [ ] **Step 4: Slim down the page**

`app/page.tsx` becomes:

```tsx
"use client";

import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { Shift } from "@/components/sections/Shift";
import { Contact } from "@/components/sections/Contact";
import { GEOVisual, WeeklyReportVisual } from "@/components/ServiceVisuals";

export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteNav />
      <Hero />
      <Shift />
      {/* ways, process, faq sections still inline here for now */}
      <Contact />
      {/* footer still inline here for now */}
    </>
  );
}
```

Keep the `ways`, `process`, `faq`, and `footer` blocks inline for now. Task 7 removes or replaces them.

- [ ] **Step 5: Verify**

Run: `npm run build && npm run dev`

Expected: the page looks pixel-identical to before. Scroll reveals still fire, the form still submits, the marquee still runs.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: extract homepage sections into components"
```

---

## Task 7: New narrative copy

**Files:**
- Modify: `components/sections/Hero.tsx`, `components/sections/Shift.tsx`, `app/page.tsx`
- Create: `components/sections/AgencyAnchor.tsx`

- [ ] **Step 1: Rewrite the hero**

In `components/sections/Hero.tsx`, replace the `<div className="wrap">` heading block with:

```tsx
<div className="wrap">
  <h1>Be the answer,<br /><span className="it">everywhere</span> they ask.</h1>
  <p className="hero-sub">
    A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity.
  </p>
</div>
```

The H1 is unchanged. The subhead is 14 words, inside the 20-word cap. Do not add a tagline strip below the CTA; hero stack discipline allows four text elements and this uses three.

- [ ] **Step 2: Rewrite the shift copy without em-dashes**

In `components/sections/Shift.tsx`, replace the `<p className="body rv d2">` content with:

```tsx
<p className="body rv d2">
  When someone asks ChatGPT, Perplexity, or Google&apos;s AI for the best option,
  they get one answer instead of ten blue links. If the model doesn&apos;t name you,
  you&apos;re not in the conversation. We make sure your brand is the one it reaches for.
</p>
```

- [ ] **Step 3: Build the agency anchor**

Create `components/sections/AgencyAnchor.tsx`:

```tsx
export function AgencyAnchor() {
  return (
    <section className="anchor sec-pad">
      <div className="wrap">
        <h2 className="rv">You&apos;re never talking to a <span className="it">dashboard</span>.</h2>
        <div className="anchor-body">
          <p className="rv d1">
            Every client gets a shared channel with us. Drop a question in it whenever
            one comes up, and when something is too tangled to explain over text, we get
            on a call about it.
          </p>
          <p className="rv d2">
            The people answering are the people doing the work. There is no account
            manager in between, and no ticket queue to sit in.
          </p>
        </div>
      </div>
    </section>
  );
}
```

Add to `app/globals.css`:

```css
/* ---- agency anchor ---- */
.anchor { background: var(--ink); }
.anchor h2 {
  font-family: var(--serif); font-weight: 400;
  font-size: clamp(34px, 4.8vw, 62px); line-height: 1.06;
  letter-spacing: -0.02em; margin: 0 0 48px; max-width: 780px;
}
.anchor h2 .it { font-style: italic; }
.anchor-body {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 72px); max-width: 900px;
}
.anchor-body p { font-size: 19px; line-height: 1.65; color: var(--mute); margin: 0; }

@media (max-width: 900px) {
  .anchor-body { grid-template-columns: 1fr; gap: 24px; }
}
```

- [ ] **Step 4: Remove the services section and wire in the anchor**

In `app/page.tsx`, delete the entire `<section className="ways sec-pad" id="services">` block and the `<section className="process sec-pad" id="process">` block. Both are replaced by the method section in Task 8. Remove the now-unused `GEOVisual` / `WeeklyReportVisual` imports.

Render `<AgencyAnchor />` between `<Shift />` and the method section.

- [ ] **Step 5: Delete the ads visual**

In `components/ServiceVisuals.tsx`, delete the `AdsManagerInner` function, the `AdsManagerVisual` export, the `CAMPAIGN_NAME` constant, and any helpers used only by them. In `app/globals.css`, delete the entire `/* mk-form */` block (lines 241-293).

- [ ] **Step 6: Verify**

Run: `npm run preflight && npm run build`

Expected: em-dash count drops substantially. Numbered-eyebrow violations are gone with the services section.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: agency-anchored narrative, drop services section"
```

---

## Task 8: Sticky method section

**Files:**
- Create: `components/method/steps.ts`, `components/method/StickyMethod.tsx`, `components/method/ScreenPanel.tsx`, `components/method/AuthorityPanel.tsx`, `app/styles/method.css`
- Modify: `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Define the step data**

Create `components/method/steps.ts`:

```ts
export type Step = {
  id: string;
  label: string;
  headline: string;
  body: string;
  shot?: { src: string; alt: string; width: number; height: number };
};

export const STEPS: Step[] = [
  {
    id: "measure",
    label: "Measure",
    headline: "See exactly where AI leaves you out.",
    body: "We don't check a handful of generic prompts. We build the real set of buying intents for your business, test each one across multiple phrasings, and run them through ChatGPT, Claude, Gemini and Perplexity. Every answer is recorded three ways: whether you were named, whether you were actually cited with a link, and how strongly you were positioned, from a passing mention up to the primary recommendation. Your named competitors run through the identical set, so you finish with a per-engine map of every intent where they get named and you don't.",
    shot: {
      src: "/dashboard/measure.webp",
      alt: "Victory Velocity dashboard showing per-intent mention and citation rates across four AI engines with competitor comparison",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "fix",
    label: "Fix",
    headline: "Clear what stops AI reading your site.",
    body: "Twenty-six deterministic checks against your site, starting with whether the seven major AI crawlers are even allowed in: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended and CCBot. Then sitemaps, schema markup, meta titles and descriptions, canonicals, HTTPS and mixed content, broken links, image alt text, and page speed. Findings group into action cards with a risk rating and exact step-by-step instructions for your platform. Nothing applies itself. You approve it, we apply it, then we re-run the audit to prove it's fixed.",
    shot: {
      src: "/dashboard/fix.webp",
      alt: "Technical audit tab showing grouped action cards with risk ratings and approval status",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "authority",
    label: "Build authority",
    headline: "Get named where the models look.",
    body: "This part is us, not software. We take the specific intents where your competitors get named and you don't, then build your presence in the places those answers are drawn from: the directories, publications, comparison pages and communities the models pull from for your category. Every placement is chosen against a gap we measured, not a generic list.",
  },
  {
    id: "rerun",
    label: "Re-run",
    headline: "Prove it moved, then go again.",
    body: "We re-run the full measurement and the audit on a cycle. You see visibility movement per intent and per category, where you now sit against each competitor, which fixes were applied and verified, and which regressed. Then we pick the next set of gaps with you.",
    shot: {
      src: "/dashboard/rerun.webp",
      alt: "Run history comparing two measurement cycles and the visibility movement between them",
      width: 1600,
      height: 1000,
    },
  },
];
```

- [ ] **Step 2: Build the screenshot frame**

Create `components/method/ScreenPanel.tsx`:

```tsx
import Image from "next/image";
import type { Step } from "./steps";

export function ScreenPanel({ shot }: { shot: NonNullable<Step["shot"]> }) {
  return (
    <div className="screen-panel">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(max-width: 900px) 100vw, 55vw"
      />
    </div>
  );
}
```

- [ ] **Step 3: Build the authority panel**

Create `components/method/AuthorityPanel.tsx`:

```tsx
export function AuthorityPanel() {
  return (
    <div className="authority-panel">
      <p className="authority-quote">
        The only step a machine doesn&apos;t do.
      </p>
      <p className="authority-note">
        Chosen against a measured gap, not a generic list.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Build the sticky shell**

Create `components/method/StickyMethod.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { STEPS } from "./steps";
import { ScreenPanel } from "./ScreenPanel";
import { AuthorityPanel } from "./AuthorityPanel";

function panelFor(index: number) {
  const step = STEPS[index];
  return step.shot ? <ScreenPanel shot={step.shot} /> : <AuthorityPanel />;
}

export function StickyMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section className="method" id="method" ref={sectionRef}>
      <div className="wrap method-head">
        <h2 className="rv">How we work.</h2>
      </div>

      <div className="wrap method-grid">
        <div className="method-copy">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`method-step${index === active ? " active" : ""}`}
            >
              <div className="method-label">{step.label}</div>
              <h3>{step.headline}</h3>
              <p>{step.body}</p>
              <div className="method-step-visual">{panelFor(index)}</div>
            </div>
          ))}
        </div>

        <div className="method-visual" aria-hidden="true">
          <div className="method-visual-inner">{panelFor(active)}</div>
        </div>
      </div>
    </section>
  );
}
```

The panel renders twice by design: `.method-step-visual` is the mobile copy and is hidden above 900px; `.method-visual` is the sticky desktop copy and is hidden below 900px. Only one is ever visible, and the sticky one is `aria-hidden` so screen readers get the images exactly once.

- [ ] **Step 5: Style it**

Create `app/styles/method.css`:

```css
.method { background: var(--ink-soft); padding: 150px 0; }

.method-head h2 {
  font-family: var(--serif); font-weight: 400;
  font-size: clamp(34px, 4.4vw, 58px); line-height: 1.02;
  letter-spacing: -0.02em; margin: 0 0 72px;
}

.method-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}

.method-step { padding: 18vh 0; }
.method-step:first-child { padding-top: 0; }
.method-step:last-child { padding-bottom: 0; }

.method-label {
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  letter-spacing: 0.1em; color: var(--faint); margin-bottom: 14px;
}
.method-step h3 {
  font-family: var(--serif); font-weight: 400;
  font-size: clamp(28px, 3.2vw, 44px); line-height: 1.06;
  letter-spacing: -0.02em; margin: 0 0 20px;
}
.method-step p {
  font-size: 18.5px; line-height: 1.65; color: var(--mute);
  margin: 0; max-width: 46ch;
}

.method-step { opacity: 0.42; transition: opacity .5s ease; }
.method-step.active { opacity: 1; }

.method-visual { position: sticky; top: 140px; }
.method-step-visual { display: none; }

.screen-panel {
  border: 1px solid var(--hair);
  border-radius: 12px;
  overflow: hidden;
  background: var(--ink-2);
  box-shadow: 0 40px 90px -40px rgba(0,0,0,0.8);
}
.screen-panel img { width: 100%; height: auto; display: block; }

.authority-panel {
  border: 1px solid var(--hair);
  border-radius: 12px;
  background: var(--ink-2);
  padding: clamp(40px, 6vw, 72px);
  display: flex; flex-direction: column; justify-content: center;
  min-height: 320px;
}
.authority-quote {
  font-family: var(--serif); font-style: italic;
  font-size: clamp(26px, 3vw, 40px); line-height: 1.25;
  color: var(--white); margin: 0 0 20px;
}
.authority-note {
  font-family: var(--sans); font-size: 13px; letter-spacing: 0.06em;
  color: var(--faint); margin: 0;
}

@media (max-width: 900px) {
  .method { padding: 96px 0; }
  .method-grid { grid-template-columns: 1fr; gap: 0; }
  .method-visual { display: none; }
  .method-step-visual { display: block; margin-top: 32px; }
  .method-step { padding: 0 0 72px; opacity: 1; }
  .method-step p { max-width: none; }
}

@media (prefers-reduced-motion: reduce) {
  .method-step { transition: none; opacity: 1; }
}
```

- [ ] **Step 6: Import and mount**

Add `@import "./styles/method.css";` beneath the nav import at the top of `app/globals.css`. In `app/page.tsx`, render `<StickyMethod />` after `<AgencyAnchor />`.

- [ ] **Step 7: Add placeholder images**

The real screenshots are not available yet (see Task 12). To keep the build green and the layout correct, create three placeholder files at exactly 1600x1000 so `next/image` reserves the right space and CLS stays at zero:

```bash
mkdir -p public/dashboard
```

Generate three solid dark placeholders sized 1600x1000 named `measure.webp`, `fix.webp`, and `rerun.webp`. If ImageMagick is available:

```bash
for name in measure fix rerun; do
  magick -size 1600x1000 xc:'#19191c' "public/dashboard/$name.webp"
done
```

If it is not available, use any 1600x1000 image; Task 12 replaces them.

- [ ] **Step 8: Verify**

Run: `npm run build && npm run dev`

Manual checks at 1440px:
- Scrolling the method section pins the right column while the copy scrolls.
- The active step brightens as it reaches the middle of the viewport; the others dim.
- The panel swaps at each step boundary without flicker.
- Step three shows the typographic authority panel, not an image.

At 375px:
- The sticky column is entirely absent.
- Each step renders copy followed by its own visual, stacked.
- No horizontal overflow.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scroll-driven method section"
```

---

## Task 9: FAQ page and teaser

**Files:**
- Create: `app/faq/page.tsx`, `components/sections/FaqTeaser.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx`, `app/sitemap.ts`

- [ ] **Step 1: Write the question set**

Create `app/faq/page.tsx`. Every answer must stay inside the spec's Grounding section. No em-dashes.

```tsx
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "FAQ | Victory Velocity",
  description:
    "How Victory Velocity measures AI visibility, audits your site, builds authority, and proves movement. Common questions answered.",
  alternates: { canonical: "https://www.victoryvelocity.ca/faq" },
};

const FAQS = [
  {
    q: "What does Victory Velocity actually do?",
    a: "We get your brand named when someone asks an AI engine for a recommendation in your category. That means measuring where you currently stand, fixing what stops AI engines reading your site, building your presence in the places those answers draw from, and re-running the whole thing on a cycle so you can see it move.",
  },
  {
    q: "How is this different from SEO?",
    a: "SEO competes for a position in a list of links. We compete to be inside a single generated answer. The work overlaps in places, because a site AI engines cannot read will not get cited either, but the target is different: not a ranking, a mention.",
  },
  {
    q: "Which AI engines do you measure?",
    a: "ChatGPT, Claude, Gemini and Perplexity. Every intent we test runs through all four, so you can see where you are strong on one engine and invisible on another.",
  },
  {
    q: "How do you decide what to test?",
    a: "We build the real set of buying intents for your business rather than guessing at prompts. Each intent is tested across several different phrasings, because people don't all ask the same question the same way, and engines don't answer every phrasing identically.",
  },
  {
    q: "What counts as being visible?",
    a: "Three separate things, tracked separately. Whether you were mentioned at all. Whether you were cited with an actual link to your site. And how strongly you were positioned, which we grade from a passing mention up to being the primary recommendation. A brand can be mentioned often and cited never, and that gap tells us what to work on.",
  },
  {
    q: "What is in the technical audit?",
    a: "Twenty-six deterministic checks. It starts with whether the seven major AI crawlers are allowed to read your site at all: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended and CCBot. Then sitemaps, schema markup, meta titles and descriptions, canonicals, HTTPS and mixed content, broken links, image alt text, and page speed.",
  },
  {
    q: "Do you make changes to my site yourself?",
    a: "Not automatically. Findings become action cards with a risk rating and exact step-by-step instructions for your platform. You approve the ones you want, we apply them, and then we re-run the audit to verify the fix actually landed. Nothing changes on your site without your say-so.",
  },
  {
    q: "How do you prove anything actually improved?",
    a: "Re-measurement. Because we re-run the same intents against the same engines on a cycle, movement is measured rather than asserted. You see visibility change per intent and per category, your position against each competitor, and which fixes were verified. If something regressed, that shows up too.",
  },
  {
    q: "How fast should I expect results?",
    a: "Slower than paid, and less predictable than traditional SEO. AI engines refresh what they retrieve on their own schedules, so movement arrives in weeks rather than days. What we can promise is that you will always know exactly where you stand, because we measure continuously rather than reporting a guess.",
  },
  {
    q: "How do I reach you?",
    a: "You get a shared channel with us and you can drop a question in it whenever one comes up. When something is too tangled to explain over text, we get on a call. The people answering are the people doing the work.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your website, the competitors you actually care about, and half an hour to talk through how customers describe what you sell. We build the intent set from that and run the first measurement.",
  },
  {
    q: "Do you still run ChatGPT Ads?",
    a: "Yes, as a separate engagement. It is not part of the visibility work described here. If you want to talk about paid placement inside AI assistants, mention it when you get in touch.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Faq() {
  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="faq sec-pad" style={{ paddingTop: 150 }}>
        <div className="wrap">
          <h1 className="faq-heading">Questions.</h1>
          <div className="faq-list">
            {FAQS.map(({ q, a }, index) => (
              <details key={index} className="faq-item">
                <summary>
                  <span className="faq-q">{q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Build the teaser**

Create `components/sections/FaqTeaser.tsx` showing the first five questions and linking onward:

```tsx
import Link from "next/link";

const TEASER = [
  {
    q: "How is this different from SEO?",
    a: "SEO competes for a position in a list of links. We compete to be inside a single generated answer.",
  },
  {
    q: "Which AI engines do you measure?",
    a: "ChatGPT, Claude, Gemini and Perplexity. Every intent runs through all four.",
  },
  {
    q: "Do you make changes to my site yourself?",
    a: "Not automatically. You approve each fix, we apply it, then we re-run the audit to verify it landed.",
  },
  {
    q: "How do you prove anything improved?",
    a: "Re-measurement against the same intents and engines, so movement is measured rather than asserted.",
  },
  {
    q: "How do I reach you?",
    a: "A shared channel you can use any time, and a call whenever something needs walking through.",
  },
];

export function FaqTeaser() {
  return (
    <section className="faq sec-pad">
      <div className="wrap">
        <h2 className="faq-heading rv">Questions.</h2>
        <div className="faq-list">
          {TEASER.map(({ q, a }, index) => (
            <details key={index} className="faq-item rv">
              <summary>
                <span className="faq-q">{q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p className="faq-body">{a}</p>
            </details>
          ))}
        </div>
        <Link href="/faq" className="faq-more">Read all questions</Link>
      </div>
    </section>
  );
}
```

Add to `app/globals.css`:

```css
.faq-more {
  display: inline-block; margin-top: 40px;
  font-family: var(--sans); font-size: 13px; font-weight: 500;
  letter-spacing: 0.06em; color: var(--mute);
  border-bottom: 1px solid var(--ghost); padding-bottom: 4px;
  transition: color .25s, border-color .25s;
}
.faq-more:hover { color: var(--white); border-color: var(--white); }
```

- [ ] **Step 3: Swap the homepage FAQ**

In `app/page.tsx`, delete the entire inline `<section className="faq sec-pad">` block and render `<FaqTeaser />` in its place.

- [ ] **Step 4: Move the schema off every page**

In `app/layout.tsx`, delete the `FAQPage` object from the `@graph` array. It currently applies sitewide, which is incorrect; it now lives only on `/faq`.

- [ ] **Step 5: Add the route to the sitemap**

In `app/sitemap.ts`, add after the homepage entry:

```ts
    {
      url: 'https://www.victoryvelocity.ca/faq',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
```

- [ ] **Step 6: Verify**

Run: `npm run build && npm run dev`

Expected: `/faq` renders with the nav, twelve accordions, and correct typography. View source and confirm exactly one `FAQPage` block, on `/faq` only. Confirm the homepage no longer emits `FAQPage`. Paste the `/faq` source into the Google Rich Results test and confirm the FAQ schema validates.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: dedicated FAQ page with schema, teaser on home"
```

---

## Task 10: Purge remaining em-dashes and go green

**Files:**
- Modify: `app/about/page.tsx`, `app/blog/page.tsx`, `app/blog/the-biggest-shift-in-marketing-since-google-ads/page.tsx`, `components/ServiceVisuals.tsx`, and any residual hits

- [ ] **Step 1: Find what's left**

Run: `npm run preflight`

- [ ] **Step 2: Rewrite each hit**

For every reported line, restructure the sentence rather than swapping the character for a hyphen. Use a period, a comma, a colon, or parentheses depending on the clause. Two short sentences almost always read better than one em-dash sentence.

The footer tagline at `app/page.tsx` and the blog prose are the largest clusters. Preserve meaning and voice; only the punctuation and sentence shape change.

- [ ] **Step 3: Verify green**

Run: `npm run preflight`

Expected: `preflight: clean (N files scanned)`, exit code 0.

Run: `npm run build`

Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "style: remove all em-dashes sitewide"
```

---

## Task 11: SEO surface rewrite

**Files:**
- Modify: `app/layout.tsx`, `public/llms.txt`

- [ ] **Step 1: Rewrite metadata**

In `app/layout.tsx`, replace the `metadata` export:

```tsx
export const metadata: Metadata = {
  title: "Victory Velocity | Be the answer, everywhere they ask.",
  description:
    "A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity. We measure where you stand, fix what blocks AI engines, build your authority, and prove the movement.",
  metadataBase: new URL("https://www.victoryvelocity.ca"),
  openGraph: {
    title: "Victory Velocity | Be the answer, everywhere they ask.",
    description:
      "A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity.",
    url: "https://www.victoryvelocity.ca",
    siteName: "Victory Velocity",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victory Velocity | Be the answer, everywhere they ask.",
    description:
      "A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity.",
  },
  alternates: { canonical: "https://www.victoryvelocity.ca" },
  other: { "msvalidate.01": "B51F27CD7C8EA461EAA0CD6AFC3B7246" },
};
```

- [ ] **Step 2: Rewrite the service graph**

Replace the three `Service` entries (GEO, ChatGPT Ads, Weekly Tracking) with two that match the method. Delete the ChatGPT Ads entry entirely.

```tsx
    {
      "@type": "Service",
      "name": "AI Visibility Measurement",
      "description": "We build the real set of buying intents for your business, test each across multiple phrasings, and measure them against ChatGPT, Claude, Gemini and Perplexity. We record whether your brand is mentioned, whether it is cited with a link, and how strongly it is positioned, alongside the same measurement for your named competitors.",
      "provider": { "@id": "https://www.victoryvelocity.ca/#organization" },
      "areaServed": "Worldwide",
      "url": "https://www.victoryvelocity.ca/#method",
    },
    {
      "@type": "Service",
      "name": "AI Technical Site Audit",
      "description": "Twenty-six deterministic checks covering AI crawler access, sitemaps, schema markup, metadata, canonicals, HTTPS, links, images and page speed. Findings become reviewable action cards with platform-specific instructions, applied only on approval and verified by re-audit.",
      "provider": { "@id": "https://www.victoryvelocity.ca/#organization" },
      "areaServed": "Worldwide",
      "url": "https://www.victoryvelocity.ca/#method",
    },
```

Also update the `Organization` `description` to match the new metadata description.

- [ ] **Step 3: Rewrite llms.txt**

Replace `public/llms.txt` with content describing the four-step method, the four engines, the twenty-six checks, the approve-apply-verify lifecycle, and the reachability anchor. Update the `## Services` section to the two services above. Add `/faq` under Key Information. Remove all ChatGPT Ads claims. No em-dashes.

- [ ] **Step 4: Verify**

Run: `npm run preflight && npm run build`

Expected: both pass. View homepage source and confirm the `@graph` contains `WebSite`, `Organization`, and exactly two `Service` entries, with no `FAQPage`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: align metadata, schema and llms.txt with new narrative"
```

---

## Task 12: Swap in real dashboard screenshots

**Blocked on the user.** Everything above ships without this; the placeholders hold correct layout in the meantime.

**Files:**
- Replace: `public/dashboard/measure.webp`, `fix.webp`, `rerun.webp`
- Possibly modify: `components/method/steps.ts` (dimensions only)

- [ ] **Step 1: Collect the screenshots**

Three exports from the vvAgentSystem dashboard, client names and domains blurred or swapped for a demo client:

1. `measure.webp` from client detail, Queries tab: per-intent mention and citation rates with competitor comparison visible.
2. `fix.webp` from client detail, Audit tab: grouped action cards showing risk ratings, ideally one approved and one pending.
3. `rerun.webp` from client detail, Runs or Overview: two cycles and the movement between them.

Export at 2x for retina, roughly 16:10, WebP preferred.

- [ ] **Step 2: Drop them in and correct the dimensions**

Place the files in `public/dashboard/`. If the real dimensions differ from 1600x1000, update the matching `width` and `height` in `components/method/steps.ts`. These must be the true pixel dimensions or `next/image` will reserve the wrong space and CLS will regress.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run dev`

Expected: real screenshots render inside the framed panels. Check at 1440px and 375px that nothing overflows and the text in the screenshots is legible at rendered size. If text is unreadable on mobile, crop the screenshot tighter rather than scaling it down.

Run Lighthouse on the homepage. Confirm CLS is below 0.1 and LCP is below 2.5s.

- [ ] **Step 4: Commit**

```bash
git add public/dashboard components/method/steps.ts
git commit -m "feat: real dashboard screenshots in method section"
```

---

## Task 13: Motion layer

Deliberately last, per the user's sequencing. If any of this proves fragile, the site is already complete and shippable without it.

**Files:**
- Modify: `components/method/StickyMethod.tsx`, `components/method/ScreenPanel.tsx`, `components/method/AuthorityPanel.tsx`

- [ ] **Step 1: Cross-fade the sticky panel**

In `StickyMethod.tsx`, wrap the sticky panel in `AnimatePresence` keyed by the active step:

```tsx
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// inside the component:
const reduce = useReducedMotion();

// replace .method-visual-inner with:
<AnimatePresence mode="wait">
  <motion.div
    key={STEPS[active].id}
    className="method-visual-inner"
    initial={reduce ? false : { opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={reduce ? undefined : { opacity: 0, y: -12 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
  >
    {panelFor(active)}
  </motion.div>
</AnimatePresence>
```

Justification, per the motion-motivated rule: the panel transition communicates state change, tying the visual to the step being read.

- [ ] **Step 2: Reveal the authority panel text on entry**

In `AuthorityPanel.tsx`, convert the two paragraphs to `motion.p` with `whileInView`, `viewport={{ once: true, amount: 0.4 }}`, and a 0.08s stagger delay on the second. Gate `initial` behind `useReducedMotion()` exactly as above. Justification: storytelling, revealing the claim before the qualifier.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run dev`

Expected at 1440px: the panel cross-fades on step change with no flash of empty space and no layout shift. At 375px: no `AnimatePresence` behaviour is visible because the sticky column is hidden.

Enable "Reduce motion" and confirm: panels swap instantly with no fade, the authority text is visible immediately, and the marquee highlight is static.

- [ ] **Step 4: Run the full pre-flight**

Work through the taste skill's Section 14 checklist against the finished site. Pay particular attention to: zero em-dashes (`npm run preflight`), eyebrow count at or under `ceil(sectionCount / 3)`, no two sections sharing a layout family, no three consecutive image-plus-text splits, nav on one line under 80px, every CTA label on one line, and no duplicate CTA intent across nav, hero, and footer.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: motion layer for method section"
```

---

## Self-review notes

**Spec coverage.** Every section of the spec maps to a task: hamburger to Task 4, marquee to Task 5, narrative and agency anchor to Task 7, four-step method to Task 8, FAQ page to Task 9, structural cleanup to Tasks 3 and 6, SEO and schema to Task 11, screenshots to Task 12, motion to Task 13. The taste audit table maps as follows: em-dashes to Tasks 7 and 10, scroll listener to Task 4, `next/font` to Task 2, numbered eyebrows to Task 7, filled progress track deleted with `ServiceVisuals` cleanup in Task 7, `lucide-react` to Task 3, div-built product UI to Tasks 8 and 12.

**Known gap, deliberate.** `GEOVisual` and `WeeklyReportVisual` survive in `ServiceVisuals.tsx` but are no longer rendered anywhere after Task 7. They are left in place rather than deleted because they are the fallback if the screenshots in Task 12 never arrive. If Task 12 completes, delete `components/ServiceVisuals.tsx` entirely along with the `mk-chat` and `mk-report` CSS blocks, and add that as a cleanup commit.

**Naming consistency.** `STEPS`, `Step`, `step.shot`, `panelFor`, and `active` are used identically in Tasks 8 and 13. The `NavLink` type is defined in `MobileDrawer.tsx` and imported by `SiteNav.tsx`; it is not redefined.
