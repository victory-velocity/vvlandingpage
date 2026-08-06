const STATS = [
  {
    figure: "Position 1",
    desc: "Four non-branded search queries went from unranked to #1 on Google in two months.",
  },
  {
    figure: "3.1×",
    desc: "Google impressions grew 3.1x after average position across four competitor queries dropped from 4.3 to 1.5.",
  },
  {
    figure: "54%",
    desc: "Citation rate climbed as high as 54% on Gemini and ChatGPT over seven weeks.",
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
        <div className="shift-grid">
          <p className="big rv d1">
            You can rank first<br />
            <span className="dim">and still not be </span>
            <span className="it swipe">named</span>
            <span className="dim">.</span>
          </p>

          <div className="proof-col rv d2">
            <p className="proof-label">Results we&rsquo;ve delivered for clients</p>
            <div className="proof-stats">
              {STATS.map(({ figure, desc }) => (
                <div className="proof-stat" key={figure}>
                  <span className="proof-stat-figure">{figure}</span>
                  <p className="proof-stat-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
