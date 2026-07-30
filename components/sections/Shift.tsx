import { AnswerCollapse } from "./AnswerCollapse";

export function Shift() {
  return (
    <section className="shift sec-pad">
      <div className="wrap">
        <p className="big rv d1">
          Your customers stopped searching.<br />
          <span className="dim">They started </span>
          <span className="it swipe">asking</span>
          <span className="dim">.</span>
        </p>

        {/* Sits as the right cell of the body row, so its edges align with the
            type by construction rather than by tuned values. */}
        <div className="shift-row">
          <p className="body rv d2">
            When someone asks ChatGPT, Perplexity, or Google&apos;s AI for the best option,
            they get one answer instead of ten blue links. If the model doesn&apos;t name you,
            you&apos;re not in the conversation. We make sure your brand is the one it reaches for.
          </p>
          <AnswerCollapse />
        </div>
      </div>
    </section>
  );
}
