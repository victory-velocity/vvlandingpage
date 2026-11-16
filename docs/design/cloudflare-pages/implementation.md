# Cloudflare Pages migration implementation plan

Goal: deploy the existing landing website on free hosting with a private
organization repository, preserving URLs and the booking journey.

Scope: prepare and verify free Cloudflare hosting for the existing landing
website. Paid plans, new product behavior, database migration, and unverified
production cutover are excluded.

## Approach and constraints

- Use Next.js static export for this site: no server API routes were found and
  the contact action is a link to Cal.com.
- Retain the normal Next.js/Vercel build until Cloudflare is verified.
- Preserve all existing pages, canonical URLs, assets, robots, sitemap, and
  redirects; keep source and dependency versions unchanged otherwise.
- An always-on Workers application is unnecessary for this landing page and
  adds runtime quota constraints. Vercel Pro conflicts with the $0 requirement.
- Cloudflare login and GitHub App authorization require account access.
- The existing mandatory PR review must be satisfied before merging to main.

## Tasks

1. Add an explicit Pages build and static-host redirects; document cutover.
2. Run lint, existing preflight, static build, ordinary build, and HTTP checks
   for pages, metadata, assets, redirects, booking URL, and missing pages.
3. Push a reviewable branch and create a PR with validation evidence.
4. Connect Cloudflare after account authorization, validate preview and main,
   switch the domain, then privatize source and verify a subsequent build.

This change is limited to the landing website. Dashboard and query-testing
services need their own hosting compatibility checks.
