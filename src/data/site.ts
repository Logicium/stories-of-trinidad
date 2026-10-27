import { reactive } from 'vue'

/**
 * The tour's copy, lifted into one reactive object.
 *
 * Everything here is prose on the public screens: the hero, the index
 * heading, the collapsible route section and the footer. It lives in one
 * place for one reason: the Apotome editor kit edits a single reactive tree,
 * and the published overlay from the studio is merged onto this object at
 * boot.
 *
 * The stops are deliberately NOT here. They live in locations.ts with their
 * coordinates, audio, images and transcripts, which is tour data rather than
 * site copy: an editor that let someone retype a building's latitude in a
 * contenteditable would be a liability, not a feature.
 *
 * Components render from `content` and nothing else, so an edit published
 * through the studio reaches visitors without a deploy.
 */
export const content = reactive({
  header: {
    locale: 'Trinidad · Colorado',
    backLabel: 'All Stops',
    scanLabel: 'Scan',
    wordmarkLine: 'Stories of',
    wordmarkName: 'Trinidad',
  },

  hero: {
    kicker: 'Self-guided audio walking tour',
    titleLine: 'Stories of',
    titleEmph: 'Trinidad',
    lead: 'Stand where the history happened. We’ll plot a walking loop from where you are and let each historic building tell its own story.',
    /* the label changes once the browser has given us a position */
    ctaStart: 'Begin the tour',
    ctaNearest: 'Start nearest stop',
    keyLabelStart: 'Start of the loop',
    keyLabelNearest: 'Nearest stops',
    allStopsLabel: 'All',
    walkMinutes: '~15',
    walkLabel: 'Min Walk',
    stopsLabel: 'Stops',
    estLabel: 'Est.',
    estYear: '1862',
  },

  index: {
    title: 'The Stops',
    subStart: 'Begin at the heart of downtown, then explore the rest by district.',
    subNearest: 'Start with the stops nearest you, then explore the rest by district.',
    moreEyebrow: 'The full route',
    moreTitle: 'More to explore',
  },

  footer: {
    wordmarkLine: 'Stories of',
    wordmarkName: 'Trinidad',
    noteLead: 'A self-guided heritage tour of Trinidad, Colorado.',
    noteTrail: 'Scan a marker, press play, and walk into the past.',
    attributionLead: 'Tour narratives adapted from',
    attributionWork: 'A Walk Through the History of Trinidad',
    attributionTrail:
      'by Gerald H. Stokes, produced by the Trinidad Tourism Board. Audio and photographs courtesy of',
    attributionLinkLabel: 'Your Audio Tour',
    attributionLinkUrl:
      'https://youraudiotour.com/tours/a-walk-through-the-history-of-trinidad/',
    credit: 'Trinidad · Colorado · USA',
  },
})
