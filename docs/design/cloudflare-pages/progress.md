# Cloudflare Pages migration progress

Updated 2026-11-16.

## Completed

- Added an opt-in static export build while preserving the existing server build.
- Added permanent redirects for three retired blog URLs, including slash variants.
- Documented free-plan setup, domain cutover, privacy, and rollback steps.
- `npm ci --no-audit --no-fund`: passed; dependency lockfile unchanged.
- `npm run lint`: passed, no warnings or errors.
- `npm run build:pages`: passed, static export with 55 files.
- `npm run build`: passed, existing deployment mode preserved.
- Cloudflare Wrangler 4.163.0 local runtime HTTP validation passed: five pages,
  24 referenced assets, robots/sitemap/llms/favicon, booking link, nine redirect
  variants (including query preservation), and a 404 for a missing page.
- `git diff --check`: passed.
- Cloudflare login and GitHub App installation completed. Installation 182665926
  is limited to victory-velocity/vvlandingpage.
- Created the isolated free Pages project `vvlandingpage-preview`, using
  `chore/cloudflare-pages-migration` as its deployment branch. Its initial remote
  build of ff146f2 succeeded; no live custom domain was attached.
- Added hostname-specific `noindex` response headers for Pages preview URLs.
- Remote deployment of f8f195e succeeded at
  https://vvlandingpage-preview.pages.dev. HTTP checks passed for all five pages,
  25 assets, four metadata files, the booking link, nine redirect variants, and a
  missing-page 404. All pages return `noindex` and retain the live site's canonical
  URLs. Browser inspection confirmed rendering and working FAQ expansion.
- Jared's private-contribution visibility remains enabled. No review rule was
  bypassed or changed; PR #6 is authored by jyshum and requires another reviewer.

## Existing check failure

`npm run preflight` reports five em/en-dash style violations in unchanged files:
two in `app/blog/page.tsx` and one each in `app/globals.css`,
`components/ServiceVisuals.tsx`, and
`components/sections/useMarqueeHighlight.ts`. No files containing those
violations are modified by this migration. This is not a passing preflight.

## Pending

- Required pull request review and merge.
- Main-branch Cloudflare deployment after the required review and merge.
- Custom-domain cutover and HTTPS/redirect verification.
- Repository privatization and successful post-privatization build.

No Cloudflare account, custom domain, DNS, billing, or repository visibility
change is performed by the code in this branch. Local validation does not prove
that a remote deployment or production cutover has completed.
