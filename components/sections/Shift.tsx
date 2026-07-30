import { DotField } from "./DotField";
export function Shift() {
  return (
    <section className="shift sec-pad">
      <DotField variant="shift" seed={1} />
      <div className="wrap">
        <p className="big rv d1">
          Your customers stopped searching.<br />
          <span className="dim">They started </span>
          <span className="it swipe">asking</span>
          <span className="dim">.</span>
        </p>
        <p className="body rv d2">
          When someone asks ChatGPT, Perplexity, or Google&apos;s AI for the best option,
          they get one answer instead of ten blue links. If the model doesn&apos;t name you,
          you&apos;re not in the conversation. We make sure your brand is the one it reaches for.
        </p>
      </div>
    </section>
  );
}
