# Sound Elite Theatres Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Sound Elite Theatres testimonial attribution into a polished external link with an underline and northeast arrow.

**Architecture:** Keep the feature local to the existing `Shift` section. Add semantic external-link markup in the component and narrowly scoped interaction styles in the global stylesheet. Add a source-level regression test because this project has no component test framework.

**Tech Stack:** Next.js 14, React 18, TypeScript, CSS, Node.js test runner

## Global Constraints

- Link to `https://soundelitetheatres.com/`.
- Open the destination in a new tab with `rel="noopener noreferrer"`.
- Keep the entire name and arrow inside one clickable target.
- Preserve the existing serif typography and muted attribution color.
- Use an underlined “Sound Elite Theatres” label followed by `↗`.
- Add hover, keyboard-focus, reduced-motion, and narrow-screen support.
- Add no new runtime dependency.

---

### Task 1: Linked Testimonial Attribution

**Files:**
- Create: `tests/sound-elite-link.test.mjs`
- Modify: `components/sections/Shift.tsx:27-31`
- Modify: `app/globals.css:157-163`

**Interfaces:**
- Consumes: The existing `Shift` component and global color and font variables.
- Produces: A `.testimonial-link` external anchor containing `.testimonial-link-arrow`.

- [ ] **Step 1: Write the failing regression test**

Create `tests/sound-elite-link.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const shift = readFileSync("components/sections/Shift.tsx", "utf8");
const css = readFileSync("app/globals.css", "utf8");

test("Sound Elite attribution links safely to the client website", () => {
  assert.match(shift, /href="https:\/\/soundelitetheatres\.com\/"/);
  assert.match(shift, /target="_blank"/);
  assert.match(shift, /rel="noopener noreferrer"/);
  assert.match(shift, /className="testimonial-link"/);
  assert.match(shift, /className="testimonial-link-arrow"/);
  assert.match(shift, /aria-hidden="true">↗<\/span>/);
});

test("Sound Elite link has interaction and accessibility styles", () => {
  assert.match(css, /\.testimonial-link\s*\{/);
  assert.match(css, /text-decoration:\s*underline/);
  assert.match(css, /\.testimonial-link:hover/);
  assert.match(css, /\.testimonial-link:focus-visible/);
  assert.match(css, /\.testimonial-link-arrow/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
```

- [ ] **Step 2: Run the test and confirm the expected failure**

Run: `node --test tests/sound-elite-link.test.mjs`

Expected: FAIL because the testimonial does not yet contain the Sound Elite anchor or its styles.

- [ ] **Step 3: Add the semantic external link**

Replace the existing attribution in `components/sections/Shift.tsx` with:

```tsx
<cite>
  &mdash;{" "}
  <a
    href="https://soundelitetheatres.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="testimonial-link"
  >
    Sound Elite Theatres
    <span className="testimonial-link-arrow" aria-hidden="true">↗</span>
  </a>
</cite>
```

- [ ] **Step 4: Add the link treatment**

Add after the existing `.shift .big cite` rule in `app/globals.css`:

```css
.testimonial-link {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
  white-space: nowrap;
  transition: color 0.25s ease;
}
.testimonial-link:hover { color: var(--white); }
.testimonial-link:focus-visible {
  color: var(--white);
  outline: 1px solid currentColor;
  outline-offset: 4px;
}
.testimonial-link-arrow {
  display: inline-block;
  margin-left: 0.24em;
  text-decoration: none;
  transition: transform 0.25s ease;
}
.testimonial-link:hover .testimonial-link-arrow {
  transform: translate(0.12em, -0.12em);
}
```

Inside the existing `@media (prefers-reduced-motion: reduce)` rule, add:

```css
.testimonial-link-arrow { transition: none; }
.testimonial-link:hover .testimonial-link-arrow { transform: none; }
```

- [ ] **Step 5: Run focused and project verification**

Run: `node --test tests/sound-elite-link.test.mjs`

Expected: 2 tests pass and 0 tests fail.

Run: `npm run preflight`

Expected: Exit 0 with `preflight: clean`.

Run: `npm run build`

Expected: Exit 0 with a successful production build.

- [ ] **Step 6: Inspect the rendered result**

Run: `npm run dev`

Open the homepage at desktop and mobile widths. Confirm the link uses the testimonial font, remains legible when wrapping, shows the underline and arrow, exposes a visible keyboard focus ring, and opens the Sound Elite website in a new tab.

- [ ] **Step 7: Commit the implementation**

```bash
git add tests/sound-elite-link.test.mjs components/sections/Shift.tsx app/globals.css
git commit -m "feat: link Sound Elite testimonial"
```
