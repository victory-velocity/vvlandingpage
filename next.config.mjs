/** @type {import('next').NextConfig} */

// Syndicated articles that used to be served from /blog/[slug]. They were live
// and indexed, so they redirect to the blog index rather than 404 and throw
// away whatever authority they earned.
const RETIRED_POSTS = [
  "generative-engine-optimization-tools-agencies-3",
  "moz-review-2026-is-it-worth-it-for-seo-pros",
  "semrush-alternatives-3-agencies",
];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return RETIRED_POSTS.map((slug) => ({
      source: `/blog/${slug}`,
      destination: "/blog",
      permanent: true,
    }));
  },
};

export default nextConfig;
