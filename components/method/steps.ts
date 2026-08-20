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
    body: "We test real buyer questions across every major engine, then map exactly where competitors get named instead of you.",
  },
  {
    id: "fix",
    label: "Fix",
    headline: "Fix what's blocking AI from your site.",
    body: "A full technical audit, starting with whether AI crawlers can even reach you. Nothing changes until you approve it.",
  },
  {
    id: "authority",
    label: "Build authority",
    headline: "Get mentioned where AI actually looks.",
    body: "We build your presence on the sites AI pulls its answers from, chosen from the gaps we measured, not a generic list.",
  },
  {
    id: "rerun",
    label: "Re-run",
    headline: "Prove what changed, cycle after cycle.",
    body: "We repeat the cycle so progress is measured, not assumed. You see what improved, what slipped, and what's next.",
  },
];
