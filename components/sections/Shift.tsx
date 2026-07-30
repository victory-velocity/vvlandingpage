import { RankVsCitation } from "./RankVsCitation";

/**
 * Claim, then third party evidence for it, then a demonstration.
 *
 * Both figures are real and verified at source. Do not adjust either number,
 * and do not add a statistic here without a checkable citation: the whole
 * point of this section is that a prospect can go and confirm it.
 */
export function Shift() {
  return (
    <section className="shift sec-pad">
      <div className="wrap">
        <p className="big rv d1">
          You can rank first<br />
          <span className="dim">and still not be </span>
          <span className="it swipe">named</span>
          <span className="dim">.</span>
        </p>

        <div className="proof rv d2">
          <div className="proof-main">
            <span className="proof-figure">58%</span>
            <p className="proof-claim">
              lower clickthrough rate for the number one result, once Google
              answers the question itself.
            </p>
          </div>
          <a
            className="proof-cite"
            href="https://ahrefs.com/blog/ai-overviews-reduce-clicks-update"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ahrefs, 300,000 keywords, December 2023 against December 2025
          </a>
          <p className="proof-second">
            And 68% of Google searches now end without any click at all.{" "}
            <a
              href="https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SparkToro, June 2026
            </a>
          </p>
        </div>

        <p className="body rv d3">
          Ranking is no longer the same thing as being named. AI engines don&apos;t
          hand back your page, they hand back an answer built from other
          people&apos;s. You can sit at position one and appear nowhere in what
          ChatGPT says about your category.
        </p>

        <div className="rv d3">
          <RankVsCitation />
        </div>
      </div>
    </section>
  );
}
