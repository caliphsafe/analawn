# A & A Lawn & More

Complete one-page landscaping website, including the logo, locally hosted fonts, 15 work photographs, six before-and-after projects, and a detailed quote form. GitHub is the source of truth. No ChatGPT hosting or account is required to run this site.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import **caliphsafe/analawn**.
2. Use the **main** branch and keep **Root Directory** at the repository root (do not select `dist`).
3. Framework preset: **Other**. The committed `vercel.json` sets the build command to `node scripts/build.mjs`, output directory to `dist`, and skips dependency installation.
4. Click **Deploy**. No API keys, npm packages, or lockfile are required.

The build uses Vercel's production domain for the canonical URL, social metadata, business schema, robots.txt and sitemap. If connecting a custom domain, set the optional **SITE_URL** environment variable to its full origin (for example `https://your-business.com`) and redeploy. Do not include a path or trailing query. Vercel system environment variables should remain enabled (the default).

## Editing and local preview

Edit `dist/index.html`, `dist/styles.css`, and `dist/app.js`; photos and fonts live in `dist/assets/`. Preview with `python3 -m http.server 8080 --directory dist`. To exercise the deployment build locally: `SITE_URL=http://localhost:8080 node scripts/build.mjs`. The committed `https://site-origin.invalid` metadata placeholder is replaced at deployment; it is not a hosting dependency.

## Quotes

The three-step form validates service selections, property information, contact details, timing and work requested. It prepares a text to Aaron (774-365-2080) and Alvin (508-509-8320). Customers review and press Send in their messaging app. The website does not automatically transmit texts or store requests. Separate-recipient links and a copy button are included for devices that do not support group SMS links. Photos can be attached in the messaging app or shared using the optional photo-album URL field. Test native text behavior on target phones before public launch.

## Photography

All work photos are supplied by the owner. The gallery includes fall cleanup, hedge cleanup, courtyard cleanup, flower-bed mulching, porch-bed mulching, and stone-edged bed cleanup. Three additional photos appear in the hero and about sections. Before/after views are shown separately because camera angles differ.
