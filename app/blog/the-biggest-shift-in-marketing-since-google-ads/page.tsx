import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "The Biggest Shift in Marketing Since Google Ads | Victory Velocity",
  description:
    "AI is rewriting how customers discover brands. A practical breakdown of generative engine optimization and ChatGPT ads.",
  alternates: {
    canonical:
      "https://www.victoryvelocity.ca/blog/the-biggest-shift-in-marketing-since-google-ads",
  },
  openGraph: {
    title: "The Biggest Shift in Marketing Since Google Ads",
    description:
      "AI is rewriting how customers discover brands. A practical breakdown of generative engine optimization and ChatGPT ads.",
    type: "article",
    publishedTime: "2026-06-01",
    authors: ["Kaden Yeung"],
  },
};

export default function BlogPost() {
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
              The Biggest Shift in Marketing Since Google Ads
            </h1>
            <p className="blog-post-subtitle">
              AI is rewriting how customers discover brands. A practical
              breakdown of generative engine optimization and ChatGPT ads.
            </p>
            <div className="blog-post-meta">
              <span>Kaden Yeung</span>
              <span className="blog-meta-dot">·</span>
              <span>June 2026</span>
              <span className="blog-meta-dot">·</span>
              <span>14 min read</span>
            </div>
          </div>
        </header>

        <article>
          <div className="blog-wrap">
            <div className="blog-cover">
              <Image
                src="/blog/article-cover.webp"
                alt="ChatGPT Ads billboard: Reach your ideal customers with AI-powered ads"
                width={1400}
                height={933}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>

            <div className="blog-body">

              <p>Google ads is falling.</p>

              <p>
                Google ads launched in 2000. For two decades, the marketing
                playbook was the same: bid on keywords, appear in results, pay
                per click. SEO ran parallel to ads. The brands that emphasized
                both ads space and SEO gained serious competitive advantages.
              </p>

              <p>That playbook still works. But the fundamentals are shifting underneath it.</p>

              <p>
                Since 2022, people have been moving from Googling to
                conversations. Not &ldquo;best running shoes 2026&rdquo; into a
                search bar, but the same question typed into ChatGPT, with a
                follow-up, and another after that. ChatGPT crossed 900 million
                weekly active users in early 2026. Perplexity is growing.
                Google&rsquo;s own search is being restructured around
                AI-generated answers.
              </p>

              <p>
                ChatGPT-ads rolled out in May 2026 for all companies, that
                became two parallel things changing at once:
              </p>

              <ul>
                <li>how brands get found organically online</li>
                <li>how brands pay to be found</li>
              </ul>

              <p>
                GEO is the new SEO. ChatGPT-ads are the new Google Ads. And
                these shifts require different responses from your brand.
              </p>

              <p>
                Lucky for us, both GEO and ChatGPT-ads are early enough that
                understanding them now is a significant advantage. So let&rsquo;s
                break down what&rsquo;s happening and what to do about it.
              </p>

              <p>After reading this article, you&rsquo;ll leave with:</p>

              <ol>
                <li>how AI is creating a paradigm shift in how your brand can be found</li>
                <li>by diving into the mechanics of GEO and ChatGPT-ads, and</li>
                <li>what you can do about it today.</li>
              </ol>

              <h2>Brands are getting less traction from Google, everyday.</h2>

              <p>
                To understand GEO, let&rsquo;s start from the beginning. For
                near a decade, Google held above 90% of global search market.
                That number barely moved until October 2024, when it dropped
                below for the first time since 2015 and kept declining through
                2025. If this doesn&rsquo;t sound like much, just remember that
                Google processes roughly 8.5 billion searches a day, so
                one-point shift is tens of millions of queries leaving Google.
              </p>

              <p>
                Where did that number go? ChatGPT had 400 million weekly active
                users in February 2025. By February 2026, it went up to 900
                million. Users didn&rsquo;t switch to ChatGPT because they were
                told to. It was natural, because getting an answer is a better
                experience than getting ten links to click through. This all
                happened without businesses noticing. While most businesses only
                knew SEO (search engine optimization), a new word was needed to
                describe the upcoming trend.
              </p>

              <figure className="blog-fig">
                <Image
                  src="/blog/google-market-share.webp"
                  alt="StatCounter Global Stats: Search Engine Market Share Worldwide, January to December 2024, showing Google dropping below 90%"
                  width={1260}
                  height={700}
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption>
                  Source:{" "}
                  <a
                    href="https://searchengineland.com/google-search-market-share-drops-2024-450497"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Search Engine Land
                  </a>
                </figcaption>
              </figure>

              <p>
                Here&rsquo;s what even more interesting: Google is disrupting
                itself.
              </p>

              <p>
                AI Overviews that sits at the top of Google&rsquo;s search
                results answer the question before the user has any reason to
                scroll down. That makes ranking number one on Google matter less
                than it did two years ago.
              </p>

              <p>
                Ahrefs analyzed 300,000 keywords in February 2026 and found that
                the top-ranking page{" "}
                <a
                  href="https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &ldquo;loses 58% of its clicks when an AI Overview appears
                  above&rdquo;
                </a>
                . That&rsquo;s more than half the traffic wiped away.
              </p>

              <p>
                60% of all Google searches end without a single click nowadays,
                77% on mobile. In Google&rsquo;s AI mode, where the AI answer
                occupies the entire screen, the{" "}
                <a
                  href="https://www.semrush.com/blog/ai-mode-comparison-study/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  zero-click rate reaches 93%
                </a>
                .
              </p>

              <p>
                Businesses used to build their acquisition strategy around
                informational content, like blog posts, FAQs etc. But those are
                exactly the queries that AI overviews answer directly.
              </p>

              <p>
                However, pages that are cited inside AI overviews get 120% more
                clicks per impression than uncited pages on the same result
                pages. It used to be a ranking game. But now, being inside the
                answer is completely different than being below an answer.
              </p>

              <figure className="blog-fig">
                <Image
                  src="/blog/aio-ctr-impact.webp"
                  alt="Seer Interactive study: Being cited in the AIO delivers +120% CTR vs. uncited pages"
                  width={1400}
                  height={788}
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption>
                  Source:{" "}
                  <a
                    href="https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Seer Interactive
                  </a>
                </figcaption>
              </figure>

              <h2>GEO is the next layer of SEO.</h2>

              <p>
                Above shows that there has been an obvious shift in how brands
                are found on the internet. Clicks are &ldquo;disappearing&rdquo;
                from traditional pathways like Google and appearing somewhere
                else: Large Language Models (more commonly known as AI).
              </p>

              <p>
                Therefore, if the goal of a brand is no longer to rank on a
                search results page, but to be the source an AI pulls from, the
                optimization strategy has to change. The industry started calling
                this GEO, generative engine optimization. Which means instead of
                optimizing for a search engine, like Google or Bing (SEO),
                you&rsquo;re optimizing for a generative engine (GEO), like
                ChatGPT.
              </p>

              <p>
                To understand why the distinction matters, it helps to understand
                how the separate system works mechanically.
              </p>

              <h3>SEO:</h3>

              <ul>
                <li>
                  Google&rsquo;s crawler visits your page, reads the content,
                  and scores it against different signals
                </li>
                <li>
                  that includes keywords, how fast it loads, how many other sites
                  are link to it etc
                </li>
                <li>
                  It outputs a ranked list. A brand&rsquo;s position on that
                  list determines how much traffic it gets.
                </li>
              </ul>

              <p>
                In short, SEO optimizes for how your brand is ranked on a search
                engine (Google) and how much impression it gets from users.
              </p>

              <h3>GEO:</h3>

              <ul>
                <li>
                  Generative engine runs its own internal search and pulls a set
                  of sources
                </li>
                <li>
                  it summarizes each one and generates a response that weaves
                  summaries into one coherent answer
                </li>
                <li>
                  Your brand is mentioned or it isn&rsquo;t. There is no
                  positioning.
                </li>
              </ul>

              <p>
                In short, GEO optimizes for how much your brand is showing up in
                AI chats, and how it&rsquo;s framed as a brand.
              </p>

              <h2>
                The 3-pillar framework for GEO: Technical, Content, and
                Authority.
              </h2>

              <p>
                Every optimization strategy, whether for Google or for a
                generative engine, sits inside one of these three buckets. The
                pillars are the same across SEO and GEO. What changes is what
                each pillar specifically requires.
              </p>

              <p>
                That means a brand doesn&rsquo;t have to build two separate
                strategies, instead, a strong foundation serves both SEO and GEO.
                Here&rsquo;s how the pillars break down and where SEO and GEO
                diverge within each.
              </p>

              <h3>1. Technical:</h3>

              <p>
                For SEO, technical means the site speed, mobile responsiveness,
                metadata etc. In short, Google&rsquo;s crawler needs to be able
                to read and index the page cleanly and conveniently.
              </p>

              <p>For GEO, technical means structured data. A big part of that is schema markup.</p>

              <p>
                AI engines don&rsquo;t read web pages the way a human does. They
                parse content through a process of semantic extraction, pulling
                entities, relationships, and facts out of unstructured text.
                Schema markup short-circuits that process by providing a
                machine-readable layer on top of the page that tells the engine
                exactly what the content represents, without requiring
                interpretation.
              </p>

              <p>
                A{" "}
                <a
                  href="https://data.world/company/press-room/new-data-world-report-finds-a-technique-for-making-llms-3x-more-accurate-in-answering-business-questions/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  study cited by Data World
                </a>{" "}
                found that LLMs powered by structured, schema-enriched content
                achieve &ldquo;300% higher accuracy than those relying on
                unstructured&rdquo; text.
              </p>

              <p>
                It&rsquo;s important to note that good GEO also means good SEO.
                Both SEO and GEO require clean, crawlable HTML.
              </p>

              <h3>2. Content:</h3>

              <p>
                For SEO, content means targeting keywords with enough search
                volume to drive traffic. Keyword research, on-page optimization,
                metadata aligned to search intent.
              </p>

              <p>
                For GEO, content means topic clusters. A hub page (on your
                website) that owns a broad topic, with supporting articles that
                each answer one specific long-tail query in depth.
              </p>

              <p>
                The reason is that AI engines answer conversational questions,
                not returning results for short keywords. A page that directly
                and thoroughly answers &ldquo;what do I do with my wedding
                flowers after the wedding in Vancouver&rdquo; gets cited, instead
                of a page only optimized for &ldquo;Vancouver florist&rdquo;.
              </p>

              <p>
                Long-tail queries matter for both SEO and GEO. The difference is
                that SEO treats them as keyword variations to rank for, while GEO
                treats them as questions to answer completely, because that&rsquo;s
                what gets pulled into an AI response.
              </p>

              <h4>An example (from client work):</h4>

              <p>
                The client had a live website, but no blogs and no content beyond
                a homepage. We built a topic cluster anchored by one hub page
                covering the broad topic the organization owns. Under it, five
                supporting articles each targeting a specific question a real
                person would ask an AI engine. Real questions like: what happens
                after the event, how to arrange a pickup, where donations go, how
                the process works, what eco-conscious alternatives exist in the
                city.
              </p>

              <p>Each article is structured the same way.</p>

              <ul>
                <li>
                  The direct answer to the query appears in the first two
                  paragraphs.
                </li>
                <li>
                  The header structure uses questions rather than topic labels,
                  because those headers are the retrieval anchors an AI engine
                  uses to locate the relevant section inside a longer piece.
                </li>
                <li>
                  The hub page embeds the core answer from each supporting
                  article directly into its own body, so an engine crawling only
                  the hub gets enough substance to cite the brand across multiple
                  query types.
                </li>
              </ul>

              <h3>3. Authority:</h3>

              <p>
                A 2025 University of Toronto study found that AI search engines
                show a{" "}
                <a
                  href="https://www.globenewswire.com/news-release/2025/12/2/3198248/0/en/earned-media-still-drives-generative-ai-citations-as-press-release-visibility-grows.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &ldquo;systematic and overwhelming bias toward earned media
                  over brand-owned content&rdquo;
                </a>
                , citing third-party sources roughly five times more frequently
                than a brand&rsquo;s own website. Separately, Muck Rack&rsquo;s
                analysis of over one million AI citations found that 82% came
                from earned media sources and 94% from non-paid sources.
              </p>

              <p>
                Backlinks matters in GEO, just as SEO, because AI engines draw
                from the same web Google indexes. A brand with strong domain
                authority is more likely to be retrieved as a source than one
                without it. But the GEO authority layer is broader than backlinks
                alone.
              </p>

              <p>
                Reddit is the clearest example of why. AI models were trained
                heavily on Reddit data because it represents high-signal,
                unfiltered human conversation at scale. A brand discussed
                authentically in the right subreddit has a presence in AI
                training data and retrieval pools that no amount of on-site
                optimization can replicate. The key word is authentically. A post
                that reads like a press release gets ignored or downvoted. A post
                that contributes something real to a community conversation, and
                happens to mention the brand in context, gets traction and stays
                indexed.
              </p>

              <h2>ChatGPT-ads is the future.</h2>

              <h3>
                Google ads built a $300 billion industry. ChatGPT is on its way
                to a bigger industry.
              </h3>

              <p>
                Google&rsquo;s advertising business generated $294 billion in
                revenue in 2025. It took twenty years to get there and it&rsquo;s
                built on one foundational mechanic: match a keyword to a
                user&rsquo;s search, show them an ad, charge per click. Simple,
                measurable, and for two decades, it&rsquo;s the most reliable way
                to reach a user who is looking for something.
              </p>

              <p>
                The mechanic worked perfectly, because a users search intent was
                the highest quality signal for a brand. An user who types
                &ldquo;best running shoes Vancouver&rdquo; into Google is telling
                a brand exactly what they want. That&rsquo;s why advertisers pay
                a premium for that lead, and Google built the largest advertising
                business in history.
              </p>

              <p>
                Enters ChatGPT. A ChatGPT conversation contains something a
                search query can never: context. Not simply what a user is
                looking for, but why they&rsquo;re looking, what their
                assumptions are etc. For brands looking for consumers, that is a
                much stronger signal than pure keywords.
              </p>

              <p>
                When ChatGPT launched its ad pilot on February 9, 2026, inventory
                opened at $60 per thousand impressions. For context, a typical
                Meta CPM runs around $20. NFL broadcast inventory, considered
                some of the most premium ad real estate in the world, runs at
                comparable levels. ChatGPT commanded that pricing from day one,
                before most businesses even knew the platform existed.
              </p>

              <p>
                Six weeks after launch, the pilot crossed $100 million in
                annualized revenue with over 600 advertisers. OpenAI has shared
                projections with investors: $2.5 billion in 2026, $25 billion by
                2028, $100 billion by 2030. Google took two decades to build its
                ad business. OpenAI is projecting to get a third of the way there
                in under four years.
              </p>

              <h3>How does ChatGPT ads work?</h3>

              <p>
                Google ads work on keywords, where a brand bid on a search term,
                and the ad appears when a user types it.
              </p>

              <p>
                ChatGPT ads work on conversation context. It works on a
                description of the types of conversations a brand wants its ad to
                appear in. A florist might set context hints around wedding
                planning, event gifting, or sustainable celebrations.
                OpenAI&rsquo;s system reads active conversations in real time and
                evaluates four signals:
              </p>

              <ul>
                <li>What topic is being discussed</li>
                <li>What problem the user is trying to solve</li>
                <li>Where the user is in the decision process</li>
                <li>What intent signals appear in the language</li>
              </ul>

              <p>
                When a conversation matches closely enough, the ad gets served.
              </p>

              <p>
                It&rsquo;s important to note that ChatGPT ads is completely
                independent from the organic answer. That means the sponsored
                result does not influence the original output answer. First,
                ChatGPT generates its organic answer, then, a separate ad system
                evaluates the conversation and decides whether to show a sponsored
                placement and what to show. The two systems don&rsquo;t interact
                during answer generation, meaning the ad cannot influence what
                ChatGPT says.
              </p>

              <p>
                The placement appears in a clearly labeled, subtly tinted box
                beneath the response. Advertisers receive aggregate performance
                data only: impressions, clicks, and conversions. Individual
                conversations are never shared.
              </p>

              <h4>What a brand controls, in short</h4>

              <ul>
                <li>Context hints describing target conversations</li>
                <li>Ad creative</li>
                <li>
                  Objective: Reach (brand awareness, CPM) or Clicks (performance,
                  CPC)
                </li>
                <li>Budget, with no minimum spend requirement as of May 2026</li>
              </ul>

              <p>
                On the pricing, the platform launched at a $60 CPM maximum bid
                for Reach campaigns. For Clicks campaigns, the recommended
                starting CPC bid is $3 to $5. For context, the average Meta CPM
                runs around $20. Doubling a budget doesn&rsquo;t double exposure.
                It increases a brand&rsquo;s share of relevant conversations up
                to the limit of available qualifying inventory. That&rsquo;s a
                meaningfully different dynamic from Google or Meta, where more
                budget generally means more reach.
              </p>

              <h3>Ok, so how do I set up a campaign?</h3>

              <p>
                By this point you might be wondering, what can my brand do today
                to get started?
              </p>

              <p>Getting access is straight forward.</p>

              <ol>
                <li>
                  Go to{" "}
                  <a
                    href="https://ads.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ads.openai.com
                  </a>
                </li>
                <li>Fill in business information</li>
                <li>Wait for manual account review</li>
              </ol>

              <p>
                As of May 2026 (and our experiences), review process takes
                roughly a week. Once approved, the Ads Manager opens up with a
                familiar structure. Let me show you what it looks like to start
                your first ad campaign.
              </p>

              <h4>1. Campaign</h4>

              <p>
                Name the campaign, choose an objective (Clicks or Reach), select
                a country, and set a budget. The minimum daily budget is CA$25.
                Budget type is locked once the campaign is created, but the
                amount can be adjusted anytime.
              </p>

              <h4>2. Ad group and ad level</h4>

              <p>
                At the ad group level, a brand sets a maximum CPC bid and a
                destination URL. Then the context hints field: an open text box
                where a brand describes the conversations, topics, or keywords
                where their product or service is relevant. The platform describes
                it explicitly as guiding matching rather than exact-match
                targeting. It&rsquo;s optional, but leaving it blank means the
                system relies entirely on the ad creative and destination URL to
                infer relevance.
              </p>

              <h4>3. Review</h4>

              <p>
                A full summary of everything before launch: campaign name,
                objective, location, daily budget, schedule, ad group name, CPC
                bid, destination URL, context hints, and the ad creative.
              </p>

              <p>
                One thing worth noting from inside the platform: a CA$5 CPC bid
                showed a &ldquo;Strong Delivery&rdquo; signal, meaning the bid
                was competitive for that ad group. That&rsquo;s a low number
                relative to what mature platforms like Google charge for
                comparable intent.
              </p>

              <h2>OpenAI reached out directly. Here&rsquo;s what they said.</h2>

              <p>
                In May 2026, we received an email from OpenAI&rsquo;s GTM team,
                the team leading the early rollout of ChatGPT ads. They were
                moving from a closed pilot to a wider pool of brands and reached
                out to one of our clients directly.
              </p>

              <p>The program overview they shared had three points.</p>

              <ul>
                <li>
                  an initial self-service cohort across priority advertisers,
                  meaning this is still an early, curated group, not a fully open
                  marketplace
                </li>
                <li>native, contextually relevant ad units within ChatGPT</li>
                <li>
                  what they called a &ldquo;light lift to get live&rdquo;:
                  minimal budget commitment, an order form, and compliant
                  creatives. That&rsquo;s the full barrier to entry right now and
                  it&rsquo;s extremely low
                </li>
              </ul>

              <p>
                Note that they described the ad as &ldquo;reaching users before
                they&rsquo;ve made a decision&rdquo;. That&rsquo;s a precise
                description of what sets ChatGPT-ads apart from its competitors.
              </p>

              <p>
                They also noted that they were &ldquo;actively finalizing
                partners&rdquo;. That means the platform is still being built,
                and brands that are in now are shaping how it develops.
              </p>

              <h2>TL;DR</h2>

              <div className="blog-tldr">
                <div className="blog-tldr-label">Key takeaways</div>
                <ul>
                  <li>
                    Google&rsquo;s search market share dropped below 90% for the
                    first time since 2015. ChatGPT went from 400 million to 900
                    million weekly active users in twelve months.
                  </li>
                  <li>
                    58% of clicks disappear from the top Google result when an AI
                    Overview appears above it. In Google&rsquo;s AI Mode, the
                    zero-click rate is 93%.
                  </li>
                  <li>
                    Pages cited inside AI answers get 120% more clicks per
                    impression than uncited pages on the same page.
                  </li>
                  <li>
                    GEO optimization runs on three pillars: technical (schema
                    markup, structured data), content (topic clusters targeting
                    long-tail conversational queries), and authority (earned
                    media, community presence, third-party citations).
                  </li>
                  <li>
                    ChatGPT ads launched self-serve in May 2026. A CA$5 CPC bid
                    currently shows &ldquo;Strong Delivery.&rdquo; OpenAI is
                    projecting $100 billion in ad revenue by 2030.
                  </li>
                  <li>
                    ChatGPT ads are generated independent from the organic
                    answers.
                  </li>
                  <li>
                    You can get started on ChatGPT-ads with around a week of
                    account review and a CA$25 daily minimum.
                  </li>
                </ul>
              </div>

              <h2>What we&rsquo;re building at Victory Velocity.</h2>

              <p>
                Thank you for reading. As someone who&rsquo;s been deeply
                obsessed in this space, I&rsquo;d love to share my thesis on the
                industry:
              </p>

              <blockquote>
                <p>
                  the marketing ads space is experiencing a paradigm shift, the
                  same way Google and Meta ads reshaped how brands reach customers
                  in their eras. The difference this time is that AI adoption is
                  moving exponentially faster, and the compounding advantage for
                  brands that build their presence now will be proportionally
                  larger.
                </p>
              </blockquote>

              <p>
                At{" "}
                <a
                  href="https://www.victoryvelocity.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Victory Velocity
                </a>
                , we help companies get ahead of this paradigm shift. We work
                with brands to build their AI presence from the ground up. That
                includes structuring their sites so AI engines can read and cite
                them correctly, building content that answers the questions their
                customers are already asking AI, tracking how models talk about
                their brand over time, and running ChatGPT ad campaigns that
                reach customers mid-conversation before a decision is made.
              </p>

              <p>
                If any of this is relevant to your business, or just want to
                exchange notes, feel free to reach out below.
              </p>

              <ul>
                <li>
                  Talk to us at{" "}
                  <a
                    href="https://www.victoryvelocity.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    victoryvelocity.ca
                  </a>
                </li>
                <li>
                  Book a time:{" "}
                  <a
                    href="https://calendly.com/kadenyeung/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    calendly.com/kadenyeung/new-meeting
                  </a>
                </li>
              </ul>

              <div className="blog-author-box">
                <div className="blog-author-label">About the author</div>
                <p className="blog-author-bio">
                  My name is Kaden. I&rsquo;m 18, based in Vancouver, and
                  finishing high school before heading to Queen&rsquo;s
                  University for engineering in the fall.
                </p>
                <p className="blog-author-bio">
                  I got into this space through TKS, a program for young people
                  working on high-impact problems, and an internship at
                  Singularity Health, an AI healthcare startup where I ran
                  operations and got my first real look at how early-stage
                  companies move. Most of what I know about business I learned by
                  watching people who were figuring it out in real time, and then
                  trying to replicate their builds myself.
                </p>
                <p className="blog-author-bio">
                  Victory Velocity is my attempt to get ahead of a shift I think
                  is genuinely significant. I could be wrong about the timeline.
                  I don&rsquo;t think I&rsquo;m wrong about the direction.
                </p>
                <div className="blog-author-links">
                  <a
                    href="https://kadeny.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Substack
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kadeny/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

            </div>
          </div>
        </article>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-row">
            <div className="mark">Victory&nbsp;Velocity</div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  color: "var(--faint)",
                  fontStyle: "italic",
                  margin: "0 0 8px",
                  lineHeight: 1.5,
                  fontFamily: "var(--serif)",
                  fontSize: "15px",
                }}
              >
                AI visibility &amp; advertising for brands that intend to be
                cited.
              </p>
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  color: "var(--faint)",
                }}
              >
                © 2026 Victory Velocity
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
