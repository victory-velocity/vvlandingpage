export type Step = {
  id: string;
  label: string;
  headline: string;
  body: string;
};

export const STEPS: Step[] = [
  {
    id: "measure",
    label: "Measure",
    headline: "See exactly where AI leaves you out.",
    body: "We test the real questions your buyers ask, across every phrasing, through ChatGPT, Claude, Gemini and Perplexity. You get a per-engine map of where competitors get named and you don't.",
  },
  {
    id: "fix",
    label: "Fix",
    headline: "Clear what stops AI reading your site.",
    body: "A deterministic audit of your whole site, starting with whether AI crawlers are even allowed in. Every finding comes with exact instructions, and nothing changes until you approve it.",
  },
  {
    id: "authority",
    label: "Build authority",
    headline: "Get named where the models look.",
    body: "This part is us, not software. We build your presence in the places those answers are drawn from, chosen against the gaps we measured rather than a generic list.",
  },
  {
    id: "rerun",
    label: "Re-run",
    headline: "Prove it moved, then go again.",
    body: "We run the whole thing again on a cycle, so movement is measured rather than asserted. You see what improved, what regressed, and what we go after next.",
  },
];
