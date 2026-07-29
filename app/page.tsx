"use client";

import { useState, useEffect } from "react";
import React from "react";
import { GEOVisual, AdsManagerVisual, WeeklyReportVisual } from "@/components/ServiceVisuals";
import { SiteNav } from "@/components/SiteNav";

const ENGINES = ["ChatGPT", "Claude", "Perplexity", "Gemini", "Copilot", "Grok", "Meta AI", "DeepSeek"];
const SEQ = [...ENGINES, ...ENGINES];
const HOT_A = 2; // Perplexity is highlighted in top strip

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", url: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    // scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.url) return;
    if (!/.+@.+\..+/.test(form.email)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `Website: ${form.url}\n\n${form.message || "(no message)"}`,
        }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("idle");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <>
      <SiteNav />

      {/* ── HERO ── */}
      <header className="hero">
        <div className="wrap">
          <h1>Be the answer,<br /><span className="it">everywhere</span> they ask.</h1>
          <p className="hero-sub">We get brands cited in AI answers — and running on ChatGPT Ads.</p>
        </div>

        <div className="marquee-band" aria-hidden="true">
          <div className="marquee">
            <div className="track">
              {SEQ.map((e, i) => (
                <span key={i} className={`eng${i % ENGINES.length === HOT_A ? " hot" : ""}`}>
                  {e}<span className="star">✦</span>
                </span>
              ))}
            </div>
          </div>
          <div className="marquee">
            <div className="track rev">
              {SEQ.map((e, i) => (
                <span key={i} className="eng">
                  {e}<span className="star">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="hero-foot">
            <a href="#contact" className="cta solid">Work With Us <span className="arr">→</span></a>
          </div>
        </div>
      </header>

      {/* ── SHIFT ── */}
      <section className="shift sec-pad">
        <div className="wrap">
          <p className="big rv d1">
            Your customers stopped searching.<br />
            <span className="dim">They started </span>
            <span className="it swipe">asking</span>
            <span className="dim">.</span>
          </p>
          <p className="body rv d2">
            When someone asks ChatGPT, Perplexity, or Google&apos;s AI for the best option,
            they get one answer — not ten blue links. If the model doesn&apos;t name you,
            you&apos;re not in the conversation. We make sure your brand is the one it reaches for.
          </p>
        </div>
      </section>

      {/* ── WAYS ── */}
      <section className="ways sec-pad" id="services">
        <div className="wrap">
          <div className="head">
            <h2 className="rv">
              <span className="lead-in">What we do for you —</span>
              Three ways to win the<br /><span className="it">generative</span> front door.
            </h2>
          </div>

          <div className="way-list">

            {/* 01 · GEO */}
            <div className="way">
              <div className="way-copy rv">
                <div className="way-no">01 — Generative Engine Optimization</div>
                <h3>Get cited in <span className="it">AI answers</span>.</h3>
                <p>
                  We build the technical foundation and content architecture that makes AI
                  engines reach for your brand when customers ask relevant questions.
                  Schema markup, topic clusters, AI visibility tracking.
                </p>
              </div>
              <div className="way-vis rv d1">
                <GEOVisual />
              </div>
            </div>

            {/* 02 · ChatGPT Ads */}
            <div className="way">
              <div className="way-copy rv">
                <div className="way-no">02 — ChatGPT Ads</div>
                <h3>Reach customers<br />before they <span className="it">decide</span>.</h3>
                <p>
                  We set up and manage campaigns on OpenAI&apos;s native ad platform.
                  Conversation-context targeting reaches users mid-thought, before a shortlist
                  forms, inside the fastest-growing discovery channel on the internet.
                </p>
              </div>
              <div className="way-vis rv d1">
                <AdsManagerVisual />
              </div>
            </div>

            {/* 03 · Weekly Tracking */}
            <div className="way">
              <div className="way-copy rv">
                <div className="way-no">03 — Weekly Tracking</div>
                <h3>Know exactly<br />where you <span className="it">stand</span>.</h3>
                <p>
                  We run prompt checks across ChatGPT, Perplexity, Google AI Overviews,
                  and every major generative engine every week — reporting on where your brand
                  appears, what context it appears in, and what&apos;s moved.
                </p>
              </div>
              <div className="way-vis rv d1">
                <WeeklyReportVisual />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process sec-pad" id="process">
        <div className="wrap">
          <h2
            className="rv d1"
            style={{
              fontFamily: "var(--serif)", fontWeight: 400,
              fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.02,
              letterSpacing: "-0.02em", margin: "0 0 64px", maxWidth: "640px",
            }}
          >
            <span className="lead-in">How we&apos;ll work together —</span>
            A clear path from <span style={{ fontStyle: "italic" }}>invisible</span> to inevitable.
          </h2>
          <div className="steps">
            <div className="step rv">
              <div className="sn">01</div>
              <div><h4>Map the <span className="it">prompts</span></h4></div>
              <p>We find the real questions your buyers ask AI — and benchmark exactly where you stand against the brands getting named today.</p>
            </div>
            <div className="step rv">
              <div className="sn">02</div>
              <div><h4>Build the <span className="it">signals</span></h4></div>
              <p>Content, structure, and authority signals tuned to how generative engines decide who to cite — published where models look.</p>
            </div>
            <div className="step rv">
              <div className="sn">03</div>
              <div><h4>Run the <span className="it">ads</span></h4></div>
              <p>Paid placement inside conversational search, so you capture intent the instant a buyer asks — not pages later.</p>
            </div>
            <div className="step rv">
              <div className="sn">04</div>
              <div><h4>Report &amp; <span className="it">iterate</span></h4></div>
              <p>Weekly visibility checks across every engine, with a clear read on what changed and the next move to make.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq sec-pad">
        <div className="wrap">
          <h2 className="faq-heading rv">FAQ</h2>
          <div className="faq-list">
            {[
              {
                q: "What is generative engine optimization?",
                a: "When someone asks ChatGPT or Perplexity a question, the engine builds one answer from a set of sources. Your brand is either in that answer or it isn't. GEO is the work of making sure your brand is the one it reaches for.",
              },
              {
                q: "How does ChatGPT Ads targeting work?",
                a: "ChatGPT ads don't use keywords. Advertisers describe the types of conversations they want their ad to appear in, and OpenAI matches them to users mid-conversation in real time. The ad appears beneath ChatGPT's organic answer and never influences what it says.",
              },
              {
                q: "What AI engines do you optimize for?",
                a: "ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, and DeepSeek.",
              },
              {
                q: "How does Victory Velocity help your brand?",
                a: "We build the technical foundation and content that gets your brand cited in AI answers, and we run ChatGPT ad campaigns that reach customers before a decision is made. The two compound on each other.",
              },
              {
                q: "How fast should you expect to see results?",
                a: "AI visibility takes longer to move than traditional SEO. Results are measured in weeks because AI engines update their retrieval indexes on their own schedules. We track progress so you always know what's changed.",
              },
              {
                q: "How do you get started?",
                a: "Book a free intro call. No commitment, no pitch. We learn about your brand, tell you where you stand in AI today, and figure out together whether we're the right fit.",
              },
            ].map(({ q, a }, i) => (
              <details key={i} className="faq-item rv">
                <summary>
                  <span className="faq-q">{q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="close" id="contact">
        <div className="wrap">
          <h2 className="rv">Win the <span className="it">answer</span>.</h2>
          <p className="sub rv d1">
            Tell us about your brand. We&apos;ll show you where you stand in AI today — and how fast we can change it.
          </p>

          <form className="cform rv d2" onSubmit={handleSubmit} noValidate>
            {status !== "sent" ? (
              <>
                <div className="grid2">
                  <div className="cf">
                    <label htmlFor="cf-name">Name</label>
                    <input
                      id="cf-name" name="name" type="text" placeholder="Jane Mercer" required
                      value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div className="cf">
                    <label htmlFor="cf-email">Work email</label>
                    <input
                      id="cf-email" name="email" type="email" placeholder="jane@brand.com" required
                      value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="cf">
                  <label htmlFor="cf-url">Brand website</label>
                  <input
                    id="cf-url" name="url" type="text" placeholder="brand.com" required
                    value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                  />
                </div>
                <div className="cf">
                  <label htmlFor="cf-msg">What can we help with?</label>
                  <textarea
                    id="cf-msg" name="message" rows={3}
                    placeholder="Tell us a bit about your brand and what you&apos;re looking for."
                    value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />
                </div>
                <div className="submit-row">
                  <button type="submit" className="cta solid" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : <>Request your AI visibility audit <span className="arr">→</span></>}
                  </button>
                </div>
              </>
            ) : (
              <div className="cform-thanks">
                <p className="tk">Request received.</p>
                <p>
                  We&apos;re already pulling your brand&apos;s current standing across the major engines.
                  Expect a note from us within one business day.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="wrap">
          <div className="foot-row">
            <div className="mark">Victory&nbsp;Velocity</div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "var(--faint)", fontStyle: "italic", margin: "0 0 8px", lineHeight: 1.5, fontFamily: "var(--serif)", fontSize: "15px" }}>
                AI visibility &amp; advertising for brands that intend to be cited.
              </p>
              <span style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--faint)" }}>© 2026 Victory Velocity</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
