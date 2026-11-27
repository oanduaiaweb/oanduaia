---
name: update-reviews
description: Weekly refresh of the reviews on oanduaia.ee. Reads the Google listing and both Booking.com listings, updates scores and counts, and adds new 4–5 star Google reviews with translations. Use when Mikk says "update reviews" or on the weekly review check.
---

# Update the reviews on oanduaia.ee

All review data lives in `lib/reviews.ts`. Nothing else needs touching.

1. **Google** (Chrome): open `https://www.google.com/maps?cid=9811987788853274564&hl=en` and go to the Reviews tab.
   - Read the total count and the star breakdown.
   - Sort by **Newest**.
   - On each new review, click "See original": quote the guest's **original language verbatim**.
2. **Booking.com** (Chrome, read only, change nothing):
   - `https://www.booking.com/hotel/ee/oanduaia-saunamaja.html?lang=en-gb` (Saunamaja)
   - `https://www.booking.com/hotel/ee/metsamaja.html?lang=en-gb` (Metsamaja)
   - Read the score and the review count on each.
3. **Edit `lib/reviews.ts`:**
   - `REVIEW_SOURCES`: update `score` and `count`.
   - `REVIEW_QUOTES`: add each new review with text and **4–5 stars** at the TOP.
     - Fields: `id`, `author`, `originalLang`, `date` (`'YYYY-MM'`).
     - `text` in all 8 languages: the original verbatim, the other 7 translated.
     - House names as in `lib/gallery.ts` labels.
   - Rules in the file header apply: never tidy or shorten a sentence. You may quote one whole paragraph of a long review. Never quote a review that contradicts the site's facts (capacity, prices).
   - Skip reviews below 4 stars and reviews with no text. Tell Mikk about any below 4 stars.
4. **Check:**
   - `npx tsc --noEmit` and `npx next build`.
   - Preview the `.quotes` section on localhost and screenshot it for Mikk.
5. **Mikk approves**, then commit and run `vercel --prod --yes`. Git push does not deploy.
   - If the build fails on a Google Fonts download, redeploy.
6. Report: what changed (counts, new quotes) in a few lines.
