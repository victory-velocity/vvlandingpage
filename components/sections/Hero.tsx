"use client";

import { useEffect, useRef } from "react";

const ENGINES = ["ChatGPT", "Claude", "Perplexity", "Gemini", "Copilot", "Grok", "Meta AI", "DeepSeek"];
const SEQ = [...ENGINES, ...ENGINES];

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  // One engine is lit at a time. It stays lit for its whole journey across the
  // band, and once it leaves, the engine furthest right takes over.
  //
  // This polls positions rather than using IntersectionObserver, because IO does
  // not fire for elements moved by a CSS transform: it only recalculates on
  // scroll, resize or DOM mutation, and this track moves via translateX. Reading
  // sixteen rects five times a second is cheap, and classList is mutated
  // directly so React never re-renders.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(track.querySelectorAll<HTMLElement>(".eng"));
    if (items.length === 0) return;

    // Layout geometry, read once. These are untransformed values so they stay
    // valid while the track animates.
    const layout = items.map((el) => ({ el, x: el.offsetLeft, w: el.offsetWidth }));
    const halfWidth = track.scrollWidth / 2;

    let lit: HTMLElement | null = null;

    const tick = () => {
      // The track translates 0 to -50% linearly, so its offset is a pure
      // function of the animation clock. Reading that is reliable, whereas
      // getBoundingClientRect does not reflect a compositor-driven transform.
      const anim = track.getAnimations()[0];
      const duration = 30000;
      const elapsed = anim ? Number(anim.currentTime ?? 0) : performance.now();
      const shift = -((elapsed % duration) / duration) * halfWidth;

      const onScreen = (item: (typeof layout)[number]) => {
        const left = item.x + shift;
        return left + item.w > 0 && left < window.innerWidth;
      };

      const current = layout.find((item) => item.el === lit);
      if (current && onScreen(current)) return;

      let next: (typeof layout)[number] | null = null;
      for (const item of layout) {
        if (!onScreen(item)) continue;
        if (!next || item.x + shift > next.x + shift) next = item;
      }
      if (!next || next.el === lit) return;
      lit?.classList.remove("hot");
      lit = next.el;
      lit.classList.add("hot");
    };

    tick();
    const id = setInterval(tick, 250);

    return () => {
      clearInterval(id);
      lit?.classList.remove("hot");
    };
  }, []);

  return (
    <header className="hero">
      <div className="wrap">
        <h1>Be the answer,<br /><span className="it">everywhere</span> they ask.</h1>
        <p className="hero-sub">
          A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity.
        </p>
      </div>

      <div className="marquee-band" aria-hidden="true">
        <div className="marquee">
          <div className="track" ref={trackRef}>
            {SEQ.map((e, i) => (
              <span key={i} className="eng">
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
  );
}
