/**
 * The public route table, with each page's SEO record.
 *
 * This is the only list of public routes. The router spreads it; the
 * prerender (scripts/prerender.ts) walks it to write one HTML file per page
 * (the home page and one per tour stop), the sitemap, robots.txt and
 * llms.txt; the runtime applies the same records on navigation. No browser
 * dependency here: the prerender imports this under Node.
 */
import type { RouteRecordRaw } from 'vue-router'
import { absUrl, compact, entityId, esc, itemListNode, truncate, type RouteSeo } from '@/seo'
import { site } from '@/seo.site'
import { content } from '@/data/site'
import { locationsData, type LocationData } from '@/data/locations'

const stopPath = (l: LocationData) => `/location/${l.id}`

/** "6 min listen" -> "PT6M" */
const isoDuration = (d?: string) => {
  const m = /(\d+)\s*min/.exec(d ?? '')
  return m ? `PT${m[1]}M` : undefined
}

/** The narratives' source, credited in the footer of every page. */
const source = {
  '@type': 'Book',
  name: content.footer.attributionWork,
  author: { '@type': 'Person', name: 'Gerald H. Stokes' },
  publisher: { '@type': 'Organization', name: 'Trinidad Tourism Board' },
}

const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('')

const stopSeo: RouteSeo<LocationData> = {
  expand: () => locationsData.map((l) => ({ params: { id: String(l.id) }, data: l })),
  title: ({ data }) => data.name,
  description: ({ data }) =>
    truncate(`${data.name}, ${data.description} in Trinidad, Colorado${data.era ? ` (${data.era.toLowerCase()})` : ''}: stop ${locationsData.indexOf(data) + 1} of the audio heritage tour. ${data.teaser ?? ''}`, 160),
  image: ({ data }) => (data.images[0] ? { url: data.images[0].url, alt: data.images[0].alt } : undefined),
  breadcrumb: ({ data }) => [{ name: data.name }],
  schema: ({ site, path, data }) => {
    const url = absUrl(site, path)
    return compact({
      '@type': 'TouristAttraction',
      '@id': `${url}#place`,
      name: data.name,
      description: data.teaser ? truncate(data.teaser, 300) : undefined,
      url,
      image: data.images.map((i) => absUrl(site, i.url)),
      address: { '@type': 'PostalAddress', streetAddress: data.description, addressLocality: 'Trinidad', addressRegion: 'CO', addressCountry: 'US' },
      geo: { '@type': 'GeoCoordinates', latitude: data.coordinates.lat, longitude: data.coordinates.lng },
      containedInPlace: { '@type': 'City', name: 'Trinidad, Colorado' },
      subjectOf: compact({
        '@type': 'AudioObject',
        '@id': `${url}#audio`,
        name: `${data.name}: audio story`,
        contentUrl: absUrl(site, data.audioUrl),
        encodingFormat: 'audio/mpeg',
        duration: isoDuration(data.duration),
        inLanguage: 'en-US',
        isBasedOn: source,
        publisher: { '@id': entityId(site) },
      }),
    })
  },
  body: ({ data }) => {
    const i = locationsData.indexOf(data)
    const prev = locationsData[i - 1]
    const next = locationsData[i + 1]
    const meta = [data.description, data.era, data.style, data.duration].filter(Boolean).map((m) => esc(m!)).join(' · ')
    // the transcript opens with "Name: address", which the heading already says
    const transcript = data.transcript.replace(/^[^\n]*\n/, '')
    return `<article><p>Stop ${i + 1} of ${locationsData.length} · Trinidad, Colorado</p><h1>${esc(data.name)}</h1><p>${meta}</p>${data.teaser ? `<p>${esc(data.teaser)}</p>` : ''}<p><a href="${esc(data.audioUrl)}">Listen to the audio story</a></p><h2>Transcript</h2>${paragraphs(transcript)}<nav aria-label="Tour"><ul>${prev ? `<li>Previous stop: <a href="${stopPath(prev)}">${esc(prev.name)}</a></li>` : ''}${next ? `<li>Next stop: <a href="${stopPath(next)}">${esc(next.name)}</a></li>` : ''}<li><a href="/">All stops</a></li></ul></nav><p>${esc(content.footer.attributionLead)} <em>${esc(content.footer.attributionWork)}</em> ${esc(content.footer.attributionTrail)} <a href="${esc(content.footer.attributionLinkUrl)}">${esc(content.footer.attributionLinkLabel)}</a>.</p></article>`
  },
}

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      seo: {
        description:
          'Walk historic downtown Trinidad, Colorado with a self-guided audio tour: 42 stops from the Columbian Hotel to the Fox Theatre, each with its story and photographs.',
        schema: ({ site, path }) => [
          compact({
            '@type': 'TouristTrip',
            '@id': `${absUrl(site, path)}#tour`,
            name: 'Stories of Trinidad audio walking tour',
            description: `${content.footer.noteLead} ${content.footer.noteTrail}`,
            touristType: ['Heritage tourism', 'Walking tour'],
            provider: { '@id': entityId(site) },
            itinerary: { '@id': `${absUrl(site, path)}#list` },
          }),
          itemListNode(
            site,
            path,
            'Stops on the Stories of Trinidad tour',
            locationsData.map((l) => ({ name: l.name, path: stopPath(l), image: l.images[0]?.url })),
          ),
        ],
        body: () =>
          `<main><p>${esc(content.hero.kicker)} · ${esc(content.header.locale)}</p><h1>${esc(content.hero.titleLine)} ${esc(content.hero.titleEmph)}</h1><p>${esc(content.hero.lead)}</p><p>${locationsData.length} stops · ${esc(content.hero.walkMinutes)} min walk · Est. ${esc(content.hero.estYear)}</p><h2>${esc(content.index.title)}</h2><p>${esc(content.index.subStart)}</p><ol>${locationsData.map((l) => `<li><a href="${stopPath(l)}">${esc(l.name)}</a>, ${esc(l.description)}${l.era ? ` (${esc(l.era)})` : ''}${l.teaser ? `: ${esc(l.teaser)}` : ''}</li>`).join('')}</ol><p>${esc(content.footer.noteLead)} ${esc(content.footer.noteTrail)}</p><p>${esc(content.footer.attributionLead)} <em>${esc(content.footer.attributionWork)}</em> ${esc(content.footer.attributionTrail)} <a href="${esc(content.footer.attributionLinkUrl)}">${esc(content.footer.attributionLinkLabel)}</a>.</p></main>`,
      },
    },
  },
  { path: '/location/:id', name: 'location', component: () => import('@/views/TourLocation.vue'), meta: { seo: stopSeo } },
]

export const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('@/views/NotFoundPage.vue'),
  meta: { seo: { title: 'Page not found', description: 'That page is not part of the Stories of Trinidad tour.', noindex: true } },
}
