# Cloudflare Pages deployment

This website can be built as static files for Cloudflare Pages Free. The source
repository can remain private within the victory-velocity GitHub organization.
The contact action links to Cal.com; this deployment needs no server, database,
model API keys, or application secrets.

## Build settings

| Setting | Value |
| --- | --- |
| Production branch | main |
| Root directory | repository root |
| Build command | npm run build:pages |
| Output directory | out |
| Environment secrets | none |

Use the lockfile with `npm ci`. The Pages build sets `CLOUDFLARE_PAGES=1`,
enables Next.js static export, and serves image files directly instead of using
Next.js's runtime image optimizer. The ordinary `npm run build` retains the
existing server build and its redirects for Vercel.

`public/_redirects` preserves the three retired blog URLs as 308 redirects to
`/blog`, including incoming URLs with a trailing slash. Keep these entries
aligned with `RETIRED_POSTS` in `next.config.mjs`
while both deployment modes are supported.

`public/_headers` marks Cloudflare's `pages.dev` hostnames as `noindex`, so test
deployments do not compete with the canonical marketing site in search results.
These rules do not match the custom domain.

## Cutover checklist

1. Authorize Cloudflare's GitHub App only for the intended repositories.
2. Connect this repository using the free Pages plan and the settings above.
3. Test a branch preview: home, about, blog, both articles, images, contact link,
   sitemap, robots, llms.txt, the three redirects, and a missing-page response.
4. Merge the migration pull request after the required approving review.
5. Verify the main-branch Pages deployment before attaching the existing custom
   domain. Preserve DNS records for email and unrelated services.
6. Verify HTTPS, the preferred www hostname, canonical URLs, redirects, and
   booking link on the custom domain before retiring the old deployment.
7. Make the GitHub repository private and verify that Cloudflare can still build
   from it. Re-check the repository's security settings: GitHub Free does not
   enforce branch rules on private organization repositories.

Keep the existing Vercel project and previous DNS values during cutover so a
rollback can restore the prior hosting route. No domain changes or hosting
account changes are performed by the build script.

## Validation

```sh
npm ci
npm run lint
npm run preflight
npm run build:pages
```

The dashboard and Python query-testing services are separate applications. This
static deployment does not migrate or replace them.
