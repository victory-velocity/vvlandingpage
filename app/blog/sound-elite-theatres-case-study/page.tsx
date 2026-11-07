import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:
    "Sound Elite Theatres: ranking on Google, invisible in AI answers | Victory Velocity",
  description:
    "A Vancouver home theatre specialist ranked well on Google and was barely named by AI engines. Mention rate went from 13% to 73% and citation rate from 5% to 33% in five months, alongside revenue growth from $240,000 to a projected $550,000.",
  alternates: {
    canonical:
      "https://www.victoryvelocity.ca/blog/sound-elite-theatres-case-study",
  },
  openGraph: {
    title: "Sound Elite Theatres: ranking on Google, invisible in AI answers",
    description:
      "A Vancouver home theatre specialist ranked well on Google and was barely named by AI engines. What we measured, what moved, and what is still open.",
    type: "article",
    publishedTime: "2026-11-07",
    authors: ["Jared Shum"],
  },
};

export default function SoundEliteCaseStudy() {
  return (
    <>
      <SiteNav />

      <main>
        <header className="blog-header">
          <div className="blog-wrap">
            <Link href="/blog" className="blog-breadcrumb">
              ← Blog
            </Link>
            <h1 className="blog-post-title">
              Ranking on Google, invisible in AI answers
            </h1>
            <p className="blog-post-subtitle">
              Sound Elite Theatres was already doing fine in search. Inside
              ChatGPT, Claude and Gemini, it was barely named at all. What we
              measured, what moved, and what is still open.
            </p>
            <div className="blog-post-meta">
              <span>Jared Shum</span>
              <span className="blog-meta-dot">·</span>
              <span>November 2026</span>
              <span className="blog-meta-dot">·</span>
              <span>6 min read</span>
            </div>
          </div>
        </header>

        <article>
          <div className="blog-wrap">
            <div className="blog-body">

              <div className="blog-tldr">
                <div className="blog-tldr-label">Key takeaways</div>
                <ul>
                  <li>
                    Mention rate across AI engines went from 13% to 73% over
                    five months. Citation rate went from 5% to 33%.
                  </li>
                  <li>
                    Average Google position moved 3.2, then 2.2, then 1.2.
                  </li>
                  <li>
                    Revenue was $240,000 in 2025, the year before we started.
                    They are projecting $550,000 now.
                  </li>
                  <li>
                    They were never invisible on Google. They were invisible
                    inside AI answers, which is a different problem with
                    different fixes.
                  </li>
                  <li>
                    Being named and being cited are not the same thing. At the
                    end of the engagement there was still a 40 point gap
                    between the two, and that gap is the next phase of work.
                  </li>
                </ul>
              </div>

              <h2 id="the-problem">The problem was not Google</h2>

              <p>
                <a
                  href="https://soundelitetheatres.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sound Elite Theatres
                </a>{" "}
                designs and installs high-end home theatre and audio systems in
                Vancouver. It is a considered purchase, expensive, and
                researched hard before anyone picks up a phone.
              </p>

              <p>
                They were not invisible. On Google they were already ranking,
                averaging around position 3.2 on their target queries, some of
                them sitting at 2. By the standards of local search, that is a
                business doing fine.
              </p>

              <p>
                The problem was somewhere else. When a customer skipped the
                search bar and asked an AI engine directly, which is
                increasingly what happens with a purchase this size, Sound
                Elite was named in roughly 13% of answers. The engines
                understood the category perfectly well. They were naming other
                people in it.
              </p>

              <p>
                That gap does not appear in analytics. Branded traffic looks
                healthy. The missed demand never reaches the site, so no number
                goes down. You simply do not get the call, and nothing tells
                you why.
              </p>

              <h2 id="what-we-measured">What we measured first</h2>

              <p>
                Before changing anything, we established where they actually
                stood.
              </p>

              <p>
                We built the real set of buying intents for the business and
                tested each across multiple phrasings rather than single
                keywords, because nobody asks the same question the same way
                twice. Each was run against four engines: ChatGPT, Claude,
                Gemini and Perplexity.
              </p>

              <p>For every response we recorded three things:</p>

              <ul>
                <li>whether the brand was <strong>mentioned</strong> at all</li>
                <li>
                  whether it was <strong>cited</strong>, meaning the domain
                  actually appeared as a source
                </li>
                <li>
                  how strongly it was positioned, graded from a passing mention
                  up to a primary recommendation
                </li>
              </ul>

              <p>
                We ran the same measurement for their named competitors, broken
                out per engine. Knowing you are absent matters less than
                knowing who is there instead.
              </p>

              <p>
                The intents split into two kinds, and they behave very
                differently. The first is product visibility: someone knows
                what they want and is looking for who supplies it. The second
                is content authority: someone has a problem, has not settled on
                a solution, and the engine is deciding whether to recommend
                hiring a professional at all. The second is harder, and it is
                worth more.
              </p>

              <h2 id="what-we-changed">What we changed</h2>

              <p>
                A deterministic audit across the whole site, page by page. It
                starts with whether the AI crawlers are even allowed in, and
                checks seven by name: GPTBot, OAI-SearchBot, ChatGPT-User,
                PerplexityBot, ClaudeBot, Google-Extended and CCBot. All seven
                were verified with access on their site. Then sitemaps, schema
                markup, meta titles and descriptions, canonicals, HTTPS, broken
                links, image alt text and page speed.
              </p>

              <p>
                Findings become action cards carrying a risk rating and exact
                step-by-step instructions for their platform. Nothing applies
                itself. They approve it, we apply it, then we re-run the audit
                to prove it is fixed.
              </p>

              <p>That loop is the part the client noticed.</p>

              <blockquote>
                <p>
                  &ldquo;[Victory Velocity] are the first people who offered to
                  actually do it, instead of handing me another list.&rdquo;
                </p>
              </blockquote>

              <p>
                An audit is not a deliverable. A list of problems is not
                progress. The work is the fixing, and then proving the fix
                landed.
              </p>

              <h2 id="what-moved">What moved</h2>

              <p>Work ran from March to July 2026.</p>

              <h3 id="mention-rate">Mention rate: 13% to 73%</h3>

              <p>
                Close to three in four answers now name them, where it was
                closer to one in eight before. That is a 60 point move, and it
                is the number that most directly represents being in the
                running at all.
              </p>

              <h3 id="citation-rate">Citation rate: 5% to 33%</h3>

              <p>
                Citations grew faster in proportional terms than mentions did,
                6.6 times against 5.6. One in three answers now points at their
                domain as a source, where it was one in twenty.
              </p>

              <h3 id="google-position">Average Google position: 3.2 to 1.2</h3>

              <p>
                Measured across three points in the engagement: 3.2, then 2.2,
                then 1.2. The technical work that makes a site legible to AI
                crawlers is largely the same work that makes it legible to
                Google, so this moved alongside the rest rather than as a
                separate project.
              </p>

              <h2 id="revenue">What it was worth</h2>

              <p>
                Sound Elite did <strong>$240,000 in revenue in 2025</strong>,
                the year before we started. They are currently projecting{" "}
                <strong>$550,000</strong>.
              </p>

              <p>
                That second number is a projection rather than banked revenue,
                and visibility was one input among their pricing, their sales
                and their market over the same period. We are not claiming it
                was the only one.
              </p>

              <h2 id="the-gap">The gap that is still open</h2>

              <p>
                Both numbers improved sharply, but they did not converge. At
                the end of the engagement Sound Elite was named in 73% of
                answers and cited in 33%. A 40 point spread.
              </p>

              <p>
                Being named is not the same as being linked. They had strong
                local authority already, which is what gets a business named,
                but not enough published material for engines to cite as a
                source. That is a content problem rather than a technical one,
                and it is the next phase of the work.
              </p>

              <p>
                We have since run the same measurement for other clients, and
                it is what our later batches in Toronto and Singapore are
                built around.
              </p>

              <h2 id="why-this-generalises">Why this generalises</h2>

              <p>
                Nothing here was a trick. Engines cite sources they can read,
                parse and corroborate. A site that is technically legible and
                backed by consistent signals gets named. One that is not, does
                not.
              </p>

              <p>
                It feels like a trick only because almost nobody is measuring
                it yet. The most useful thing about this engagement is not any
                single number, it is that the numbers existed at all. You
                cannot fix a gap you have never measured, and most businesses
                in this position do not know the gap is there.
              </p>

              <p>
                A specialist local business that starts measuring now is
                competing against a field that still believes Google is the
                only scoreboard.
              </p>

            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
