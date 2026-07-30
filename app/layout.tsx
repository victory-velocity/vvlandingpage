import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk, IBM_Plex_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victory Velocity | Be the answer, everywhere they ask.",
  description:
    "Victory Velocity helps brands get cited in AI answers and run ChatGPT Ads campaigns. We handle GEO, ChatGPT Ads setup, and weekly AI visibility tracking.",
  metadataBase: new URL("https://www.victoryvelocity.ca"),
  openGraph: {
    title: "Victory Velocity | Be the answer, everywhere they ask.",
    description:
      "A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity.",
    url: "https://www.victoryvelocity.ca",
    siteName: "Victory Velocity",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victory Velocity | Be the answer, everywhere they ask.",
    description:
      "A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity.",
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
      "description": "A hands-on agency that gets your brand named by ChatGPT, Claude, Gemini and Perplexity. We measure where you stand, fix what blocks AI engines, build your authority, and prove the movement.",
      "email": "128kaden@gmail.com",
      "areaServed": "Worldwide",
      "foundingDate": "2026",
    },
    {
      "@type": "Service",
      "name": "AI Visibility Measurement",
      "description": "We build the real set of buying intents for your business, test each across multiple phrasings, and measure them against ChatGPT, Claude, Gemini and Perplexity. We record whether your brand is mentioned, whether it is cited with a link, and how strongly it is positioned, alongside the same measurement for your named competitors.",
      "provider": { "@id": "https://www.victoryvelocity.ca/#organization" },
      "areaServed": "Worldwide",
      "url": "https://www.victoryvelocity.ca/#method"
    },
    {
      "@type": "Service",
      "name": "AI Technical Site Audit",
      "description": "A deterministic audit covering AI crawler access, sitemaps, schema markup, metadata, canonicals, HTTPS, links, images and page speed, run page by page across the whole site. Findings become reviewable action cards with platform-specific instructions, applied only on approval and verified by re-audit.",
      "provider": { "@id": "https://www.victoryvelocity.ca/#organization" },
      "areaServed": "Worldwide",
      "url": "https://www.victoryvelocity.ca/#method"
    }
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
