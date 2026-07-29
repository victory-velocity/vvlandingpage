"use client";

import { useState } from "react";
import React from "react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", url: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

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
    <section className="close" id="contact">
      <div className="wrap">
        <h2 className="rv">Win the <span className="it">answer</span>.</h2>
        <p className="sub rv d1">
          Tell us about your brand. We&apos;ll show you where you stand in AI today, and how fast we can change it.
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
  );
}
