import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "FAQ | Victory Velocity",
  description:
    "How Victory Velocity measures AI visibility, audits your site, builds authority, and proves movement. Common questions answered.",
  alternates: { canonical: "https://www.victoryvelocity.ca/faq" },
};

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
    q: "Which AI engines do you measure?",
    a: "ChatGPT, Claude, Gemini and Perplexity. Every intent we test runs through all four, so you can see where you are strong on one engine and invisible on another.",
  },
  {
    q: "How do you decide what to test?",
    a: "We build the real set of buying intents for your business rather than guessing at prompts. Each intent is tested across several different phrasings, because people don't all ask the same question the same way, and engines don't answer every phrasing identically.",
  },
  {
    q: "What counts as being visible?",
    a: "Three separate things, tracked separately. Whether you were mentioned at all. Whether you were cited with an actual link to your site. And how strongly you were positioned, which we grade from a passing mention up to being the primary recommendation. A brand can be mentioned often and cited never, and that gap tells us what to work on.",
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
    q: "How fast should I expect results?",
    a: "Slower than paid, and less predictable than traditional SEO. AI engines refresh what they retrieve on their own schedules, so movement arrives in weeks rather than days. What we can promise is that you will always know exactly where you stand, because we measure continuously rather than reporting a guess.",
  },
  {
    q: "How do I reach you?",
    a: "You get a shared channel with us and you can drop a question in it whenever one comes up. When something is too tangled to explain over text, we get on a call. The people answering are the people doing the work.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your website, the competitors you actually care about, and half an hour to talk through how customers describe what you sell. We build the intent set from that and run the first measurement.",
  },
  {
    q: "Do you still run ChatGPT Ads?",
    a: "Yes, as a separate engagement. It is not part of the visibility work described here. If you want to talk about paid placement inside AI assistants, mention it when you get in touch.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Faq() {
  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="faq faq-page">
        <div className="wrap">
          <h1 className="faq-heading">Questions.</h1>
          <div className="faq-list">
            {FAQS.map(({ q, a }, index) => (
              <details key={index} className="faq-item">
                <summary>
                  <span className="faq-q">{q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-body">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
