/**
 * Who this site is, for search engines and assistants.
 *
 * The one record behind every title suffix, canonical, share card, robots
 * policy and the Organization node on the home page. Facts come from the
 * tour's own copy in src/data/site.ts and src/data/locations.ts. Pure data:
 * the prerender imports it under Node and the app imports it in the browser.
 */
import type { SiteConfig } from '@/seo'

export const site: SiteConfig = {
  siteUrl: 'https://www.storiesoftrinidad.co',
  // Google Search Console ownership tag (home page only). Managed by the studio.
  verification: { google: 'NkWLQ-lvWc-VLcKYKy0c8TugoEv1Eb8dC45pkYf5VmQ' },
  name: 'Stories of Trinidad',
  tagline: 'Self-guided audio heritage tour',
  description:
    'A self-guided audio walking tour of historic downtown Trinidad, Colorado: 42 stops, each with photographs, a narrated story and a full transcript.',
  lang: 'en',
  locale: 'en_US',
  image: { url: '/og/default.png', width: 1200, height: 630, alt: 'Stories of Trinidad, a self-guided audio heritage tour of Trinidad, Colorado' },
  entity: {
    type: 'Organization',
    name: 'Stories of Trinidad',
    description:
      'Stories of Trinidad is a self-guided audio heritage tour of Trinidad, Colorado. Visitors scan a marker or open a stop, press play and hear the history of the downtown building in front of them, with photographs and a full transcript.',
    logo: '/icon-512.png',
    image: '/og/default.png',
    address: { addressLocality: 'Trinidad', addressRegion: 'CO', addressCountry: 'US' },
    areaServed: ['Trinidad, Colorado'],
    knowsAbout: ['History of Trinidad, Colorado', 'Historic architecture', 'Santa Fe Trail', '1913-14 Colorado coalfield strike', 'Heritage tourism'],
  },
  crawlers: { training: 'allow' },
  // no admin, account or checkout routes: every page is public
  privatePrefixes: [],
  llmsSummary:
    'Stories of Trinidad is a self-guided audio walking tour of downtown Trinidad, Colorado. Each of its 42 stops, from the Columbian Hotel to the Carnegie Public Library, has an address, photographs, an audio narration and a transcript adapted from "A Walk Through the History of Trinidad" by Gerald H. Stokes, produced by the Trinidad Tourism Board.',
}
