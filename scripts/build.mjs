import { readFile, writeFile } from 'node:fs/promises';
// Vercel provides the production domain automatically. SITE_URL is an optional
// override for a custom domain, e.g. https://your-business.com.
const host = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
if (!host) throw new Error('Set SITE_URL for a local build. Vercel supplies the deployment domain automatically.');
const url = new URL(host.includes('://') ? host : `https://${host}`);
if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
  throw new Error('SITE_URL must be a plain http(s) origin without credentials, path, query or fragment.');
}
for (const file of ['dist/index.html', 'dist/robots.txt', 'dist/sitemap.xml']) {
  const content = await readFile(file, 'utf8');
  await writeFile(file, content.replaceAll('https://site-origin.invalid', url.origin));
}
console.log(`Static website ready in dist. SEO origin: ${url.origin}`);
