"use client";

import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { Shift } from "@/components/sections/Shift";
import { AgencyAnchor } from "@/components/sections/AgencyAnchor";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteNav />
      <Hero />
      <Shift />
      <AgencyAnchor />

      {/* Method section lands here in Task 8 */}

      {/* FAQ teaser replaces this inline block in Task 9 */}
      <section className="faq sec-pad">
        <div className="wrap">
          <h2 className="faq-heading rv">Questions.</h2>
          <div className="faq-list">
            {[
              {
                q: "How is this different from SEO?",
                a: "SEO competes for a position in a list of links. We compete to be inside a single generated answer.",
              },
              {
                q: "Which AI engines do you measure?",
                a: "ChatGPT, Claude, Gemini and Perplexity. Every intent runs through all four.",
              },
              {
                q: "Do you make changes to my site yourself?",
                a: "Not automatically. You approve each fix, we apply it, then we re-run the audit to verify it landed.",
              },
              {
                q: "How do you prove anything improved?",
                a: "Re-measurement against the same intents and engines, so movement is measured rather than asserted.",
              },
              {
                q: "How do I reach you?",
                a: "A shared channel you can use any time, and a call whenever something needs walking through.",
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

      <Contact />

      <footer>
        <div className="wrap">
          <div className="foot-row">
            <div className="mark">Victory&nbsp;Velocity</div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "var(--faint)", fontStyle: "italic", margin: "0 0 8px", lineHeight: 1.5, fontFamily: "var(--serif)", fontSize: "15px" }}>
                AI visibility for brands that intend to be cited.
              </p>
              <span style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--faint)" }}>© 2026 Victory Velocity</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
