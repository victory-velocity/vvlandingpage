import Image from "next/image";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "About | Victory Velocity",
  description:
    "Meet the team behind Victory Velocity — a Canadian AI visibility agency helping brands get cited in AI answers and run ChatGPT Ads campaigns.",
  alternates: { canonical: "https://www.victoryvelocity.ca/about" },
  openGraph: {
    title: "About | Victory Velocity",
    description:
      "Meet the co-founders of Victory Velocity, helping brands get cited in AI answers.",
    url: "https://www.victoryvelocity.ca/about",
    siteName: "Victory Velocity",
  },
};

export default function About() {
  return (
    <>
      <SiteNav />

      <main className="about-page">
        <div className="wrap">

          {/* ── Kaden ── */}
          <div className="about-split">
            <div className="about-left">
              <h1 className="about-name">Kaden Yeung</h1>
              <p className="about-role">Co-Founder &amp; CEO, Victory Velocity</p>
              <div className="about-body">
                <p>
                  I&rsquo;m 18, based in Vancouver, and finishing high school before heading to
                  Queen&rsquo;s University for engineering in the fall.
                </p>
                <p>
                  I got into this space through TKS, a program for young people working on
                  high-impact problems, and an internship at Singularity Health, an AI healthcare
                  startup. Most of what I know about building I learned by watching people figure
                  things out in real time and replicating it myself.
                </p>
                <p>
                  Victory Velocity is my attempt to get ahead of a shift I think is genuinely
                  significant. I could be wrong about the timeline. I don&rsquo;t think I&rsquo;m
                  wrong about the direction.
                </p>
              </div>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/kadeny/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://kadeny.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Substack →
                </a>
              </div>
            </div>

            <div className="about-right">
              <div className="about-photo-wrap">
                <Image
                  src="/kaden.jpg"
                  alt="Kaden Yeung"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="about-divider" />

          {/* ── Jared ── */}
          <div className="about-split">
            <div className="about-left">
              <h2 className="about-name">Jared Shum</h2>
              <p className="about-role">Co-Founder &amp; CTO, Victory Velocity</p>
              <div className="about-body">
                <p>
                  I&rsquo;m based in Vancouver, working at the intersection of machine learning
                  and full-stack engineering, and heading to UBC to study Computer Science & Business 
                  this fall.
                </p>
                <p>
                  Previously worked at an ML startup, I saw firsthand how fast the AI landscape
                  is changing the online browsing experience. What took months of SEO work to
                  rank is now getting rewritten by a language model in seconds, and most brands
                  have no idea it&rsquo;s happening.
                </p>
                <p>
                  At Victory Velocity, I think the shift in how people find information is as
                  much a technical problem as a marketing one. I&rsquo;m here to build the
                  infrastructure that makes the strategy actually stick.
                </p>
              </div>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/jaredyhshum/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://github.com/jyshum"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub →
                </a>
                <a
                  href="https://www.jaredshum.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More About Me →
                </a>
              </div>
            </div>

            <div className="about-right">
              <div className="about-photo-wrap">
                <Image
                  src="/jaredremakesuitpic.png"
                  alt="Jared Shum"
                  fill
                  style={{ objectFit: "cover", objectPosition: "10% 90%", transform: "scale(1.55)", transformOrigin: "72% 60%" }}
                />
              </div>
            </div>
          </div>

        </div>
      </main>

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
