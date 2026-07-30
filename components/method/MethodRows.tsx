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
        <h2 className="method-title rv">How we work.</h2>

        <div className="method-list">
          {STEPS.map((step) => {
            const Visual = VISUALS[step.id];
            return (
              <div className="method-row" key={step.id}>
                <div className="method-copy rv">
                  <div className="method-label">{step.label}</div>
                  <h3>{step.headline}</h3>
                  <p>{step.body}</p>
                </div>
                <div className="method-vis rv d1">
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
