import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Blog — Victory Velocity",
  description: "Articles on generative engine optimization, ChatGPT Ads, and AI-powered brand discovery — written by the Victory Velocity team in Vancouver.",
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
                href="/blog/sound-elite-theatres-case-study"
                className="post-card"
              >
                <div className="post-card-meta">
                  Jared Shum&nbsp;&nbsp;·&nbsp;&nbsp;September 2026&nbsp;&nbsp;·&nbsp;&nbsp;6 min read
                </div>
                <h2 className="post-card-title">
                  Ranking on Google, invisible in AI answers
                </h2>
                <p className="post-card-excerpt">
                  Sound Elite Theatres was already doing fine in search. Inside the AI
                  engines it was barely named. What we measured, what moved, and what
                  is still open.
                </p>
                <span className="post-card-read">Read article →</span>
              </Link>

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

      <SiteFooter />
    </>
  );
}
