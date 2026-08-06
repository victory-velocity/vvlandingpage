"use client";

import { MeasureVisual, AuditVisual, AuthorityVisual, RerunVisual } from "@/components/ServiceVisuals";
import { STEPS } from "./steps";

const VISUALS: Record<string, () => JSX.Element> = {
  measure: MeasureVisual,
  fix: AuditVisual,
  authority: AuthorityVisual,
  rerun: RerunVisual,
};

export function MethodRows() {
  return (
    <section className="method sec-pad" id="method">
      <div className="wrap">
        <div className="method-grid">
          {STEPS.map((step, i) => {
            const Visual = VISUALS[step.id];
            return (
              <div className="method-card rv" key={step.id}>
                <div className="method-card-head">
                  <span className="method-card-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="method-label">{step.label}</span>
                </div>
                <h3>{step.headline}</h3>
                <p>{step.body}</p>
                <div className="method-vis">
                  <Visual />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
