import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';
const imageNames = ['aa-logo.png','courtyard-after.webp','courtyard-before.webp','evening-lawn.webp','flowerbed-after.webp','flowerbed-before.webp','hedges-after.webp','hedges-before.webp','lawn-stripes.webp','leaves-after.webp','leaves-before.webp','porch-after.webp','porch-before.webp','stonebed-after.webp','stonebed-before.webp','team-trimming.webp'];
const assets = 'dist/assets';
await mkdir(assets, {recursive:true});
// Preserve existing image files in the repo. For a clean upload to a new folder,
// download the exact originals from the public A & A GitHub repository at build time.
for (const name of imageNames) {
  const path = join(assets,name);
  try { await access(path); continue; } catch {}
  const url = `https://raw.githubusercontent.com/caliphsafe/analawn/main/dist/assets/${name}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Couldn't retrieve original photo ${name} (${response.status})`);
  await writeFile(path, new Uint8Array(await response.arrayBuffer()));
  console.log(`Restored existing photography: ${name}`);
}
const host=process.env.SITE_URL||process.env.VERCEL_PROJECT_PRODUCTION_URL||process.env.VERCEL_URL;
if(!host) {console.log('Local build: no SITE_URL set. Placeholder SEO URL retained.');process.exit(0)}
const u=new URL(host.includes('://')?host:`https://${host}`);
if(!['https:','http:'].includes(u.protocol)||u.username||u.password||u.search||u.hash||u.pathname!=='/') throw new Error('SITE_URL must be a plain http(s) origin.');
for(const file of ['dist/index.html','dist/robots.txt','dist/sitemap.xml']){
  const source=await readFile(file,'utf8');
  await writeFile(file,source.replaceAll('https://site-origin.invalid',u.origin));
}
console.log(`A & A static site ready at ${u.origin}`);
