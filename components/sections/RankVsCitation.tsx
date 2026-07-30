"use client";

import { useEffect, useState } from "react";

/**
 * Ranking first, and still not being named.
 *
 * The left half is a ranked result list with the reader's row highlighted at
 * position three. The right half is a generated answer whose citations name
 * three competitors and not them. The two halves resolve at different moments,
 * so the second lands as a reversal of the first.
 *
 * This is the section's argument rather than decoration around it: the point
 * an SEO-literate buyer needs is that a rank position and a citation are
 * different things, and that winning one does not win the other.
 *
 * Built from hairline rules, mono numerals, serif copy and small bordered
 * chips, all materials already used elsewhere on the page. Only transform and
 * opacity animate.
 */

/** Widths as a share of the column, varied so the stack reads as result titles. */
const RESULTS = [74, 88, 63, 81, 57];
const YOU_AT = 2;

const SOURCES = ["northgate.com", "brightline.io", "cormont.co"];

type Phase = "ranking" | "ranked" | "answering" | "answered";

export function RankVsCitation() {
  const [phase, setPhase] = useState<Phase>("ranking");
  const [rows, setRows] = useState(0);
  const [chips, setChips] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase("ranking");
      setRows(0);
      setChips(0);
      RESULTS.forEach((_, i) => timers.push(setTimeout(() => setRows(i + 1), 300 + i * 130)));
      timers.push(setTimeout(() => setPhase("ranked"), 1150));
      timers.push(setTimeout(() => setPhase("answering"), 1900));
      SOURCES.forEach((_, i) => timers.push(setTimeout(() => setChips(i + 1), 3000 + i * 240)));
      timers.push(setTimeout(() => setPhase("answered"), 3900));
      timers.push(setTimeout(run, 8200));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const showAnswer = phase === "answering" || phase === "answered";

  return (
    <div className="rvc" aria-hidden="true">
      {/* Left: the rank you already have */}
      <div className="rvc-side">
        <div className="rvc-head">Google</div>

        <div className="rvc-list">
          {RESULTS.map((width, i) => {
            const isYou = i === YOU_AT;
            const lit = isYou && phase !== "ranking";
            return (
              <div
                key={i}
                className={`rvc-row${lit ? " you" : ""}`}
                style={{
                  opacity: i < rows ? 1 : 0,
                  transform: i < rows ? "none" : "translateY(6px)",
                }}
              >
                <span className="rvc-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="rvc-rule" style={{ width: `${width}%` }} />
                {isYou && <span className="rvc-you">You</span>}
              </div>
            );
          })}
        </div>

        <div className={`rvc-foot${phase !== "ranking" ? " on" : ""}`}>You rank #3</div>
      </div>

      {/* Right: the answer that never mentions you */}
      <div className="rvc-side rvc-answer-side">
        <div className="rvc-head">ChatGPT</div>

        <p className={`rvc-answer${showAnswer ? " on" : ""}`}>
          For a small team, most people land on Northgate for the pipeline
          tooling, Brightline if you want something lighter, or Cormont when
          reporting matters more than speed.
        </p>

        <div className="rvc-chips">
          {SOURCES.map((src, i) => (
            <span
              key={src}
              className="rvc-chip"
              style={{
                opacity: i < chips ? 1 : 0,
                transform: i < chips ? "none" : "translateY(5px)",
              }}
            >
              {src}
            </span>
          ))}
        </div>

        <div className={`rvc-foot${phase === "answered" ? " on alert" : ""}`}>
          You are not named
        </div>
      </div>
    </div>
  );
}
