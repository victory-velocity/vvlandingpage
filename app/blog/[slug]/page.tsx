import { listArticles, getArticle } from "@/lib/babylovegrowth";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await listArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const articles = await listArticles();
  const summary = articles.find((a) => a.slug === params.slug);
  if (!summary) return {};
  return {
    title: `${summary.title} — Victory Velocity`,
    description: summary.meta_description,
    alternates: {
      canonical: `https://www.victoryvelocity.ca/blog/${summary.slug}`,
    },
    openGraph: {
      title: summary.title,
      description: summary.meta_description,
      type: "article",
      publishedTime: summary.created_at,
    },
  };
}

function estimateReadTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// The API's content_html opens with the article title as an <h1> and the hero
// image, both of which blog-header already renders. Drop them so the post does
// not show its title and cover twice (and does not ship two <h1>s).
function stripDuplicateHeader(html: string, heroUrl?: string): string {
  let out = html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");
  if (heroUrl) {
    const src = heroUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // the image arrives wrapped in its own <p>, so take the wrapper with it
    out = out.replace(
      new RegExp(`<p>\\s*<img\\b[^>]*src=["']${src}["'][^>]*>\\s*</p>\\s*`, "i"),
      ""
    );
    out = out.replace(new RegExp(`<img\\b[^>]*src=["']${src}["'][^>]*>\\s*`, "i"), "");
  }
  return out.trim();
}

export default async function DynamicBlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const articles = await listArticles();
  const summary = articles.find((a) => a.slug === params.slug);
  if (!summary) notFound();

  const article = await getArticle(summary.id);
  if (!article) notFound();

  const contentHtml = stripDuplicateHeader(
    article.content_html,
    article.hero_image_url
  );
  const readTime = estimateReadTime(contentHtml);
  const publishDate = new Date(article.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {article.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.jsonLd) }}
        />
      )}
      {article.faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.faqJsonLd) }}
        />
      )}

      <SiteNav />

      <main>
        <header className="blog-header">
          <div className="blog-wrap">
            <Link href="/blog" className="blog-breadcrumb">
              ← Blog
            </Link>
            <h1 className="blog-post-title">{article.title}</h1>
            <p className="blog-post-subtitle">{article.meta_description}</p>
            <div className="blog-post-meta">
              <span>{publishDate}</span>
              <span className="blog-meta-dot">·</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        <article>
          <div className="blog-wrap">
            {article.hero_image_url && (
              <div className="blog-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.hero_image_url}
                  alt={article.title}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
