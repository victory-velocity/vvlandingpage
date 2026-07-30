"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A dense mesh of points that ripples as one sheet.
 *
 * Each column is a narrow strip carrying a repeating dot pattern as a
 * background, rather than a stack of individual elements. That keeps the mesh
 * tight enough to read as fabric while the DOM stays at one node per column
 * instead of thousands. Columns run the same bob on a staggered delay, so the
 * offset travels across and the sheet moves as a single surface.
 *
 * Motivation, per the project's motion rules: the sheet gives the quiet
 * sections a live surface under the copy, and the ripple carries the eye in the
 * reading direction. It sits near the threshold of visibility so it never
 * competes with the type.
 *
 * Only transform animates, and the ripple is a CSS keyframe rather than a JS
 * loop, so the whole sheet stays on the compositor.
 */

const COLUMNS = 120;
/** Seconds between neighbouring columns. Sets how fast the ripple travels. */
const STAGGER = 0.045;

export function DotField({ seed = 1 }: { seed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [34, -34]);

  return (
    <div className="dot-field" ref={ref} aria-hidden="true">
      <motion.div style={{ position: "absolute", inset: 0, y: reduce ? 0 : drift }}>
        {Array.from({ length: COLUMNS }, (_, col) => (
          <div
            key={col}
            className="dot-col"
            style={{
              left: `${(col / COLUMNS) * 100}%`,
              width: `${100 / COLUMNS}%`,
              // Negative delay starts each column mid-cycle, so the ripple is
              // already formed on first paint instead of building from flat.
              animationDelay: reduce ? undefined : `${-(col * STAGGER + seed * 0.9)}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
