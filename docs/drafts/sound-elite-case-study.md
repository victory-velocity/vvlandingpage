# Sound Elite Theatres case study — BUILT, NOT PUBLISHED

The page exists at `app/blog/sound-elite-theatres-case-study/page.tsx` and
renders at `/blog/sound-elite-theatres-case-study`. Review it there rather than
here. Nothing is committed or pushed.

## Numbers used (all Sound Elite's own, confirmed by Jared 2026-11-07)

| Metric | Value |
| --- | --- |
| Mention rate | 13% to 73% (+60 points, 5.6x) |
| Citation rate | 5% to 33% (+28 points, 6.6x) |
| Avg Google position | 3.2, then 2.2, then 1.2 |
| Timeline | March to July 2026 |
| AI crawlers verified | all seven |

The homepage proof stats are cross-client averages, so none of them appear in
this piece.

## Still open

1. **Revenue section is NOT in the page.** $240k actual 2025 and $550k
   projected were deliberately left out pending Leslie's written sign-off. A
   named client's revenue is the most checkable claim in the piece and
   "projected" is doing a lot of work in that sentence. Ask Leslie one
   question first: how much of the growth do they attribute to AI and search
   discovery? That turns it from our claim into theirs.
2. **Query count** behind the 3.2 to 1.2 position move. Asked for it, got the
   progression instead. The page currently says "across three points in the
   engagement" and avoids claiming a count.
3. **No cover image.** The page omits `blog-cover` entirely rather than reuse
   an unrelated asset. `public/blog/` only has the three from the other post.
4. **Byline is Kaden**, matching the existing post and the blog index. Change
   if it should be you.
5. **Example queries** would strengthen the opening. None named yet.

## Checks run

- Renders at 1280px and in the pane with 0px horizontal overflow
- Exactly one `<h1>`
- `scripts/preflight.mjs`: no new violations (no em-dashes in the new files)
- `tests/sound-elite-link.test.mjs`: 2 pass, 0 fail
- Card appears first on `/blog`, sitemap entry added
