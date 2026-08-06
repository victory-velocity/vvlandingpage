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

  const readTime = estimateReadTime(article.content_html);
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
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
