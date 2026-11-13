/**
 * Post-build: one HTML file per public route (the home page and every tour
 * stop), sitemap.xml, robots.txt, llms.txt and 404.html, from the route table
 * and site config. Every body comes from the tour data, so no API is read.
 *
 *   npm run build        runs this through the postbuild hook
 *   npx vite-node scripts/prerender.ts
 *
 * The Apotome Labs SEO + AEO Standard, section 13.
 */
import { prerender } from '../src/seo/node'
import { publicRoutes } from '../src/routes'
import { site } from '../src/seo.site'

await prerender({
  site,
  routes: publicRoutes,
  root: new URL('..', import.meta.url),
  // the transcripts are long-form reading; give assistants the whole text
  llmsFull: true,
})
