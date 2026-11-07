import Image from "next/image";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About | Victory Velocity",
  description:
    "The founders behind Victory Velocity, a Vancouver agency that gets brands named and cited by ChatGPT, Claude, Gemini and Perplexity.",
  alternates: { canonical: "https://www.victoryvelocity.ca/about" },
  openGraph: {
    title: "About | Victory Velocity",
    description:
      "The founders behind Victory Velocity, helping brands get cited in AI answers.",
    url: "https://www.victoryvelocity.ca/about",
    siteName: "Victory Velocity",
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <SiteNav />

      <main className="about-page">
        <div className="wrap">

          <div className="about-split">
            <div className="about-left">
              <h1 className="about-name">Kaden Yeung</h1>
              <p className="about-role">Co-Founder &amp; CEO</p>
              <div className="about-body">
                <p>
                  I&rsquo;m 18, based in Vancouver, and finishing high school
                  before heading to Queen&rsquo;s University for engineering in
                  the fall.
                </p>
                <p>
                  I got into this space through TKS, a program for young people
                  working on high-impact problems, and an internship at
                  Singularity Health, an AI healthcare startup. Most of what I
                  know about building I learned by watching people figure things
                  out in real time and replicating it myself.
                </p>
                <p>
                  Victory Velocity is my attempt to get ahead of a shift I think
                  is genuinely significant. I could be wrong about the timeline.
                  I don&rsquo;t think I&rsquo;m wrong about the direction.
                </p>
              </div>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/kadeny/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://kadeny.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Substack →
                </a>
              </div>
            </div>

            <div className="about-right">
              <div className="about-photo-wrap">
                <Image
                  src="/kaden.jpg"
                  alt="Kaden Yeung"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="about-divider" />

          <div className="about-split">
            <div className="about-left">
              <h2 className="about-name">Jared Shum</h2>
              <p className="about-role">Co-Founder &amp; CTO</p>
              <div className="about-body">
                <p>
                  I&rsquo;m based in Vancouver, studying Computer Science and
                  Business at UBC. At Victory Velocity I work on the database
                  infrastructure and the pipelines our measurement runs on.
                </p>
                <p>
                  Before this I was a software engineering intern at a data
                  intelligence startup founded by Y Combinator W16 alumni,
                  working on data preprocessing and web crawling. That is where
                  I saw the shift up close. The web is increasingly being read
                  by models rather than indexed by crawlers, and most brands
                  have no idea it is happening to them.
                </p>
                <p>
                  I think the change in how people find information is as much
                  a technical problem as a marketing one. My job is making sure
                  the measurement is real and the fixes actually hold.
                </p>
              </div>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/jaredyhshum/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://github.com/jyshum"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub →
                </a>
                <a
                  href="https://www.jaredshum.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More about me →
                </a>
              </div>
            </div>

            <div className="about-right">
              <div className="about-photo-wrap">
                <Image
                  src="/jared-about.jpg"
                  alt="Jared Shum"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover", objectPosition: "center 25%" }}
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
