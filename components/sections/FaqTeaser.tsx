const FAQS = [
  {
    q: "What does Victory Velocity actually do?",
    a: "We get your brand named when someone asks an AI engine for a recommendation in your category. That means measuring where you currently stand, fixing what stops AI engines reading your site, building your presence in the places those answers draw from, and re-running the whole thing on a cycle so you can see it move.",
  },
  {
    q: "How is this different from SEO?",
    a: "SEO competes for a position in a list of links. We compete to be inside a single generated answer. The work overlaps in places, because a site AI engines cannot read will not get cited either, but the target is different: not a ranking, a mention.",
  },
  {
    q: "What is in the technical audit?",
    a: "It starts with whether the seven major AI crawlers are allowed to read your site at all: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended and CCBot. Then sitemaps, schema markup, meta titles and descriptions, canonicals, HTTPS and mixed content, broken links, image alt text, and page speed. Every page runs through the same battery. On a recent client site that came to 222 individual checks.",
  },
  {
    q: "Do you make changes to my site yourself?",
    a: "Not automatically. Findings become action cards with a risk rating and exact step-by-step instructions for your platform. You approve the ones you want, we apply them, and then we re-run the audit to verify the fix actually landed. Nothing changes on your site without your say-so.",
  },
  {
    q: "How do you prove anything actually improved?",
    a: "Re-measurement. Because we re-run the same intents against the same engines on a cycle, movement is measured rather than asserted. You see visibility change per intent and per category, your position against each competitor, and which fixes were verified. If something regressed, that shows up too.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your website, the competitors you actually care about, and half an hour to talk through how customers describe what you sell. We build the intent set from that and run the first measurement.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function FaqTeaser() {
  return (
    <section className="faq sec-pad" id="faq">
      <div className="wrap">
        <h2 className="faq-heading rv">Questions.</h2>
        <div className="faq-list">
          {FAQS.map(({ q, a }, index) => (
            <details key={index} className="faq-item rv">
              <summary>
                <span className="faq-q">{q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p className="faq-body">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
