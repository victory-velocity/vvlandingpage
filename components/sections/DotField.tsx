"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A lattice of points that moves as one surface. Each column bobs on the same
 * animation with a staggered delay, so the offset sweeps across the field and
 * reads as a single travelling wave rather than scattered specks. Scrolling
 * drifts the whole field, so it responds to the reader as well as to time.
 *
 * Motivation, per the project's motion rules: the wave gives the quiet sections
 * a sense of a live surface underneath the copy, and the sweep carries the eye
 * in the reading direction. It sits deliberately near the threshold of
 * visibility so it never competes with the type.
 *
 * Only transform and opacity animate, and the sweep is a CSS keyframe rather
 * than a JS loop, so the whole field stays on the compositor. Scroll response
 * uses a motion value, never a scroll listener.
 */

const COLUMNS = 30;
const ROWS = 6;
/** Seconds of delay between neighbouring columns. Sets the wave's speed. */
const STAGGER = 0.13;

export function DotField({ seed = 1 }: { seed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div className="dot-field" ref={ref} aria-hidden="true">
      <motion.div
        style={{ position: "absolute", inset: 0, y: reduce ? 0 : drift }}
      >
        {Array.from({ length: COLUMNS }, (_, col) => (
          <div
            key={col}
            className="dot-col"
            style={{
              left: `${((col + 0.5) / COLUMNS) * 100}%`,
              // Negative delay starts every column mid-cycle, so the wave is
              // already formed on first paint instead of building from flat.
              animationDelay: reduce ? undefined : `${-(col * STAGGER + seed * 0.7)}s`,
              animationPlayState: reduce ? "paused" : undefined,
            }}
          >
            {Array.from({ length: ROWS }, (_, row) => (
              <span
                key={row}
                className="dot"
                style={{
                  top: `${((row + 0.5) / ROWS) * 100}%`,
                  // Rows fade toward the edges so the field has a soft horizon
                  // rather than a hard rectangular boundary.
                  opacity: 0.1 + Math.sin(((row + 0.5) / ROWS) * Math.PI) * 0.16,
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
