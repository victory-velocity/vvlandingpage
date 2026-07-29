"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Step } from "./steps";

export function AuthorityPanel({ panel }: { panel: NonNullable<Step["panel"]> }) {
  const reduce = useReducedMotion();

  // Storytelling: the claim lands before its qualifier.
  const reveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="authority-panel">
      <motion.p className="authority-quote" {...reveal(0)}>
        {panel.quote}
      </motion.p>
      <motion.p className="authority-note" {...reveal(0.08)}>
        {panel.note}
      </motion.p>
    </div>
  );
}
