"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A small, dense patch of points that ripples as one sheet, placed in the empty
 * area of a section rather than behind the copy.
 *
 * Each column is a narrow strip carrying a repeating dot pattern as a
 * background instead of a stack of elements, which keeps the weave tight
 * without putting thousands of nodes in the DOM. Columns run the same bob on a
 * staggered delay, so the offset travels across and the patch moves as one
 * surface.
 *
 * Motivation, per the project's motion rules: it gives an otherwise flat
 * section a live surface to sit against, and it occupies negative space that
 * would otherwise read as unfinished. It is deliberately small and quiet so it
 * never competes with the type.
 *
 * Only transform animates, and the ripple is a CSS keyframe rather than a JS
 * loop, so the patch stays on the compositor.
 */

const COLUMNS = 46;
/** Seconds between neighbouring columns. Sets how fast the ripple travels. */
const STAGGER = 0.055;

export function DotField({
  variant,
  seed = 1,
}: {
  variant: "shift" | "anchor";
  seed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <div className={`mesh mesh-${variant}`} ref={ref} aria-hidden="true">
      <motion.div style={{ position: "absolute", inset: 0, y: reduce ? 0 : drift }}>
        {Array.from({ length: COLUMNS }, (_, col) => (
          <div
            key={col}
            className="mesh-col"
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
