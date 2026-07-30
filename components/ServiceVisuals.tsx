"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

const SANS: React.CSSProperties = { fontFamily: "var(--sans), system-ui, sans-serif" };
const MONO: React.CSSProperties = { fontFamily: "var(--mono), ui-monospace, monospace" };
const DISPLAY: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };

const HAIR = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.3)";
const MID = "rgba(255,255,255,0.55)";
const BRIGHT = "rgba(255,255,255,0.9)";

/** Shared 16:9 frame. Each visual replays on a loop via a changing key. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "6px",
        background: "#141416",
      }}
    >
      {children}
    </div>
  );
}

function Bar({ left, right }: { left: string; right: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "11px 16px",
        borderBottom: `1px solid ${HAIR}`,
        ...MONO,
        fontSize: "8.5px",
        letterSpacing: "0.18em",
      }}
    >
      <span style={{ color: MID }}>{left}</span>
      <span style={{ color: DIM }}>{right}</span>
    </div>
  );
}

/** Fires each step on schedule, then loops via onDone. */
function useSequence(steps: [number, () => void][], done: number, onDone: () => void) {
  useEffect(() => {
    const timers = steps.map(([at, fn]) => setTimeout(fn, at));
    timers.push(setTimeout(onDone, done));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function useLoop() {
  const [cycle, setCycle] = useState(0);
  const onDone = useCallback(() => setCycle((c) => c + 1), []);
  return { cycle, onDone };
}

// ════════════════════════════════════════════════════════════
// MEASURE - intent by engine, ending on the competitor gap
// ════════════════════════════════════════════════════════════

const ENGINE_COLS = ["GPT", "CLDE", "GEM", "PPLX"];
const GRID = "minmax(0, 1fr) repeat(4, 36px)";
const ROWS_MAX = "440px";

const INTENTS = [
  { q: "best crm for small teams", you: [true, false, true, false] },
  { q: "top rated crm software", you: [false, false, true, false] },
  { q: "crm with the best support", you: [true, false, false, false] },
];

const COMPETITOR = { name: "Northgate", hits: [true, true, true, true] };

function Dot({ on, show }: { on: boolean; show: boolean }) {
  return (
    <span
      style={{
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        justifySelf: "center",
        background: on ? BRIGHT : "transparent",
        border: on ? "1px solid transparent" : "1px solid rgba(255,255,255,0.22)",
        opacity: show ? 1 : 0,
        transform: show ? "none" : "scale(0.4)",
        transition: "opacity .4s ease, transform .4s cubic-bezier(.2,.7,.2,1)",
      }}
    />
  );
}

function MeasureInner({ onDone }: { onDone: () => void }) {
  const [cols, setCols] = useState(0);
  const [rival, setRival] = useState(false);
  const [gap, setGap] = useState(false);

  useSequence(
    [
      [400, () => setCols(1)],
      [750, () => setCols(2)],
      [1100, () => setCols(3)],
      [1450, () => setCols(4)],
      [2050, () => setRival(true)],
      [2650, () => setGap(true)],
    ],
    5400,
    onDone
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Bar left="VISIBILITY RUN" right="4 ENGINES" />

      <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", width: "100%", maxWidth: ROWS_MAX, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: GRID, alignItems: "center", ...MONO, fontSize: "7px", letterSpacing: "0.14em", color: DIM }}>
          <span />
          {ENGINE_COLS.map((c) => (
            <span key={c} style={{ textAlign: "center" }}>{c}</span>
          ))}
        </div>

        {INTENTS.map((row) => (
          <div key={row.q} style={{ display: "grid", gridTemplateColumns: GRID, alignItems: "center" }}>
            <span style={{ ...DISPLAY, fontStyle: "italic", fontSize: "12.5px", color: MID }}>{row.q}</span>
            {row.you.map((on, i) => (
              <Dot key={i} on={on} show={i < cols} />
            ))}
          </div>
        ))}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: GRID,
            alignItems: "center",
            paddingTop: "8px",
            borderTop: `1px solid ${HAIR}`,
            opacity: rival ? 1 : 0,
            transform: rival ? "none" : "translateY(6px)",
            transition: "opacity .5s ease, transform .5s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <span style={{ ...DISPLAY, fontSize: "12px", color: BRIGHT }}>{COMPETITOR.name}</span>
          {COMPETITOR.hits.map((on, i) => (
            <Dot key={i} on={on} show={rival} />
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "9px 16px",
          borderTop: `1px solid ${HAIR}`,
          ...MONO,
          fontSize: "8px",
          letterSpacing: "0.14em",
          color: gap ? BRIGHT : DIM,
          transition: "color .5s ease",
        }}
      >
        {gap ? "9 GAPS FOUND" : "MEASURING"}
      </div>
    </div>
  );
}

export function MeasureVisual() {
  const { cycle, onDone } = useLoop();
  return (
    <Frame>
      <MeasureInner key={cycle} onDone={onDone} />
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════
// FIX - deterministic checks resolving into an approved action
// ════════════════════════════════════════════════════════════

const AUDIT_CHECKS = [
  { label: "AI crawlers allowed", detail: "GPTBot, PerplexityBot, ClaudeBot", ok: true },
  { label: "Sitemap discoverable", detail: "sitemap.xml, 41 entries", ok: true },
  { label: "Schema markup valid", detail: "Organization, Service", ok: true },
  { label: "Internal links resolve", detail: "1 page needs action", ok: false },
];

function AuditInner({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [approved, setApproved] = useState(false);

  useSequence(
    [
      [400, () => setShown(1)],
      [740, () => setShown(2)],
      [1080, () => setShown(3)],
      [1420, () => setShown(4)],
      [2050, () => setApproved(true)],
    ],
    4600,
    onDone
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Bar left="TECHNICAL AUDIT" right="222 CHECKS" />

      <div style={{ flex: 1, padding: "6px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {AUDIT_CHECKS.map((check, i) => (
          <div
            key={check.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 0",
              borderBottom: i < AUDIT_CHECKS.length - 1 ? `1px solid ${HAIR}` : "none",
              opacity: i < shown ? 1 : 0,
              transform: i < shown ? "none" : "translateY(5px)",
              transition: "opacity .42s ease, transform .42s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ ...DISPLAY, display: "block", fontSize: "12.5px", color: BRIGHT, lineHeight: 1.25 }}>{check.label}</span>
              <span style={{ ...MONO, display: "block", fontSize: "7.5px", color: DIM, letterSpacing: "0.06em", marginTop: "2px" }}>{check.detail}</span>
            </span>
            <span
              style={{
                ...MONO,
                fontSize: "7px",
                letterSpacing: "0.16em",
                padding: "3px 7px",
                borderRadius: "3px",
                flexShrink: 0,
                color: check.ok ? DIM : "#141416",
                background: check.ok ? "transparent" : BRIGHT,
                border: check.ok ? "1px solid rgba(255,255,255,0.14)" : "1px solid transparent",
              }}
            >
              {check.ok ? "PASS" : "FIX"}
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: "9px 16px", borderTop: `1px solid ${HAIR}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ ...MONO, fontSize: "8px", letterSpacing: "0.14em", color: DIM }}>1 TO ACT</span>
        <span
          style={{
            ...SANS,
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            padding: "5px 12px",
            borderRadius: "3px",
            color: approved ? "#141416" : MID,
            background: approved ? BRIGHT : "transparent",
            border: approved ? "1px solid transparent" : "1px solid rgba(255,255,255,0.16)",
            transition: "background .45s ease, color .45s ease, border-color .45s ease",
          }}
        >
          {approved ? "APPROVED" : "AWAITING APPROVAL"}
        </span>
      </div>
    </div>
  );
}

export function AuditVisual() {
  const { cycle, onDone } = useLoop();
  return (
    <Frame>
      <AuditInner key={cycle} onDone={onDone} />
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════
// BUILD AUTHORITY - third party surfaces connecting to the brand
// ════════════════════════════════════════════════════════════

const SURFACES = [
  { label: "DIRECTORIES", x: 24, y: 28 },
  { label: "COMPARISONS", x: 76, y: 25 },
  { label: "REVIEWS", x: 21, y: 68 },
  { label: "PUBLICATIONS", x: 79, y: 66 },
  { label: "COMMUNITIES", x: 50, y: 80 },
];

function AuthorityInner({ onDone }: { onDone: () => void }) {
  const [linked, setLinked] = useState(0);

  useSequence(
    [
      [500, () => setLinked(1)],
      [1000, () => setLinked(2)],
      [1500, () => setLinked(3)],
      [2000, () => setLinked(4)],
      [2500, () => setLinked(5)],
    ],
    5200,
    onDone
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Bar left="AUTHORITY MAP" right={`${linked} OF ${SURFACES.length}`} />

      <div style={{ flex: 1, position: "relative" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {SURFACES.map((s, i) => (
            <line
              key={s.label}
              x1={s.x}
              y1={s.y}
              x2={50}
              y2={50}
              stroke="rgba(255,255,255,0.34)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              style={{ opacity: i < linked ? 1 : 0, transition: "opacity .55s ease" }}
            />
          ))}
        </svg>

        {SURFACES.map((s, i) => (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: "translate(-50%,-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              opacity: i < linked ? 1 : 0.28,
              transition: "opacity .55s ease",
            }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: i < linked ? BRIGHT : DIM }} />
            <span style={{ ...MONO, fontSize: "6.5px", letterSpacing: "0.14em", color: i < linked ? MID : DIM, whiteSpace: "nowrap" }}>
              {s.label}
            </span>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              background: BRIGHT,
              opacity: 0.35 + (linked / SURFACES.length) * 0.65,
              transition: "opacity .55s ease",
            }}
          />
          <span style={{ ...DISPLAY, fontSize: "13px", color: BRIGHT }}>You</span>
        </div>
      </div>
    </div>
  );
}

export function AuthorityVisual() {
  const { cycle, onDone } = useLoop();
  return (
    <Frame>
      <AuthorityInner key={cycle} onDone={onDone} />
    </Frame>
  );
}

// ════════════════════════════════════════════════════════════
// RE-RUN - two cycles compared, including an honest regression
// ════════════════════════════════════════════════════════════

const MOVES = [
  { q: "best crm for small teams", before: 24, after: 51, note: "verified" },
  { q: "top rated crm software", before: 12, after: 30, note: "verified" },
  { q: "crm with the best support", before: 33, after: 21, note: "regressed" },
];

function useCount(to: number, run: boolean, ms = 900) {
  const [n, setN] = useState(0);
  const raf = useRef<number>();
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setN(Math.round(p * to));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run, to, ms]);
  return n;
}

function RerunInner({ onDone }: { onDone: () => void }) {
  const [rows, setRows] = useState(0);
  const [scored, setScored] = useState(false);
  const score = useCount(34, scored);

  useSequence(
    [
      [400, () => setScored(true)],
      [1250, () => setRows(1)],
      [1610, () => setRows(2)],
      [1970, () => setRows(3)],
    ],
    5200,
    onDone
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Bar left="CYCLE 02" right="VS CYCLE 01" />

      <div style={{ padding: "14px 16px 8px", display: "flex", alignItems: "baseline", gap: "10px" }}>
        <span style={{ ...DISPLAY, fontSize: "34px", lineHeight: 1, color: BRIGHT }}>{score}%</span>
        <span style={{ ...MONO, fontSize: "8px", letterSpacing: "0.16em", color: MID }}>VISIBILITY</span>
        <span style={{ ...MONO, fontSize: "8px", letterSpacing: "0.16em", color: DIM, marginLeft: "auto", opacity: scored ? 1 : 0, transition: "opacity .5s ease" }}>
          +11 PTS
        </span>
      </div>

      <div style={{ flex: 1, padding: "0 16px 6px", display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", maxWidth: "470px", margin: "0 auto" }}>
        {MOVES.map((m, i) => {
          const down = m.after < m.before;
          return (
            <div
              key={m.q}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "7px 0",
                borderTop: `1px solid ${HAIR}`,
                opacity: i < rows ? 1 : 0,
                transform: i < rows ? "none" : "translateY(5px)",
                transition: "opacity .45s ease, transform .45s cubic-bezier(.2,.7,.2,1)",
              }}
            >
              <span style={{ ...DISPLAY, fontStyle: "italic", fontSize: "12px", color: MID, flex: 1, minWidth: 0 }}>{m.q}</span>
              <span style={{ ...MONO, fontSize: "8.5px", color: DIM }}>{m.before}%</span>
              <span style={{ ...MONO, fontSize: "8.5px", color: DIM }}>&rarr;</span>
              <span style={{ ...MONO, fontSize: "8.5px", color: BRIGHT, width: "26px" }}>{m.after}%</span>
              <span
                style={{
                  ...MONO,
                  fontSize: "6.5px",
                  letterSpacing: "0.14em",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  width: "58px",
                  textAlign: "center",
                  color: down ? BRIGHT : DIM,
                  border: `1px solid ${down ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.14)"}`,
                }}
              >
                {m.note.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RerunVisual() {
  const { cycle, onDone } = useLoop();
  return (
    <Frame>
      <RerunInner key={cycle} onDone={onDone} />
    </Frame>
  );
}
