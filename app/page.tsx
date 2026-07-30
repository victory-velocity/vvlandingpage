"use client";

import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { Shift } from "@/components/sections/Shift";
import { AgencyAnchor } from "@/components/sections/AgencyAnchor";
import { MethodRows } from "@/components/method/MethodRows";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
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

    // Deep links like /#method jump the browser to the anchor before the
    // observer settles, which leaves everything on screen stuck at opacity 0.
    // Reveal whatever is already in view on the next frame.
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <SiteNav />
      <Hero />
      <Shift />
      <AgencyAnchor />

      <MethodRows />

      <FaqTeaser />

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
