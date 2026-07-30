/**
 * The claim, then one number for it. Two beats, nothing else.
 *
 * This sits immediately under the hero: ranking is not being named, and the
 * channel that does the naming is growing fast.
 *
 * One statistic, not several. The number has to say the new channel is rising
 * — not that the old one is declining, which a reader already feels. Do not
 * adjust the figure, and do not add a second one without a checkable citation.
 *
 * Every line here earns its place or goes. Adobe measured US retail sites, so
 * the scope and the start date live in the citation rather than in the claim:
 * that keeps the claim readable in one pass without overstating the study, and
 * puts the qualifiers where a skeptical reader already looks for them.
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

        <figure className="proof rv d2">
          <p className="proof-line">
            <span className="proof-figure">
              14<span className="proof-x">×</span>
            </span>
            <span className="proof-claim">more clicks from AI answers.</span>
          </p>
          <a
            className="proof-cite"
            href="https://www.digitalcommerce360.com/2026/06/17/adobe-ai-referred-traffic-to-retail-sites-doubles-in-a-year/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adobe Analytics · US retail sites · since Oct 2024
          </a>
        </figure>
      </div>
    </section>
  );
}
