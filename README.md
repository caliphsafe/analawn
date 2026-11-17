# A & A Lawn & More — Website update (November 17, 2026)

This is the **complete updated code package** for `github.com/caliphsafe/analawn`, preserving the existing website, design palette, and your real project photos. It does **not** change your existing GitHub repository automatically.

## What's changed

- **Service icons:** replaced the four thin-line drawings with custom, filled multi-color SVG illustrations representing lawn mowing, fall cleanup, hedge trimming, and garden beds/mulch. No emojis.
- **Layout:** removed the fixed-height mobile hero arrangement that caused "SCROLL TO EXPLORE" to overlap the main CTA. Hero height now expands to fit its content. Adjusted spacing and service icon positioning on narrow screens; added a tablet menu breakpoint to prevent crowded navigation.
- **Group text:** the primary quote CTA creates **one SMS draft listing both** Aaron (**774-365-2080**) and Alvin (**508-509-8320**) using a comma-separated multi-recipient `sms:` URI. The review screen explicitly identifies both recipients. A fallback opens a blank group draft and the form still supports copying the full quote. **The site does not send a text automatically.** A visitor must verify both recipients and tap Send in their texting application. Some Android/iOS apps may ignore multiple recipients or the prefilled body: this cannot be forced by a browser-only website. Test on your customers' devices before launch.
- **Contact wording:** "Call Aaron & Alvin" now appears in the contact sections and utility CTA. Individual tap-to-call numbers remain separately labeled for the two people, since standard phone calls cannot connect to both numbers at once.
- **Sharing previews:** Open Graph and Twitter preview images now use your official `assets/aa-logo.png`, not a project photo. The official logo is also used as the browser and Apple touch icon. Social previews may need to refresh their cache after the new site is deployed.

## Upload to the existing GitHub repository

1. Download and extract this ZIP.
2. Go to [caliphsafe/analawn](https://github.com/caliphsafe/analawn) and upload the **contents** of the extracted folder, replacing matching existing files. Maintain the top-level `dist/`, `scripts/`, and `vercel.json` paths. (The ZIP does not wrap them in another folder.)
3. **Keep the existing project photography and `dist/assets/aa-logo.png` in your repository.** This ZIP intentionally does not duplicate the already committed large original photo assets. It includes the four new SVG icon assets.
4. Redeploy in Vercel. Set Framework preset **Other**, Root Directory the repository root, and use the committed `vercel.json` which builds with `node scripts/build.mjs` and serves `dist`.
5. Check both mobile and desktop and test the SMS link from a real Android phone and a real iPhone. Before sending, verify that the draft shows **both Aaron and Alvin in the same conversation**.

### Existing owner-provided photos

The previous repository already contains `dist/assets/aa-logo.png`, `lawn-stripes.webp`, `team-trimming.webp`, and all six original before/after pairs. Those files are not altered by this ZIP. The included build script has an optional fallback which restores missing original photographs from the public `caliphsafe/analawn` repository during a Vercel build.

### Social sharing

Link previews are determined by the publicly deployed page, not by opening `dist/index.html` directly. The build script replaces `https://site-origin.invalid` in OG image/URL metadata, canonical tags, robots.txt, and sitemap.xml with the deployed domain. For a custom domain, set the Vercel environment variable `SITE_URL=https://your-domain.example` and redeploy. Messaging apps may cache older thumbnails.

### Local editing

Edit `dist/index.html`, `dist/styles.css`, and `dist/app.js`. New custom icon files are in `dist/assets/service-*.svg`. No npm packages are required. To preview locally with photos, clone your existing repository and replace the updated ZIP files in it, then run:

```sh
python3 -m http.server 8080 --directory dist
```

This avoids depending on ChatGPT hosting. All generated site files remain under your control.
