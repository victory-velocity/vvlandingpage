import { RankVsCitation } from "./RankVsCitation";

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
        <p className="body rv d2">
          Ranking first no longer means being named. AI engines don&apos;t hand back
          your page, they hand back an answer assembled from other people&apos;s. You
          can sit at position one on Google and appear nowhere in what ChatGPT says
          about your category.
        </p>

        <div className="rv d3">
          <RankVsCitation />
        </div>
      </div>
    </section>
  );
}
