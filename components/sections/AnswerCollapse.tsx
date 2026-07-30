"use client";

import { useEffect, useState } from "react";

/**
 * Ten result rules collapse into one.
 *
 * This performs the sentence the section makes: you used to get ten blue links,
 * now you get one answer. It is built from hairline rules and a small caps
 * label, the same materials as the rest of the page, so it reads as part of the
 * composition rather than as a widget dropped into it.
 *
 * Motivation, per the project's motion rules: the collapse is the argument. The
 * motion is the point, not decoration around it.
 *
 * Only transform and opacity animate.
 */

/** Widths as a share of the column, varied so the stack reads as result titles. */
const RULES = [82, 64, 91, 55, 73, 68, 88, 49, 77, 61];
const COLLAPSE_INTO = 4;
const ROW = 17;

type Phase = "listing" | "collapsing" | "answered";

export function AnswerCollapse() {
  const [phase, setPhase] = useState<Phase>("listing");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase("listing");
      setShown(0);
      RULES.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), 260 + i * 85)));
      timers.push(setTimeout(() => setPhase("collapsing"), 1650));
      timers.push(setTimeout(() => setPhase("answered"), 2350));
      timers.push(setTimeout(run, 6200));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const collapsed = phase !== "listing";

  return (
    <div className="collapse" aria-hidden="true">
      <div className={`collapse-label${phase === "answered" ? " on" : ""}`}>
        {phase === "answered" ? "One answer" : "Ten blue links"}
      </div>

      <div className="collapse-stack">
        {RULES.map((width, i) => {
          const isSurvivor = i === COLLAPSE_INTO;
          return (
            <span
              key={i}
              className={`collapse-rule${isSurvivor && phase === "answered" ? " survivor" : ""}`}
              style={{
                top: `${i * ROW}px`,
                width: isSurvivor && phase === "answered" ? "100%" : `${width}%`,
                transform: collapsed ? `translateY(${(COLLAPSE_INTO - i) * ROW}px)` : "none",
                opacity: i >= shown ? 0 : isSurvivor ? 1 : collapsed ? 0 : 0.4,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
