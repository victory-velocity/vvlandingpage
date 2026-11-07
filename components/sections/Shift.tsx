import { CitationDemo } from "./CitationDemo";
import { SparkleField } from "./SparkleField";

const STATS = [
  {
    figure: "Rank Position 1",
    desc: "Four non-branded search queries went from unranked to #1 on Google in two months.",
  },
  {
    figure: "3.1×",
    desc: "Google impressions grew 3.1x after average position across four competitor queries dropped from 4.3 to 1.5.",
  },
  {
    figure: "54%",
    desc: "Mention rate climbed as high as 54% on Gemini and ChatGPT over seven weeks.",
  },
  {
    figure: "49%",
    desc: "Citation rate rose 49% on Claude and ChatGPT, on prompts where competitors had previously been the ones cited.",
  },
];

export function Shift() {
  return (
    <section className="shift sec-pad">
      <div className="wrap">
        <blockquote className="big rv d1">
          &ldquo;[Victory Velocity] are the first people who offered to actually do it,
          instead of handing me another list.&rdquo;
          <cite>
            &mdash;{" "}
            <a
              href="https://soundelitetheatres.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="testimonial-link"
            >
              Sound Elite Theatres
              <span className="testimonial-link-arrow" aria-hidden="true">↗</span>
            </a>
          </cite>
        </blockquote>

        <div className="shift-grid">
          <div className="proof-col rv d2">
            <p className="proof-label">In the past 6 months, we had managed to:</p>
            <div className="proof-stats">
              {STATS.map(({ figure, desc }) => (
                <div className="proof-stat" key={figure}>
                  <span className="proof-stat-figure">{figure}</span>
                  <p className="proof-stat-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cd-col rv d3">
            <SparkleField />
            <CitationDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
