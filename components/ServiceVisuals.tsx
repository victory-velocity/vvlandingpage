"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

const SANS: React.CSSProperties = { fontFamily: "var(--sans), system-ui, sans-serif" };
const DISPLAY: React.CSSProperties = { fontFamily: "var(--serif), Georgia, serif" };

const INK = "#17150f";
const MUTE = "rgba(23,21,15,0.62)";
const FAINT = "rgba(23,21,15,0.4)";
const HAIR = "rgba(23,21,15,0.12)";
const ACCENT = "#D97757";
const ACCENT_SOFT = "rgba(217,119,87,0.14)";

/** Shared unstyled frame — the outer method-card already provides the border
 * and background, so this just gives each visual a consistent flex column.
 * Hover-gates playback: the sequence only runs while the pointer is over it,
 * and resets to its resting state the moment the pointer leaves. */
function Frame({ children }: { children: (play: boolean) => React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ width: "100%", display: "flex", flexDirection: "column", ...SANS }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children(hovered)}
    </div>
  );
}

/** A small round status marker: a checkmark once resolved, an empty ring before. */
function Check({ show, tone = "ink" }: { show: boolean; tone?: "ink" | "accent" }) {
  const color = tone === "accent" ? ACCENT : INK;
  return (
    <span
      style={{
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: show ? (tone === "accent" ? ACCENT_SOFT : "rgba(23,21,15,0.06)") : "transparent",
        border: show ? "1px solid transparent" : `1px solid ${HAIR}`,
        transition: "background .4s ease, border-color .4s ease",
      }}
    >
      <svg width="11" height="9" viewBox="0 0 11 9" style={{ opacity: show ? 1 : 0, transition: "opacity .3s ease" }}>
        <path d="M1 4.5L4 7.5L10 1" stroke={color} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Fires each step on schedule while play is true, then loops via onDone.
 * Scheduling stops (and any pending steps are cancelled) as soon as play
 * goes false, so leaving the sequence mid-way never finishes it silently. */
function useSequence(steps: [number, () => void][], done: number, onDone: () => void, play: boolean) {
  useEffect(() => {
    if (!play) return;
    const timers = steps.map(([at, fn]) => setTimeout(fn, at));
    timers.push(setTimeout(onDone, done));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
}

function useLoop() {
  const [cycle, setCycle] = useState(0);
  const onDone = useCallback(() => setCycle((c) => c + 1), []);
  return { cycle, onDone };
}

// ════════════════════════════════════════════════════════════
// MEASURE - queries checked off as their engine coverage is read
// ════════════════════════════════════════════════════════════

const INTENTS = [
  { q: "best crm for small teams", hits: "2 of 4 engines" },
  { q: "top rated crm software", hits: "1 of 4 engines" },
  { q: "crm with the best support", hits: "1 of 4 engines" },
];

function MeasureInner({ onDone, play }: { onDone: () => void; play: boolean }) {
  const [shown, setShown] = useState(INTENTS.length);
  const [gap, setGap] = useState(true);

  useSequence(
    [
      [400, () => setShown(1)],
      [900, () => setShown(2)],
      [1400, () => setShown(3)],
      [2100, () => setGap(true)],
    ],
    4600,
    onDone,
    play
  );

  useEffect(() => {
    if (play) {
      setShown(0);
      setGap(false);
    } else {
      setShown(INTENTS.length);
      setGap(true);
    }
  }, [play]);

  return (
    <div>
      {INTENTS.map((row, i) => (
        <div
          key={row.q}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "13px 0",
            borderBottom: i < INTENTS.length - 1 ? `1px solid ${HAIR}` : "none",
            opacity: i < shown ? 1 : 0,
            transform: i < shown ? "none" : "translateY(6px)",
            transition: "opacity .42s ease, transform .42s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ ...DISPLAY, fontStyle: "italic", display: "block", fontSize: "15px", color: INK, lineHeight: 1.3 }}>
              {row.q}
            </span>
            <span style={{ display: "block", fontSize: "12.5px", color: MUTE, marginTop: "2px" }}>{row.hits}</span>
          </span>
          <Check show={i < shown} />
        </div>
      ))}

      <div
        style={{
          marginTop: "14px",
          fontSize: "13px",
          fontWeight: 600,
          color: gap ? ACCENT : FAINT,
          transition: "color .5s ease",
        }}
      >
        {gap ? "9 gaps found against your top competitor" : "Reading engine coverage…"}
      </div>
    </div>
  );
}

export function MeasureVisual() {
  const { cycle, onDone } = useLoop();
  return <Frame>{(play) => <MeasureInner key={cycle} onDone={onDone} play={play} />}</Frame>;
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

function AuditInner({ onDone, play }: { onDone: () => void; play: boolean }) {
  const [shown, setShown] = useState(AUDIT_CHECKS.length);
  const [approved, setApproved] = useState(true);

  useSequence(
    [
      [400, () => setShown(1)],
      [740, () => setShown(2)],
      [1080, () => setShown(3)],
      [1420, () => setShown(4)],
      [2100, () => setApproved(true)],
    ],
    4600,
    onDone,
    play
  );

  useEffect(() => {
    if (play) {
      setShown(0);
      setApproved(false);
    } else {
      setShown(AUDIT_CHECKS.length);
      setApproved(true);
    }
  }, [play]);

  return (
    <div>
      {AUDIT_CHECKS.map((check, i) => (
        <div
          key={check.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "13px 0",
            borderBottom: i < AUDIT_CHECKS.length - 1 ? `1px solid ${HAIR}` : "none",
            opacity: i < shown ? 1 : 0,
            transform: i < shown ? "none" : "translateY(6px)",
            transition: "opacity .42s ease, transform .42s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: "14.5px", fontWeight: 600, color: INK, lineHeight: 1.3 }}>{check.label}</span>
            <span style={{ display: "block", fontSize: "12.5px", color: MUTE, marginTop: "2px" }}>{check.detail}</span>
          </span>
          <Check show={i < shown} tone={check.ok ? "ink" : "accent"} />
        </div>
      ))}

      <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "12.5px", color: FAINT }}>1 to act on</span>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: "999px",
            color: approved ? "#fff" : MUTE,
            background: approved ? ACCENT : "transparent",
            border: approved ? "1px solid transparent" : `1px solid ${HAIR}`,
            transition: "background .45s ease, color .45s ease, border-color .45s ease",
          }}
        >
          {approved ? "Approved" : "Awaiting your approval"}
        </span>
      </div>
    </div>
  );
}

export function AuditVisual() {
  const { cycle, onDone } = useLoop();
  return <Frame>{(play) => <AuditInner key={cycle} onDone={onDone} play={play} />}</Frame>;
}

// ════════════════════════════════════════════════════════════
// BUILD AUTHORITY - surfaces fanning in as a stack of cards,
// the most recent one always the highlighted "front" card
// ════════════════════════════════════════════════════════════

const SURFACES = ["Directories", "Comparisons", "Reviews", "Publications"];

function AuthorityInner({ onDone, play }: { onDone: () => void; play: boolean }) {
  const [linked, setLinked] = useState(SURFACES.length);

  useSequence(
    [
      [500, () => setLinked(1)],
      [1300, () => setLinked(2)],
      [2100, () => setLinked(3)],
      [2900, () => setLinked(4)],
    ],
    5400,
    onDone,
    play
  );

  useEffect(() => {
    setLinked(play ? 0 : SURFACES.length);
  }, [play]);

  return (
    <div>
      <div style={{ position: "relative", height: "190px" }}>
        {SURFACES.map((label, i) => {
          const shown = i < linked;
          const isFront = i === linked - 1;
          const rotate = (i - (SURFACES.length - 1) / 2) * 4.5;
          return (
            <div
              key={label}
              style={{
                position: "absolute",
                top: `${i * 20}px`,
                left: `${i * 5}%`,
                width: "72%",
                padding: "16px 18px",
                borderRadius: "12px",
                border: isFront ? "1px solid transparent" : `1px solid ${HAIR}`,
                background: isFront ? ACCENT : "#fff",
                boxShadow: isFront
                  ? "0 18px 32px -18px rgba(217,119,87,0.55)"
                  : "0 12px 24px -18px rgba(23,21,15,0.18)",
                transform: `rotate(${rotate}deg) translateY(${shown ? 0 : 16}px)`,
                opacity: shown ? 1 : 0,
                zIndex: i,
                transition: "transform .5s cubic-bezier(.2,.7,.2,1), opacity .5s ease, background .4s ease, box-shadow .4s ease",
              }}
            >
              <span style={{ fontSize: "13.5px", fontWeight: 600, color: isFront ? "#fff" : INK }}>{label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "14px", fontSize: "13px", color: MUTE }}>
        {linked} of {SURFACES.length} surfaces linked to your brand
      </div>
    </div>
  );
}

export function AuthorityVisual() {
  const { cycle, onDone } = useLoop();
  return <Frame>{(play) => <AuthorityInner key={cycle} onDone={onDone} play={play} />}</Frame>;
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
  const [n, setN] = useState(to);
  const raf = useRef<number>();
  useEffect(() => {
    if (!run) {
      setN(to);
      return;
    }
    setN(0);
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

function RerunInner({ onDone, play }: { onDone: () => void; play: boolean }) {
  const [rows, setRows] = useState(MOVES.length);
  const [scored, setScored] = useState(true);
  const score = useCount(34, play);

  useSequence(
    [
      [400, () => setScored(true)],
      [1250, () => setRows(1)],
      [1610, () => setRows(2)],
      [1970, () => setRows(3)],
    ],
    5200,
    onDone,
    play
  );

  useEffect(() => {
    if (play) {
      setRows(0);
      setScored(false);
    } else {
      setRows(MOVES.length);
      setScored(true);
    }
  }, [play]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
        <span style={{ ...DISPLAY, fontSize: "38px", lineHeight: 1, color: INK }}>{score}%</span>
        <span style={{ fontSize: "12.5px", color: MUTE }}>visibility</span>
        <span
          style={{
            fontSize: "12.5px",
            fontWeight: 600,
            color: ACCENT,
            marginLeft: "auto",
            opacity: scored ? 1 : 0,
            transition: "opacity .5s ease",
          }}
        >
          +11 pts
        </span>
      </div>

      {MOVES.map((m, i) => {
        const down = m.after < m.before;
        return (
          <div
            key={m.q}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 0",
              borderTop: `1px solid ${HAIR}`,
              opacity: i < rows ? 1 : 0,
              transform: i < rows ? "none" : "translateY(6px)",
              transition: "opacity .45s ease, transform .45s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <span style={{ ...DISPLAY, fontStyle: "italic", fontSize: "14px", color: INK, flex: 1, minWidth: 0 }}>{m.q}</span>
            <span style={{ fontSize: "12.5px", color: FAINT }}>{m.before}%</span>
            <span style={{ fontSize: "12.5px", color: FAINT }}>&rarr;</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: INK, width: "30px" }}>{m.after}%</span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "999px",
                color: down ? INK : MUTE,
                border: `1px solid ${down ? "rgba(23,21,15,0.3)" : HAIR}`,
              }}
            >
              {down ? "Regressed" : "Verified"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function RerunVisual() {
  const { cycle, onDone } = useLoop();
  return <Frame>{(play) => <RerunInner key={cycle} onDone={onDone} play={play} />}</Frame>;
}
