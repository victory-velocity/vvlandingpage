"use client";

import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Shift } from "@/components/sections/Shift";
import { AgencyAnchor } from "@/components/sections/AgencyAnchor";
import { MethodRows } from "@/components/method/MethodRows";
import { FaqTeaser, faqSchema } from "@/components/sections/FaqTeaser";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteNav />
      <Hero />
      <Shift />
      <MethodRows />
      <AgencyAnchor />

      <FaqTeaser />

      <Contact />

      <SiteFooter />
    </>
  );
}
