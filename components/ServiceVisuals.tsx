"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import React from "react";

const SANS: React.CSSProperties = { fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" };
const MONO_CSS: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };
const DISPLAY_CSS: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };

// ════════════════════════════════════════════════════════════
// 1 — GEO VISUAL: ChatGPT citation result
// ════════════════════════════════════════════════════════════

const GEO_WORDS = "For wedding flower donation in Vancouver, here are the recommended local organizations that redistribute arrangements to seniors and community spaces after events.".split(" ");

const GEO_CITATIONS = [
  { name: "Canadian Flowers For Food Society", domain: "canadianflowers.ca" },
  { name: "Repeat Floral",                    domain: "wpic.ca" },
  { name: "Flower Factory",                   domain: "flowerfactory.ca" },
];

function GEOInner({ onDone }: { onDone: () => void }) {
  const [wordCount, setWordCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "citing">("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  // kick off typing after initial pause
  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 650);
    return () => clearTimeout(t);
  }, []);

  // word-by-word typing
  useEffect(() => {
    if (phase !== "typing") return;
    intervalRef.current = setInterval(() => {
      setWordCount(prev => prev + 1);
    }, 52);
    return clearTimer;
  }, [phase, clearTimer]);

  // typing → citing transition
  useEffect(() => {
    if (phase === "typing" && wordCount >= GEO_WORDS.length) {
      clearTimer();
      const t = setTimeout(() => setPhase("citing"), 350);
      return () => clearTimeout(t);
    }
  }, [wordCount, phase, clearTimer]);

  // pop citations in one by one
  useEffect(() => {
    if (phase !== "citing") return;
    intervalRef.current = setInterval(() => {
      setCitationCount(prev => prev + 1);
    }, 480);
    return clearTimer;
  }, [phase, clearTimer]);

  // done when all citations shown
  useEffect(() => {
    if (phase === "citing" && citationCount >= GEO_CITATIONS.length) {
      clearTimer();
      const t = setTimeout(onDone, 3200);
      return () => clearTimeout(t);
    }
  }, [citationCount, phase, onDone, clearTimer]);

  return (
    <div style={{ ...SANS, background: "#0d0d0d", width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* header */}
      <div style={{ padding: "7px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "7px" }}>
        <span style={{ color: "rgba(255,255,255,0.92)", fontSize: "11.5px", fontWeight: 600 }}>ChatGPT</span>
        <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "9px" }}>▾</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "9.5px" }}>✦ Upgrade</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "9.5px" }}>↑ Share</span>
        </div>
      </div>

      {/* chat body */}
      <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", gap: "9px", justifyContent: "flex-end", overflow: "hidden" }}>
        {/* user bubble */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ background: "#2f2f2f", color: "rgba(255,255,255,0.92)", padding: "7px 11px", borderRadius: "16px 16px 3px 16px", fontSize: "10.5px", maxWidth: "78%", lineHeight: 1.4 }}>
            wedding flower donation Vancouver
          </div>
        </motion.div>

        {/* ai response */}
        {phase !== "idle" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "10.5px", lineHeight: 1.68, marginBottom: "8px", minHeight: "2.5em" }}>
              {GEO_WORDS.slice(0, wordCount).join(" ")}
              {phase === "typing" && (
                <span className="cursor-blink" style={{ display: "inline-block", width: "1.5px", height: "11px", background: "rgba(255,255,255,0.7)", marginLeft: "1px", verticalAlign: "text-bottom" }} />
              )}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {GEO_CITATIONS.slice(0, citationCount).map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 8px", background: "rgba(255,255,255,0.045)", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div style={{ width: "17px", height: "17px", background: "rgba(255,255,255,0.07)", borderRadius: "3px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ ...MONO_CSS, fontSize: "7px", color: "rgba(255,255,255,0.4)" }}>{i + 1}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "rgba(255,255,255,0.88)", fontSize: "9.5px", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.33)", fontSize: "8px" }}>{c.domain}</div>
                  </div>
                  <span style={{ ...MONO_CSS, background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: "3px", fontSize: "7px", color: "rgba(255,255,255,0.45)", flexShrink: 0 }}>cited</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function GEOVisual() {
  const [cycle, setCycle] = useState(0);
  const handleDone = useCallback(() => { setTimeout(() => setCycle(c => c + 1), 700); }, []);
  return (
    <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }}>
      <GEOInner key={cycle} onDone={handleDone} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 2 — ADS MANAGER VISUAL: Campaign creation flow
