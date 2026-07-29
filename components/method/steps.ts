export type Step = {
  id: string;
  label: string;
  headline: string;
  body: string;
  /** A real dashboard capture. Steps without one render `panel` instead. */
  shot?: { src: string; alt: string; width: number; height: number };
  /** Typographic panel, for steps with no product surface to capture. */
  panel?: { quote: string; note: string };
};

export const STEPS: Step[] = [
  {
    id: "measure",
    label: "Measure",
    headline: "See exactly where AI leaves you out.",
    body: "We don't check a handful of generic prompts. We build the real set of buying intents for your business, test each one across multiple phrasings, and run them through ChatGPT, Claude, Gemini and Perplexity. Every answer is recorded three ways: whether you were named, whether you were actually cited with a link, and how strongly you were positioned, from a passing mention up to the primary recommendation. Your named competitors run through the identical set, so you finish with a per-engine map of every intent where they get named and you don't.",
    shot: {
      src: "/dashboard/measure.jpg",
      alt: "Victory Velocity dashboard showing per-intent mention and citation rates with stability and top competitor columns",
      width: 1456,
      height: 829,
    },
  },
  {
    id: "fix",
    label: "Fix",
    headline: "Clear what stops AI reading your site.",
    body: "We run a deterministic audit across your whole site, page by page. It starts with whether the seven major AI crawlers are even allowed in: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended and CCBot. Then sitemaps, schema markup, meta titles and descriptions, canonicals, HTTPS and mixed content, broken links, image alt text, and page speed. On a recent client site that came to 222 individual checks. Findings group into action cards with a risk rating and exact step-by-step instructions for your platform. Nothing applies itself. You approve it, we apply it, then we re-run the audit to prove it's fixed.",
    shot: {
      src: "/dashboard/fix.jpg",
      alt: "Technical audit showing a 222-check summary, status counts, and grouped findings with pass and fail badges",
      width: 1456,
      height: 829,
    },
  },
  {
    id: "authority",
    label: "Build authority",
    headline: "Get named where the models look.",
    body: "This part is us, not software. We take the specific intents where your competitors get named and you don't, then build your presence in the places those answers are drawn from: the directories, publications, comparison pages and communities the models pull from for your category. Every placement is chosen against a gap we measured, not a generic list.",
    panel: {
      quote: "The only step a machine doesn't do.",
      note: "Chosen against a measured gap, not a generic list.",
    },
  },
  {
    id: "rerun",
    label: "Re-run",
    headline: "Prove it moved, then go again.",
    body: "We re-run the full measurement and the audit on a cycle. You see visibility movement per intent and per category, where you now sit against each competitor, which fixes were applied and verified, and which regressed. Then we pick the next set of gaps with you.",
    // No shot: as of 2026-07-29 no client has two completed cycles, so there is no
    // real movement to screenshot. Renders the typographic panel instead.
    panel: {
      quote: "Measured, not asserted.",
      note: "The same intents, the same engines, run again.",
    },
  },
];
