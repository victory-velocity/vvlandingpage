"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { STEPS } from "./steps";
import { ScreenPanel } from "./ScreenPanel";
import { AuthorityPanel } from "./AuthorityPanel";

function panelFor(index: number) {
  const step = STEPS[index];
  if (step.shot) return <ScreenPanel shot={step.shot} />;
  if (step.panel) return <AuthorityPanel panel={step.panel} />;
  return null;
}

export function StickyMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section className="method" id="method" ref={sectionRef}>
      <div className="wrap method-head">
        <h2 className="rv">How we work.</h2>
      </div>

      <div className="wrap method-grid">
        <div className="method-copy">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`method-step${index === active ? " active" : ""}`}
            >
              <div className="method-label">{step.label}</div>
              <h3>{step.headline}</h3>
              <p>{step.body}</p>
              <div className="method-step-visual">{panelFor(index)}</div>
            </div>
          ))}
        </div>

        <div className="method-visual" aria-hidden="true">
          <div className="method-visual-inner">{panelFor(active)}</div>
        </div>
      </div>
    </section>
  );
}
