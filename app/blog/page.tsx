import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Blog | Victory Velocity",
  description: "Insights on generative engine optimization, ChatGPT Ads, and AI-powered brand discovery.",
  alternates: { canonical: "https://www.victoryvelocity.ca/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <SiteNav />

      <main>
        <div className="blog-wrap-wide">
          <div className="blog-index">
            <h1 className="blog-index-heading">
              From the <em>field</em>.
            </h1>

            <div className="post-list">
              <Link
                href="/blog/the-biggest-shift-in-marketing-since-google-ads"
                className="post-card"
              >
                <div className="post-card-meta">
                  Kaden Yeung&nbsp;&nbsp;·&nbsp;&nbsp;June 2026&nbsp;&nbsp;·&nbsp;&nbsp;14 min read
                </div>
                <h2 className="post-card-title">
                  The Biggest Shift in Marketing Since Google Ads
                </h2>
                <p className="post-card-excerpt">
                  AI is rewriting how customers discover brands. A practical breakdown of generative
                  engine optimization and ChatGPT ads.
                </p>
                <span className="post-card-read">Read article →</span>
              </Link>
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
