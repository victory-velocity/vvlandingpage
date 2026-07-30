"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Sparse parallax point field for the quieter sections.
 *
 * Motivation, per the project's motion rules: the points read as the field of
 * questions being asked, and the parallax gives an otherwise flat section depth
 * as the reader moves through it. It is atmosphere, deliberately near the
 * threshold of visibility, not decoration competing with the copy.
 *
 * Driven by useScroll motion values rather than a scroll listener, and animates
 * only transform and opacity so it stays on the compositor.
 */

type LayerSpec = {
  count: number;
  size: number;
  opacity: number;
  /** Pixels of parallax travel across the section. Nearer layers move more. */
  shift: number;
};

const LAYERS: LayerSpec[] = [
  { count: 20, size: 1.5, opacity: 0.1, shift: 36 },
  { count: 13, size: 2, opacity: 0.16, shift: 74 },
  { count: 7, size: 3, opacity: 0.24, shift: 124 },
];

/** Deterministic, so the server and client render identical markup. */
function noise(seed: number) {
  const v = Math.sin(seed * 127.1) * 43758.5453;
  return v - Math.floor(v);
}

function Layer({
  progress,
  spec,
  offset,
  still,
}: {
  progress: MotionValue<number>;
  spec: LayerSpec;
  offset: number;
  still: boolean;
}) {
  const y = useTransform(progress, [0, 1], [spec.shift, -spec.shift]);

  return (
    <motion.div
      style={{ position: "absolute", inset: 0, y: still ? 0 : y }}
      aria-hidden="true"
    >
      {Array.from({ length: spec.count }, (_, i) => {
        const seed = offset + i * 7.13;
        const left = noise(seed) * 100;
        const top = noise(seed + 1.7) * 100;
        // A few points in the nearest layer breathe, standing in for a question
        // being asked. Kept rare so it reads as incident, not decoration.
        const breathes = spec.size === 3 && i % 3 === 0;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: `${spec.size}px`,
              height: `${spec.size}px`,
              borderRadius: "50%",
              background: "var(--white)",
              opacity: spec.opacity,
              animation: breathes && !still ? `vvDotBreathe ${7 + (i % 3) * 2}s ease-in-out infinite` : undefined,
              animationDelay: breathes ? `${i * 1.3}s` : undefined,
            }}
          />
        );
      })}
    </motion.div>
  );
}

export function DotField({ seed = 1 }: { seed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div className="dot-field" ref={ref} aria-hidden="true">
      {LAYERS.map((spec, i) => (
        <Layer
          key={i}
          progress={scrollYProgress}
          spec={spec}
          offset={seed * 100 + i * 31}
          still={!!reduce}
        />
      ))}
    </div>
  );
}
