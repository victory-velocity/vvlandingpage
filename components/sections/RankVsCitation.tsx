"use client";

import { useEffect, useState } from "react";

/**
 * One question, two very different outcomes.
 *
 * A single query is typed out, then answered twice: on the left as a ranked
 * list where the reader sits at position three, on the right as a generated
 * answer whose citations name three competitors and not them. Sharing one
 * question is what makes the two halves comparable, and it puts the act of
 * asking on screen rather than only its result.
 *
 * This is the section's argument rather than decoration around it: the point an
 * SEO-literate buyer needs is that a rank position and a citation are different
 * things, and that winning one does not win the other.
 *
 * Built from hairline rules, mono numerals, serif copy and small bordered
 * chips, all materials already used elsewhere on the page. Only transform and
 * opacity animate.
 */

const QUESTION = "best crm for small teams";

/** Widths as a share of the column, varied so the stack reads as result titles. */
const RESULTS = [74, 88, 63, 81, 57];
const YOU_AT = 2;

const SOURCES = ["northgate.com", "brightline.io", "cormont.co"];

type Phase = "asking" | "ranking" | "ranked" | "answering" | "answered";

export function RankVsCitation() {
  const [phase, setPhase] = useState<Phase>("asking");
  const [typed, setTyped] = useState(0);
  const [rows, setRows] = useState(0);
  const [chips, setChips] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase("asking");
      setTyped(0);
      setRows(0);
      setChips(0);

      // The question types out first, so the asking is on screen, not implied.
      QUESTION.split("").forEach((_, i) =>
        timers.push(setTimeout(() => setTyped(i + 1), 420 + i * 42))
      );
      const askDone = 420 + QUESTION.length * 42;

      timers.push(setTimeout(() => setPhase("ranking"), askDone + 400));
      RESULTS.forEach((_, i) =>
        timers.push(setTimeout(() => setRows(i + 1), askDone + 500 + i * 130))
      );
      timers.push(setTimeout(() => setPhase("ranked"), askDone + 1250));
      timers.push(setTimeout(() => setPhase("answering"), askDone + 1950));
      SOURCES.forEach((_, i) =>
        timers.push(setTimeout(() => setChips(i + 1), askDone + 3000 + i * 240))
      );
      timers.push(setTimeout(() => setPhase("answered"), askDone + 3850));
      timers.push(setTimeout(run, askDone + 8000));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const showAnswer = phase === "answering" || phase === "answered";
  const ranked = phase !== "asking" && phase !== "ranking";

  return (
    <div className="rvc" aria-hidden="true">
      {/* The question both sides are answering */}
      <div className="rvc-ask">
        <div className="rvc-ask-label">Someone asks</div>
        <p className="rvc-ask-text">
          {QUESTION.slice(0, typed)}
          <span className={`rvc-caret${typed < QUESTION.length ? " typing" : ""}`} />
        </p>
      </div>

      <div className="rvc-split">
        {/* Left: the rank you already have */}
        <div className="rvc-side">
          <div className="rvc-head">Google</div>

          <div className="rvc-list">
            {RESULTS.map((width, i) => {
              const isYou = i === YOU_AT;
              return (
                <div
                  key={i}
                  className={`rvc-row${isYou && ranked ? " you" : ""}`}
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

          <div className={`rvc-foot${ranked ? " on" : ""}`}>You rank #3</div>
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

          <div className={`rvc-foot${phase === "answered" ? " on" : ""}`}>
            You are not named
          </div>
        </div>
      </div>
    </div>
  );
}
