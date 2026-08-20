"use client";

import { useRef } from "react";
import { useMarqueeHighlight } from "./useMarqueeHighlight";
import { ENGINE_ICONS } from "./EngineIcons";

const ENGINES = ["Claude", "Perplexity", "ChatGPT", "DeepSeek", "Gemini", "Grok"] as const;
const SEQ = [...ENGINES, ...ENGINES];

export function Hero() {
  const topTrack = useRef<HTMLDivElement>(null);

  useMarqueeHighlight(topTrack, "left", ENGINES.length);

  return (
    <header className="hero">
      <div className="wrap">
        <h1>Be the answer,<br /><span className="it">everywhere</span> they ask.</h1>
      </div>

      <div className="marquee-band" aria-hidden="true">
        <div className="marquee">
          <div className="track" ref={topTrack}>
            {SEQ.map((e, i) => {
              const Icon = ENGINE_ICONS[e];
              return (
                <span key={i} className="eng" aria-label={e}>
                  <Icon />
                  <span className="star">✦</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="hero-foot">
          <a
            href="https://cal.com/kaden-yeung-bgczdf/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="cta solid hero-cta"
          >
            Book a call <span className="arr">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
