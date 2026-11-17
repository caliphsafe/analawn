# A & A Lawn & More — Landscape-inspired redesign

A fully rebuilt, responsive one-page landscaping website for Aaron and Alvin, preserving the original dark-green / lime / cream branding and all 15 supplied work photos in the existing GitHub repository. No dependencies, no framework, no hosting inside ChatGPT.

## Upload to your existing GitHub repo

1. **Do not delete the existing `dist/assets` photographs.** They are original owner-supplied photography and are intentionally left untouched in this redesign ZIP.
2. Extract this ZIP. In `caliphsafe/analawn` on GitHub, choose **Add file → Upload files**, and upload the **contents** of the extracted folder, retaining the `dist/` and `scripts/` directory structure. Approve replacing the same-named files.
3. If your upload tool cannot upload nested directories directly, use the GitHub web editor or upload via GitHub Desktop.
4. On Vercel, import or redeploy `caliphsafe/analawn` on the `main` branch. Leave **Root Directory** at the repository root. Framework: **Other**. The included `vercel.json` uses `node scripts/build.mjs` and serves `dist`.

### Image handling

The ZIP contains updated source code and the new favicon, but not duplicated photographic binaries (which already exist in the target repository). Every original image path is retained. As an extra safeguard, the build script restores any missing original photos or the A & A logo by downloading them from the public `caliphsafe/analawn` `main` branch during build. Thus, the ZIP is specifically prepared to update **this existing repository**, not replace its owner-supplied asset library.

## Features

- One-word navigation: Services / Work / About / Process / Contact
- Responsive full-bleed photo hero, original landscape-themed line icons, editorial section layouts
- Six real before-and-after image pairs with keyboard-accessible project tabs
- Actual A & A yard and team photographs; no stock photos or emojis in the UI
- Three-step service quote with validation, text-message preview, group SMS, two individual fallback links and copy option
- Mobile menu, mobile quote shortcut, FAQs, phone links and structured local-business metadata
- Accessibility: skip navigation, visible keyboard focus, labelled form fields, reduced-motion support

## Quotes

The form does **not** send messages by itself. It opens the visitor's SMS application with a drafted message to Aaron (774-365-2080) and Alvin (508-509-8320). Visitors must tap Send. Some phones may not support group SMS URL schemes; single-recipient fallback links and Copy are provided. Test on iOS and Android before launch.

## Local preview

Run `python3 -m http.server 8080 --directory dist` from the repository root, then visit `http://localhost:8080`. The original photographs must remain in `dist/assets` for local display. If you've downloaded this ZIP separately, copy the photos from your original repository first, or run `node scripts/build.mjs` to fetch them from GitHub while online.

To set the SEO domain during a local build, set `SITE_URL=https://yourdomain.com` before running `node scripts/build.mjs`. Vercel automatically supplies the production URL if `SITE_URL` is not set.

## Mobile icon consistency update — 17 November 2026

Replaced every font-based decorative starburst and direction-arrow symbol in `dist/index.html` with inline SVG icons, including the mobile menu and floating quote call-to-action. Added shared SVG sizing rules to `dist/styles.css`. There are no emoji-style pictographs in the UI markup. All services, photos, navigation labels, project tabs, contacts, and SMS quote logic are unchanged.
