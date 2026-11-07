This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Housekeeping

**The blog is fully static.** Every post is its own file under `app/blog/<slug>/page.tsx`. There is no CMS, no API call and nothing to fetch at request time, so the blog renders identically on a laptop and in production.

It used to be otherwise. Until November 2026 `/blog/[slug]` pulled syndicated articles from the Babylovegrowth API at runtime, which meant the index looked empty on any machine without the API key, and the articles' raw HTML broke the page layout. That integration is gone: `lib/babylovegrowth.ts` and `app/blog/[slug]/page.tsx` were deleted and the three published articles now 301 to `/blog` (see `RETIRED_POSTS` in `next.config.mjs` — they were indexed, so they redirect rather than 404).

Two leftovers on the Vercel side, neither of which anything in this repo reads:

- `BABYLOVEGROWTH_API_KEY` can be deleted from the project's environment variables.
- Cancel the Babylovegrowth subscription if one is still running.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