// ════════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════════
// 3 — WEEKLY REPORT VISUAL: Report builder
// ════════════════════════════════════════════════════════════

const REPORT_QUERIES = [
  { q: "wedding flower donation Vancouver", engine: "CHATGPT",    cited: true },
  { q: "local florist Vancouver eco-friendly", engine: "PERPLEXITY", cited: true },
  { q: "sustainable wedding flowers BC",   engine: "GOOGLE AI",  cited: true },
  { q: "wedding flowers second life charity", engine: "CHATGPT", cited: false },
  { q: "flower donation near me Vancouver",  engine: "PERPLEXITY", cited: false },
];

function WeeklyReportInner({ onDone }: { onDone: () => void }) {
  const [visibleRows, setVisibleRows] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      intervalRef.current = setInterval(() => setVisibleRows(p => p + 1), 520);
    }, 500);
    return () => { clearTimeout(t); clearTimer(); };
  }, [clearTimer]);

  useEffect(() => {
    if (visibleRows >= REPORT_QUERIES.length) {
      clearTimer();
      const t = setTimeout(onDone, 4000);
      return () => clearTimeout(t);
    }
  }, [visibleRows, onDone, clearTimer]);

  const citedCount = REPORT_QUERIES.slice(0, visibleRows).filter(r => r.cited).length;
  const total = REPORT_QUERIES.length;
  const pct = (citedCount / total) * 100;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>

      {/* light report — full width */}
      <div style={{ flex: 1, background: "#f5f3ef", padding: "11px 12px", overflow: "hidden" }}>
        {/* report head */}
        <div style={{ marginBottom: "8px" }}>
          <p style={{ ...MONO_CSS, fontSize: "6.5px", color: "#888", letterSpacing: "0.12em", marginBottom: "2px" }}>GEO · WEEKLY PERFORMANCE REPORT</p>
          <p style={{ ...DISPLAY_CSS, fontSize: "19px", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.05, marginBottom: "2px" }}>Bloom & Give</p>
          <p style={{ ...DISPLAY_CSS, fontStyle: "italic", fontSize: "9.5px", color: "#777", marginBottom: "1px" }}>June 1 – 7, 2026</p>
          <p style={{ ...MONO_CSS, fontSize: "6.5px", color: "#aaa", letterSpacing: "0.06em" }}>BLOOMANDGIVE.CA · PREPARED BY VICTORY VELOCITY</p>
        </div>

        {/* citation tracker */}
        <p style={{ ...MONO_CSS, fontSize: "6.5px", color: "#888", letterSpacing: "0.1em", marginBottom: "5px" }}>GEO VISIBILITY — AI ENGINE CITATIONS</p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px" }}>
          <div style={{ ...DISPLAY_CSS, fontSize: "24px", fontWeight: 300, color: "#1a1a1a", lineHeight: 1, flexShrink: 0 }}>
            {citedCount}<span style={{ fontSize: "13px", color: "#999" }}> / {total}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...MONO_CSS, fontSize: "6px", color: "#aaa", letterSpacing: "0.1em", marginBottom: "3px" }}>QUERIES CITED</p>
            <div style={{ height: "3px", background: "#e0ddd8", borderRadius: "2px", overflow: "hidden", marginBottom: "3px" }}>
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.45 }}
                style={{ height: "100%", background: "#1a1a1a", borderRadius: "2px" }}
              />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {([["■", "#1a1a1a", "CITED"], ["■", "#aaa", "PARTIAL"], ["■", "#ddd", "NOT YET"]] as [string, string, string][]).map(([sym, col, lbl]) => (
                <span key={lbl} style={{ ...MONO_CSS, fontSize: "5.5px", color: "#aaa", display: "flex", alignItems: "center", gap: "2px" }}>
                  <span style={{ color: col }}>{sym}</span>{lbl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* query table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 58px 46px", gap: "0 5px", marginBottom: "3px", paddingBottom: "3px", borderBottom: "1px solid #ddd" }}>
          {["QUERY", "ENGINE", "CITED?"].map(h => (
            <span key={h} style={{ ...MONO_CSS, fontSize: "6px", color: "#aaa", letterSpacing: "0.1em" }}>{h}</span>
          ))}
        </div>
        <div>
          {REPORT_QUERIES.slice(0, visibleRows).map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 58px 46px", gap: "0 5px", padding: "3px 0", borderBottom: "1px solid rgba(0,0,0,0.05)", alignItems: "center" }}
            >
              <span style={{ ...DISPLAY_CSS, fontStyle: "italic", fontSize: "8.5px", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.q}</span>
              <span style={{ ...MONO_CSS, fontSize: "6.5px", color: "#777" }}>{row.engine}</span>
              <span style={{ ...MONO_CSS, fontSize: "6px", padding: "1px 4px", borderRadius: "2px", background: row.cited ? "rgba(0,0,0,0.07)" : "transparent", border: row.cited ? "none" : "1px solid #ddd", color: row.cited ? "#1a1a1a" : "#bbb", textAlign: "center" }}>
                {row.cited ? "CITED" : "NOT YET"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WeeklyReportVisual() {
  const [cycle, setCycle] = useState(0);
  const handleDone = useCallback(() => { setTimeout(() => setCycle(c => c + 1), 700); }, []);
  return (
    <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }}>
      <WeeklyReportInner key={cycle} onDone={handleDone} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// STATIC HERO CARD — frozen report snapshot, no animation
// ════════════════════════════════════════════════════════════

const STATIC_QUERIES = [
  { q: "wedding flower donation Vancouver",    engine: "CHATGPT",    cited: true },
  { q: "local florist Vancouver eco-friendly", engine: "PERPLEXITY", cited: true },
  { q: "sustainable wedding flowers BC",       engine: "GOOGLE AI",  cited: true },
  { q: "wedding flowers second life charity",  engine: "CHATGPT",    cited: false },
  { q: "flower donation near me Vancouver",    engine: "PERPLEXITY", cited: false },
];

export function StaticHeroCard() {
  const citedCount = STATIC_QUERIES.filter(r => r.cited).length;
  const total      = STATIC_QUERIES.length;
  const pct        = (citedCount / total) * 100;

  return (
    <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 64px rgba(0,0,0,0.55)", display: "flex" }}>

      {/* dark sidebar */}
      <div style={{ width: "136px", background: "#0f0f0f", flexShrink: 0, padding: "10px", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "0" }}>
        {/* top bar */}
        <div style={{ marginBottom: "10px" }}>
          <p style={{ ...MONO_CSS, fontSize: "6px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", marginBottom: "5px" }}>WORKSPACE</p>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "7px" }} />
          <p style={{ ...MONO_CSS, fontSize: "6px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", marginBottom: "3px" }}>CLIENT</p>
          <div style={{ ...SANS, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", marginBottom: "7px" }}>
            <span style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.8)" }}>BLOOM & GIVE</span>
            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.22)" }}>▾</span>
          </div>
          <p style={{ ...MONO_CSS, fontSize: "6px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", marginBottom: "3px" }}>REPORTING WEEK</p>
          <div style={{ ...SANS, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", marginBottom: "4px" }}>
            <span style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.8)" }}>JUN 1 — JUN 7, 2026</span>
            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.22)" }}>▾</span>
          </div>
          <p style={{ ...SANS, fontSize: "7px", color: "rgba(255,255,255,0.18)", marginBottom: "10px" }}>June 1 – 7, 2026 · 1 week tracked</p>
        </div>

        {/* search console metrics preview */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "8px" }}>
          <p style={{ ...MONO_CSS, fontSize: "6px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", marginBottom: "6px" }}>SEARCH CONSOLE</p>
          {[["IMPRESSIONS", "2,847", "+12%"], ["CLICKS", "134", "+8%"], ["AVG. CTR", "4.7%", "+0.3%"]].map(([label, val, delta]) => (
            <div key={label as string} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ ...MONO_CSS, fontSize: "5.5px", color: "rgba(255,255,255,0.3)" }}>{label}</span>
              <div style={{ textAlign: "right" }}>
                <span style={{ ...MONO_CSS, fontSize: "8px", color: "rgba(255,255,255,0.7)", display: "block", lineHeight: 1.2 }}>{val}</span>
                <span style={{ ...MONO_CSS, fontSize: "5.5px", color: "rgba(255,255,255,0.35)" }}>{delta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* light report */}
      <div style={{ flex: 1, background: "#f6f4f0", padding: "12px 14px", overflow: "hidden" }}>
        {/* branding line */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "6px" }}>
          <span style={{ ...MONO_CSS, fontSize: "6.5px", color: "#bbb", letterSpacing: "0.1em" }}>Victory Velocity</span>
        </div>

        {/* report head */}
        <p style={{ ...MONO_CSS, fontSize: "6.5px", color: "#999", letterSpacing: "0.12em", marginBottom: "2px" }}>GEO · WEEKLY PERFORMANCE REPORT</p>
        <p style={{ ...DISPLAY_CSS, fontSize: "20px", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.0, marginBottom: "2px" }}>Bloom & Give</p>
        <p style={{ ...DISPLAY_CSS, fontStyle: "italic", fontSize: "9.5px", color: "#888", marginBottom: "1px" }}>June 1 – 7, 2026</p>
        <p style={{ ...MONO_CSS, fontSize: "6px", color: "#bbb", letterSpacing: "0.06em", marginBottom: "9px" }}>BLOOMANDGIVE.CA · PREPARED BY VICTORY VELOCITY</p>

        {/* citation tracker */}
        <p style={{ ...MONO_CSS, fontSize: "6.5px", color: "#999", letterSpacing: "0.1em", marginBottom: "5px" }}>GEO VISIBILITY — AI ENGINE CITATIONS</p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{ ...DISPLAY_CSS, fontSize: "26px", fontWeight: 300, color: "#1a1a1a", lineHeight: 1, flexShrink: 0 }}>
            {citedCount}<span style={{ fontSize: "14px", color: "#aaa" }}> / {total}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...MONO_CSS, fontSize: "6px", color: "#bbb", letterSpacing: "0.1em", marginBottom: "3px" }}>QUERIES CITED</p>
            <div style={{ height: "3px", background: "#e5e2dc", borderRadius: "2px", overflow: "hidden", marginBottom: "3px" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "#1a1a1a", borderRadius: "2px" }} />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {([["■", "#1a1a1a", "CITED"], ["■", "#bbb", "PARTIAL"], ["■", "#e5e2dc", "NOT YET"]] as [string, string, string][]).map(([sym, col, lbl]) => (
                <span key={lbl} style={{ ...MONO_CSS, fontSize: "5.5px", color: "#bbb", display: "flex", alignItems: "center", gap: "2px" }}>
                  <span style={{ color: col }}>{sym}</span>{lbl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* query table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 58px 46px", gap: "0 5px", marginBottom: "3px", paddingBottom: "3px", borderBottom: "1px solid #ddd" }}>
          {["QUERY", "ENGINE", "CITED?"].map(h => (
            <span key={h} style={{ ...MONO_CSS, fontSize: "6px", color: "#bbb", letterSpacing: "0.1em" }}>{h}</span>
          ))}
        </div>
        {STATIC_QUERIES.map((row, i) => (
          <div
            key={i}
            style={{ display: "grid", gridTemplateColumns: "1fr 58px 46px", gap: "0 5px", padding: "3px 0", borderBottom: "1px solid rgba(0,0,0,0.04)", alignItems: "center" }}
          >
            <span style={{ ...DISPLAY_CSS, fontStyle: "italic", fontSize: "8.5px", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.q}</span>
            <span style={{ ...MONO_CSS, fontSize: "6.5px", color: "#888" }}>{row.engine}</span>
            <span style={{ ...MONO_CSS, fontSize: "6px", padding: "1px 4px", borderRadius: "2px", background: row.cited ? "rgba(0,0,0,0.07)" : "transparent", border: row.cited ? "none" : "1px solid #ddd", color: row.cited ? "#1a1a1a" : "#bbb", textAlign: "center" }}>
              {row.cited ? "CITED" : "NOT YET"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// NETWORK DIAGRAM — abstract node/edge graph for hero
// ════════════════════════════════════════════════════════════

// [x, y, radius, pulseDuration, pulseDelay, isHub]
type NodeDef = [number, number, number, number, number, boolean];

const NET_NODES: NodeDef[] = [
  [400, 225, 5.0, 3.0, 0.0,  true ],  // 0 central hub
  [200, 108, 3.0, 3.8, 0.6,  false],  // 1
  [352, 82,  2.5, 4.2, 1.2,  false],  // 2
  [512, 118, 4.0, 3.5, 0.3,  true ],  // 3
  [658, 88,  2.5, 4.0, 1.8,  false],  // 4
  [706, 208, 3.0, 3.2, 0.9,  false],  // 5
  [718, 322, 2.5, 4.5, 2.1,  false],  // 6
  [626, 392, 3.0, 3.7, 0.4,  false],  // 7
  [476, 410, 2.5, 4.1, 1.5,  false],  // 8
  [316, 400, 3.0, 3.3, 2.4,  false],  // 9
  [166, 362, 2.5, 4.3, 0.7,  false],  // 10
  [92,  252, 3.0, 3.6, 1.0,  false],  // 11
  [108, 148, 2.5, 4.0, 2.0,  false],  // 12
  [260, 190, 3.5, 3.9, 0.2,  true ],  // 13
  [554, 282, 3.5, 3.4, 1.7,  true ],  // 14
];

const NET_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 13], [0, 14],   // 0-4
  [1, 12], [1, 13],                              // 5-6
  [2, 3],                                        // 7
  [3, 4], [3, 14],                               // 8-9
  [4, 5], [5, 6], [5, 14],                       // 10-12
  [6, 7], [7, 8], [7, 14],                       // 13-15
  [8, 9], [9, 0], [9, 10],                       // 16-18
  [10, 11], [11, 12], [12, 13],                  // 19-21
];

// which edge indices get a traveling signal + their timing
const SIGNALS: { ei: number; dur: number; begin: number }[] = [
  { ei: 0,  dur: 4.0, begin: 0.0 },
  { ei: 3,  dur: 3.5, begin: 1.3 },
  { ei: 8,  dur: 5.0, begin: 2.6 },
  { ei: 11, dur: 3.8, begin: 0.5 },
  { ei: 13, dur: 4.5, begin: 1.8 },
  { ei: 17, dur: 3.2, begin: 3.1 },
  { ei: 19, dur: 4.8, begin: 0.9 },
  { ei: 21, dur: 3.6, begin: 2.2 },
];

export function NetworkDiagram() {
  return (
    <svg
      viewBox="0 0 800 450"
      width="100%"
      height="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <defs>
        {NET_EDGES.map(([a, b], i) => (
          <path
            key={i}
            id={`vve${i}`}
            d={`M ${NET_NODES[a][0]} ${NET_NODES[a][1]} L ${NET_NODES[b][0]} ${NET_NODES[b][1]}`}
          />
        ))}
      </defs>

      {/* edges */}
      {NET_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NET_NODES[a][0]} y1={NET_NODES[a][1]}
          x2={NET_NODES[b][0]} y2={NET_NODES[b][1]}
          stroke="rgba(255,255,255,0.11)"
          strokeWidth="0.8"
        />
      ))}

      {/* traveling signal dots */}
      {SIGNALS.map(({ ei, dur, begin }, i) => (
        <circle key={i} r="2" fill="rgba(255,255,255,0.7)">
          <animateMotion
            dur={`${dur}s`}
            repeatCount="indefinite"
            begin={`${begin}s`}
          >
            <mpath href={`#vve${ei}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;0.7;0.7;0"
            keyTimes="0;0.08;0.9;1"
            dur={`${dur}s`}
            repeatCount="indefinite"
            begin={`${begin}s`}
          />
        </circle>
      ))}

      {/* nodes */}
      {NET_NODES.map(([x, y, r, dur, delay, isHub], i) => (
        <g key={i}>
          {isHub && (
            <>
              <circle cx={x} cy={y} r={r + 12} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1">
                <animate attributeName="r"       values={`${r+10};${r+16};${r+10}`} dur={`${dur*1.6}s`} begin={`${delay}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                <animate attributeName="opacity" values="0.07;0.02;0.07"            dur={`${dur*1.6}s`} begin={`${delay}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
              </circle>
              <circle cx={x} cy={y} r={r + 5} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8">
                <animate attributeName="opacity" values="0.12;0.04;0.12" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
              </circle>
            </>
          )}
          <circle cx={x} cy={y} r={r} fill="rgba(255,255,255,0.82)">
            <animate
              attributeName="opacity"
              values="0.3;0.85;0.3"
              dur={`${dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="r"
              values={`${r};${r + 1.2};${r}`}
              dur={`${dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
