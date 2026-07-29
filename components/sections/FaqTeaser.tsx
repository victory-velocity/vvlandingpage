import Link from "next/link";

const TEASER = [
  {
    q: "How is this different from SEO?",
    a: "SEO competes for a position in a list of links. We compete to be inside a single generated answer.",
  },
  {
    q: "Which AI engines do you measure?",
    a: "ChatGPT, Claude, Gemini and Perplexity. Every intent runs through all four.",
  },
  {
    q: "Do you make changes to my site yourself?",
    a: "Not automatically. You approve each fix, we apply it, then we re-run the audit to verify it landed.",
  },
  {
    q: "How do you prove anything improved?",
    a: "Re-measurement against the same intents and engines, so movement is measured rather than asserted.",
  },
  {
    q: "How do I reach you?",
    a: "A shared channel you can use any time, and a call whenever something needs walking through.",
  },
];

export function FaqTeaser() {
  return (
    <section className="faq sec-pad">
      <div className="wrap">
        <h2 className="faq-heading rv">Questions.</h2>
        <div className="faq-list">
          {TEASER.map(({ q, a }, index) => (
            <details key={index} className="faq-item rv">
              <summary>
                <span className="faq-q">{q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p className="faq-body">{a}</p>
            </details>
          ))}
        </div>
        <Link href="/faq" className="faq-more">Read all questions</Link>
      </div>
    </section>
  );
}
