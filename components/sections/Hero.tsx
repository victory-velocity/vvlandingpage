"use client";

import { useRef } from "react";
import { useMarqueeHighlight } from "./useMarqueeHighlight";

const ENGINES = ["ChatGPT", "Claude", "Perplexity", "Gemini", "Copilot", "Grok", "Meta AI", "DeepSeek"];
const SEQ = [...ENGINES, ...ENGINES];

export function Hero() {
  const topTrack = useRef<HTMLDivElement>(null);
  const bottomTrack = useRef<HTMLDivElement>(null);

  useMarqueeHighlight(topTrack, "left", ENGINES.length);
  useMarqueeHighlight(bottomTrack, "right", ENGINES.length);

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
          <div className="track" ref={topTrack}>
            {SEQ.map((e, i) => (
              <span key={i} className="eng">
                {e}<span className="star">✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="marquee">
          <div className="track rev" ref={bottomTrack}>
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
