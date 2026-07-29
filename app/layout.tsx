import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk, IBM_Plex_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victory Velocity | Be the answer, everywhere they ask.",
  description:
    "Victory Velocity helps brands get cited in AI answers and running on ChatGPT Ads. We handle Generative Engine Optimization, ChatGPT Ads setup, and weekly AI visibility tracking.",
  metadataBase: new URL("https://www.victoryvelocity.ca"),
  openGraph: {
    title: "Victory Velocity | Be the answer, everywhere they ask.",
    description:
      "Victory Velocity helps brands get cited in AI answers and running on ChatGPT Ads.",
    url: "https://www.victoryvelocity.ca",
    siteName: "Victory Velocity",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victory Velocity | Be the answer, everywhere they ask.",
    description:
      "Victory Velocity helps brands get cited in AI answers and running on ChatGPT Ads.",
  },
  alternates: {
    canonical: "https://www.victoryvelocity.ca",
  },
  other: {
    "msvalidate.01": "B51F27CD7C8EA461EAA0CD6AFC3B7246",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Victory Velocity",
      "url": "https://www.victoryvelocity.ca",
    },
    {
      "@type": "Organization",
      "@id": "https://www.victoryvelocity.ca/#organization",
      "name": "Victory Velocity",
      "url": "https://www.victoryvelocity.ca",
      "description": "Victory Velocity helps brands get cited in AI answers and running on ChatGPT Ads. We handle Generative Engine Optimization, ChatGPT Ads setup, and weekly AI visibility tracking.",
      "email": "128kaden@gmail.com",
      "areaServed": "Worldwide",
      "foundingDate": "2026",
    },
    {
      "@type": "Service",
      "name": "Generative Engine Optimization",
      "description": "We build the technical foundation and content architecture that makes AI engines reach for your brand when customers ask relevant questions. Schema markup, topic clusters, AI visibility tracking.",
      "provider": { "@id": "https://www.victoryvelocity.ca/#organization" },
      "areaServed": "Worldwide",
      "url": "https://www.victoryvelocity.ca/#services",
    },
    {
      "@type": "Service",
      "name": "ChatGPT Ads Management",
      "description": "We set up and manage campaigns on OpenAI's native ad platform. Conversation-context targeting reaches users mid-thought, before a shortlist forms, inside the fastest-growing discovery channel on the internet.",
      "provider": { "@id": "https://www.victoryvelocity.ca/#organization" },
      "areaServed": "Worldwide",
      "url": "https://www.victoryvelocity.ca/#services",
    },
    {
      "@type": "Service",
      "name": "Weekly AI Visibility Tracking",
      "description": "We run prompt checks across ChatGPT, Perplexity, and Google AI Overviews every week and report on where your brand appears, what context it appears in, and what's moved.",
      "provider": { "@id": "https://www.victoryvelocity.ca/#organization" },
      "areaServed": "Worldwide",
      "url": "https://www.victoryvelocity.ca/#services",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is generative engine optimization?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generative Engine Optimization (GEO) builds the technical foundation and content architecture that makes AI engines cite your brand when customers ask relevant questions. Where traditional SEO targets search rankings, GEO ensures your brand appears in AI-generated answers across ChatGPT, Perplexity, Google AI Overviews, and more — because when someone asks AI for the best option, they get one answer, not ten blue links.",
          },
        },
        {
          "@type": "Question",
          "name": "How does ChatGPT Ads targeting work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChatGPT Ads use conversation-context targeting to reach users mid-thought, before a shortlist forms. Ads are matched to the topic and intent of what the user is actively asking, placing your brand inside ChatGPT's native interface at the exact moment a buyer is seeking a recommendation — the fastest-growing discovery channel on the internet.",
          },
        },
        {
          "@type": "Question",
          "name": "What AI engines do you optimize for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We optimize for every major generative engine — ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, and more as new models emerge. Our content and authority signals are built for how all leading generative models decide who to cite, not just the ones that exist today.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you track AI visibility week to week?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We run systematic prompt checks across ChatGPT, Perplexity, Google AI Overviews, and other major generative engines every week. Each report shows where your brand appears, the context it appears in, and what has changed since the prior week — giving you a clear read on your AI citation standing and a recommended next action.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${cormorant.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual'` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
