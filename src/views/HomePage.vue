<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLocationsStore, type Location } from '@/stores/locations'
import { useGeolocation } from '@/composables/useGeolocation'
import { orderByNearest, haversineKm, formatDistance } from '@/utils/geo'
import HomeTourMap from '@/components/HomeTourMap.vue'
import { Headphones, ArrowRight, ArrowUpRight, MapPin, LocateFixed, Loader2, ChevronDown } from 'lucide-vue-next'

const router = useRouter()
const locationsStore = useLocationsStore()
const { coords, status, request } = useGeolocation()

const LOOP = 5 // nearest stops that form the highlighted walking loop

const locations = computed(() => locationsStore.locations)
const stopCount = computed(() => locations.value.length)
const pad = (n: number) => String(n).padStart(2, '0')

// Nearest-first ordering once we know where the visitor stands.
const orderedStops = computed(() =>
  coords.value ? orderByNearest(coords.value, locations.value) : locations.value,
)
const nearest = computed(() => orderedStops.value[0])
const loopStops = computed(() => orderedStops.value.slice(0, LOOP))

const scrollToStops = () => {
  document.getElementById('stops')?.scrollIntoView({ behavior: 'smooth' })
}

// Featured = the nearest few, shown large. The rest collapse into districts.
const featuredStops = loopStops

const SECTION_ORDER = [
  'North Commercial Street',
  'East Main Street',
  'West Main Street',
  'Around Downtown',
]
const districtOf = (stop: Location): string => {
  const a = stop.description.toLowerCase()
  if (a.includes('commercial')) return 'North Commercial Street'
  if (a.includes('e. main')) return 'East Main Street'
  if (a.includes('w. main')) return 'West Main Street'
  return 'Around Downtown'
}

const moreSections = computed(() => {
  const featuredIds = new Set(featuredStops.value.map((s) => s.id))
  const rest = orderedStops.value.filter((s) => !featuredIds.has(s.id))
  const groups: Record<string, Location[]> = {}
  for (const s of rest) (groups[districtOf(s)] ||= []).push(s)
  return SECTION_ORDER.filter((name) => groups[name]?.length).map((name) => ({
    name,
    items: groups[name] as Location[],
  }))
})

// Collapsible state — the first district opens by default.
const openSections = ref<Set<string>>(new Set())
const isOpen = (name: string) =>
  openSections.value.has(name) || (openSections.value.size === 0 && name === moreSections.value[0]?.name)
const toggleSection = (name: string) => {
  const set = new Set(openSections.value)
  // Materialise the implicit default-open first section before toggling.
  if (set.size === 0 && moreSections.value[0]) set.add(moreSections.value[0].name)
  set.has(name) ? set.delete(name) : set.add(name)
  openSections.value = set
}
const nearestDistance = computed(() =>
  coords.value && nearest.value
    ? formatDistance(haversineKm(coords.value, nearest.value.coordinates))
    : null,
)

const startTour = () => {
  if (!nearest.value) return
  router.push({ name: 'location', params: { id: nearest.value.id } })
}
const navigateToLocation = (id: number) => {
  router.push({ name: 'location', params: { id } })
}

onMounted(() => request())
</script>

<template>
  <div class="home">
    <!-- ============ HERO ============ -->
    <header class="hero">
      <!-- Full-bleed live route map -->
      <div class="hero-map">
        <HomeTourMap
          :stops="orderedStops"
          :user-location="coords"
          :highlight="LOOP"
          bleed
          offset-right
        />
      </div>

      <!-- Map key — badges aligned to the same content grid as the hero text -->
      <div class="container hero-key-wrap">
        <ul class="hero-key">
          <li class="key-label eyebrow">{{ coords ? 'Nearest stops' : 'Start of the loop' }}</li>
          <li
            v-for="(stop, i) in loopStops"
            :key="stop.id"
            class="key-badge"
            @click="navigateToLocation(stop.id)"
          >
            <span class="key-num">{{ i + 1 }}</span>
            <span class="key-name">{{ stop.name }}</span>
          </li>
          <li class="key-badge key-badge--all" @click="scrollToStops">
            <span class="key-name">All {{ stopCount }} stops</span>
            <span class="key-arrow">↓</span>
          </li>
        </ul>
      </div>

      <div class="container hero-copy-wrap">
        <!-- Left: editorial intro -->
        <div class="hero-copy">
          <p class="eyebrow eyebrow--brass hero-kicker">Self-guided audio walking tour</p>

          <h1 class="hero-title">
            <span class="ht-line">Stories of</span>
            <span class="ht-line ht-emph">Trinidad</span>
          </h1>

          <p class="hero-lead">
            Stand where the history happened. We’ll plot a walking loop from where
            you are and let each historic building tell its own story.
          </p>

          <div class="hero-actions">
            <button class="hero-cta" @click="startTour">
              <span class="hero-cta-ic"><Headphones :size="18" :stroke-width="1.6" /></span>
              <span>{{ coords ? 'Start nearest stop' : 'Begin the tour' }}</span>
            </button>

            <!-- Location status -->
            <div class="geo" :data-status="status">
              <Loader2 v-if="status === 'prompting'" class="spin" :size="15" :stroke-width="1.8" />
              <MapPin v-else :size="15" :stroke-width="1.8" />
              <span v-if="status === 'prompting'">Finding you…</span>
              <span v-else-if="status === 'granted' && nearest">
                Nearest: <b>{{ nearest.name }}</b>
                <template v-if="nearestDistance"> · {{ nearestDistance }}</template>
              </span>
              <button v-else-if="status === 'denied' || status === 'unavailable'" class="geo-retry" @click="request">
                <LocateFixed :size="14" :stroke-width="1.8" /> Use my location
              </button>
              <span v-else>Routing from your location</span>
            </div>
          </div>

          <div class="hero-meta">
            <span><b>{{ stopCount }}</b> Stops</span>
            <span class="dot" aria-hidden="true"></span>
            <span><b>~15</b> Min Walk</span>
            <span class="dot" aria-hidden="true"></span>
            <span><b>Est.</b> 1862</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ============ INDEX ============ -->
    <main class="index" id="stops">
      <div class="container">
        <div class="index-head" v-reveal>
          <span class="numeral index-count">{{ pad(stopCount) }}</span>
          <h2 class="index-title">The Stops</h2>
          <p class="index-sub">
            {{ coords
              ? 'Start with the stops nearest you, then explore the rest by district.'
              : 'Begin at the heart of downtown, then explore the rest by district.' }}
          </p>
        </div>

        <!-- Featured: the nearest few, shown large -->
        <ul class="stop-list">
          <li
            v-for="(location, i) in featuredStops"
            :key="location.id"
            class="stop"
            v-reveal="i * 90"
            @click="navigateToLocation(location.id)"
          >
            <div class="stop-media">
              <span class="stop-num numeral">{{ pad(i + 1) }}</span>
              <div class="stop-frame">
                <img
                  :src="location.images[0]?.url || ''"
                  :alt="location.images[0]?.alt || location.name"
                  loading="lazy"
                />
              </div>
            </div>

            <div class="stop-body">
              <p class="eyebrow stop-kicker">
                <span v-if="location.era">{{ location.era }}</span>
                <span v-if="location.style" class="stop-style"> · {{ location.style }}</span>
              </p>
              <h3 class="stop-name">{{ location.name }}</h3>
              <p class="stop-addr">{{ location.description }}</p>
              <p class="stop-teaser">{{ location.teaser }}</p>

              <span class="stop-listen">
                <Headphones :size="15" :stroke-width="1.7" />
                <span>{{ location.duration || 'Audio tour' }}</span>
                <ArrowRight class="stop-arrow" :size="16" :stroke-width="1.7" />
              </span>
            </div>
          </li>
        </ul>

        <!-- The rest: collapsible district sections -->
        <div class="more" v-reveal>
          <div class="more-head">
            <span class="eyebrow eyebrow--brass">The full route</span>
            <h3 class="more-title">More to explore</h3>
          </div>

          <div
            v-for="section in moreSections"
            :key="section.name"
            class="district"
            :class="{ open: isOpen(section.name) }"
          >
            <button
              class="district-head"
              :aria-expanded="isOpen(section.name)"
              @click="toggleSection(section.name)"
            >
              <span class="district-name">{{ section.name }}</span>
              <span class="district-meta">
                <span class="district-count">{{ section.items.length }} stops</span>
                <ChevronDown class="district-chev" :size="18" :stroke-width="1.7" />
              </span>
            </button>

            <div v-show="isOpen(section.name)" class="district-body">
              <button
                v-for="stop in section.items"
                :key="stop.id"
                class="mini"
                @click="navigateToLocation(stop.id)"
              >
                <span class="mini-main">
                  <span class="mini-name">{{ stop.name }}</span>
                  <span class="mini-addr">{{ stop.description }}</span>
                </span>
                <span v-if="stop.era" class="mini-era">{{ stop.era }}</span>
                <ArrowUpRight class="mini-go" :size="17" :stroke-width="1.6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ============ FOOTER ============ -->
    <footer class="foot">
      <div class="container foot-inner">
        <div class="foot-brand">
          <span class="wm-line eyebrow">Stories of</span>
          <span class="wm-mark">Trinidad</span>
        </div>
        <p class="foot-note">
          A self-guided heritage tour of Trinidad, Colorado.<br />
          Scan a marker, press play, and walk into the past.
        </p>

        <p class="foot-attrib">
          Tour narratives adapted from <em>A Walk Through the History of Trinidad</em>
          by Gerald H. Stokes, produced by the Trinidad Tourism Board.
          Audio and photographs courtesy of
          <a href="https://youraudiotour.com/tours/a-walk-through-the-history-of-trinidad/"
             target="_blank" rel="noopener">Your Audio Tour</a>.
        </p>

        <p class="foot-credit eyebrow">Trinidad · Colorado · USA</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home { min-height: 100vh; background: var(--paper); }

/* ============ HERO ============ */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: 7rem;
  padding-bottom: 4rem;
  overflow: hidden;
  background: var(--paper);
}
.hero::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: var(--line);
  z-index: 3;
}

/* Full-bleed map sits behind everything */
.hero-map {
  position: absolute;
  inset: 0;
  z-index: 0;
}
/* Scrim that keeps the left-hand text legible over the map */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    var(--paper) 0%,
    color-mix(in srgb, var(--paper) 92%, transparent) 30%,
    color-mix(in srgb, var(--paper) 55%, transparent) 46%,
    transparent 62%
  );
}

/* Overlay column — only the text itself captures pointer events,
   so the map stays pannable on the right. */
.hero-copy-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  pointer-events: none;
}
.hero-copy {
  max-width: 34rem;
  pointer-events: auto;
}

/* Map key — sits inside the content container, so its inset matches the
   hero text's inset on the opposite edge (a quiet left/right symmetry). */
.hero-key-wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(1.25rem, 5vw, 4rem);
  z-index: 2;
  pointer-events: none;
}
.hero-key {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}
.key-badge {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.38rem 1rem 0.38rem 0.38rem;
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  backdrop-filter: saturate(1.1) blur(10px);
  -webkit-backdrop-filter: saturate(1.1) blur(10px);
  border: 1px solid var(--line);
  border-radius: 100px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform var(--t-fast), box-shadow var(--t-fast), border-color var(--t-fast);
  animation: rise 760ms var(--ease-out) both;
}
.key-badge:nth-child(1) { animation-delay: 540ms; }
.key-badge:nth-child(2) { animation-delay: 620ms; }
.key-badge:nth-child(3) { animation-delay: 700ms; }
.key-badge:nth-child(4) { animation-delay: 780ms; }
.key-badge:nth-child(5) { animation-delay: 860ms; }
.key-badge:hover {
  transform: translateX(-3px);
  box-shadow: var(--shadow);
  border-color: var(--line-2);
}
.key-num {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper);
  border: 1.5px solid var(--brass-2);
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 600;
}
.key-name {
  font-family: var(--font-sans);
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--ink);
  white-space: nowrap;
}
.key-badge:hover .key-name { color: var(--brass); }

.key-label {
  margin-bottom: 0.2rem;
  color: var(--ink-2);
  text-shadow: 0 1px 10px var(--paper);
  animation: rise 760ms var(--ease-out) 480ms both;
}
.key-badge--all {
  padding: 0.55rem 1rem;
  background: var(--ink);
  border-color: var(--ink);
}
.key-badge--all .key-name { color: var(--paper); }
.key-badge--all:hover { background: var(--brass); border-color: var(--brass); }
.key-badge--all:hover .key-name { color: #fff; }
.key-arrow {
  margin-left: 0.5rem;
  color: var(--brass-2);
  font-size: 0.9rem;
}
.key-badge--all:hover .key-arrow { color: #fff; }

.hero-kicker {
  margin-bottom: 1.5rem;
  animation: rise 900ms var(--ease-out) both;
}
.hero-title {
  font-weight: 400;
  font-size: clamp(3.4rem, 8.5vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
}
.ht-line { display: block; animation: rise 1000ms var(--ease-out) both; }
.ht-line:nth-child(1) { animation-delay: 60ms; color: var(--ink); }
.ht-emph {
  font-style: italic;
  font-weight: 300;
  color: var(--brass);
  animation-delay: 160ms;
  margin-left: 0.04em;
}
.hero-lead {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: var(--fs-lead);
  line-height: 1.5;
  color: var(--ink-2);
  max-width: 32rem;
  margin-bottom: 2.25rem;
  animation: rise 1000ms var(--ease-out) 280ms both;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2.25rem;
  animation: rise 1000ms var(--ease-out) 360ms both;
}
.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  padding: 0.95rem 1.7rem 0.95rem 0.95rem;
  border-radius: 100px;
  transition: background var(--t-fast), transform var(--t-fast);
  box-shadow: var(--shadow);
}
.hero-cta:hover { background: var(--brass); transform: translateY(-2px); }
.hero-cta:active { transform: translateY(0); }
.hero-cta-ic {
  display: grid;
  place-items: center;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
}

.geo {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.8rem;
  color: var(--ink-3);
  letter-spacing: 0.01em;
}
.geo b { color: var(--ink); font-weight: 600; }
.geo[data-status='granted'] { color: var(--ink-2); }
.geo .spin { animation: spin 0.9s linear infinite; color: var(--brass); }
.geo-retry {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass);
  border-bottom: 1px solid transparent;
  transition: border-color var(--t-fast);
}
.geo-retry:hover { border-color: var(--brass); }

.hero-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: var(--ink-3);
  text-transform: uppercase;
  animation: rise 1000ms var(--ease-out) 440ms both;
}
.hero-meta b { color: var(--ink); font-weight: 600; }
.hero-meta .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--brass); opacity: 0.7; }

@keyframes rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ============ INDEX ============ */
.index { padding-top: var(--sp-8); padding-bottom: var(--sp-8); }
.index-head { position: relative; max-width: var(--measure); margin-bottom: var(--sp-7); }
.index-count { display: block; font-size: 1rem; letter-spacing: 0.3em; margin-bottom: 1rem; }
.index-title { font-size: var(--fs-display); font-style: italic; font-weight: 300; margin-bottom: 1rem; }
.index-sub { font-size: 1.05rem; color: var(--ink-3); max-width: 30rem; }

.stop-list { list-style: none; }
.stop {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(1.5rem, 5vw, 4.5rem);
  align-items: center;
  padding: var(--sp-7) 0;
  border-top: 1px solid var(--line);
  cursor: pointer;
}
.stop:last-child { border-bottom: 1px solid var(--line); }
.stop:nth-child(even) .stop-media { order: 2; }

.stop-media { position: relative; }
.stop-num {
  position: absolute;
  top: -1.4rem; left: -0.5rem;
  z-index: 3;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1;
  color: var(--paper);
  text-shadow: 0 1px 18px rgba(33,28,23,0.35);
  pointer-events: none;
}
.stop-frame {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow);
}
.stop-frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform var(--t-slow), filter var(--t);
  filter: saturate(0.92);
}
.stop:hover .stop-frame img { transform: scale(1.05); filter: saturate(1.02); }

.stop-body { max-width: 32rem; }
.stop-kicker { margin-bottom: 1rem; color: var(--brass); }
.stop-style { color: var(--ink-3); }
.stop-name { font-size: var(--fs-h1); line-height: 1.0; margin-bottom: 0.65rem; transition: color var(--t-fast); }
.stop:hover .stop-name { color: var(--brass); }
.stop-addr {
  font-family: var(--font-sans);
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 1.25rem;
}
.stop-teaser {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  line-height: 1.45;
  color: var(--ink-2);
  margin-bottom: 1.75rem;
}
.stop-listen {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--ink);
  transition: gap var(--t-fast), color var(--t-fast), border-color var(--t-fast);
}
.stop:hover .stop-listen { color: var(--brass); border-color: var(--brass); }
.stop-arrow { transition: transform var(--t); }
.stop:hover .stop-arrow { transform: translateX(5px); }

/* ---- Collapsible district sections ---- */
.more { margin-top: var(--sp-7); }
.more-head { margin-bottom: var(--sp-4); }
.more-head .eyebrow { display: block; margin-bottom: 0.6rem; }
.more-title {
  font-size: var(--fs-h2);
  font-style: italic;
  font-weight: 300;
}

.district { border-top: 1px solid var(--line); }
.district:last-child { border-bottom: 1px solid var(--line); }

.district-head {
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 0;
  text-align: left;
  transition: color var(--t-fast);
}
.district-name {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.9rem);
  font-weight: 400;
  color: var(--ink);
  transition: color var(--t-fast);
}
.district-head:hover .district-name { color: var(--brass); }
.district-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  flex-shrink: 0;
}
.district-count {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.district-chev {
  color: var(--ink-2);
  transition: transform var(--t), color var(--t-fast);
}
.district.open .district-chev { transform: rotate(180deg); color: var(--brass); }

.district-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem 2.5rem;
  padding-bottom: 1.5rem;
}
.mini {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  padding: 0.85rem 0.25rem;
  border-top: 1px solid var(--line);
  transition: padding var(--t-fast);
}
.mini:hover { padding-left: 0.7rem; }
.mini-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.15rem; }
.mini-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.15;
  transition: color var(--t-fast);
}
.mini:hover .mini-name { color: var(--brass); }
.mini-addr {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.mini-era {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brass);
  white-space: nowrap;
}
.mini-go { flex-shrink: 0; color: var(--ink-3); transition: color var(--t-fast), transform var(--t); }
.mini:hover .mini-go { color: var(--brass); transform: translate(2px, -2px); }

/* ============ FOOTER ============ */
.foot { background: var(--surface-ink); color: var(--paper); padding: var(--sp-8) 0 var(--sp-6); }
.foot-inner { text-align: center; }
.foot-brand { margin-bottom: 1.5rem; }
.foot-brand .wm-line { color: rgba(245,238,226,0.5); display: block; margin-bottom: 0.4rem; }
.foot-brand .wm-mark {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(2.5rem, 7vw, 4rem);
  color: var(--paper);
}
.foot-note { color: rgba(245,238,226,0.65); line-height: 1.8; max-width: 28rem; margin: 0 auto 2rem; }
.foot-attrib {
  color: rgba(245, 238, 226, 0.42);
  font-size: 0.78rem;
  line-height: 1.7;
  max-width: 34rem;
  margin: 0 auto 2.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--line-on-dark);
}
.foot-attrib em { font-family: var(--font-display); font-style: italic; color: rgba(245, 238, 226, 0.6); }
.foot-attrib a {
  color: rgba(245, 238, 226, 0.7);
  border-bottom: 1px solid var(--line-on-dark);
  transition: color var(--t-fast), border-color var(--t-fast);
}
.foot-attrib a:hover { color: var(--brass-2); border-color: var(--brass-2); }
.foot-credit { color: rgba(245,238,226,0.4); letter-spacing: 0.3em; }

/* ============ RESPONSIVE ============ */
@media (max-width: 960px) {
  .hero {
    min-height: 0;
    flex-direction: column;
    align-items: stretch;
    padding-top: 6.5rem;
    padding-bottom: 0;
  }
  /* Stack: text first, map as a full-width band below */
  .hero::before { display: none; }
  .hero-copy-wrap { order: 1; pointer-events: auto; }
  .hero-copy { max-width: 38rem; }
  .hero-map {
    position: relative;
    inset: auto;
    order: 2;
    height: 46svh;
    min-height: 300px;
    margin-top: 2.5rem;
    border-top: 1px solid var(--line);
  }
}

@media (max-width: 820px) {
  .stop { grid-template-columns: 1fr; gap: 1.75rem; padding: var(--sp-6) 0; }
  .stop:nth-child(even) .stop-media { order: 0; }
  .stop-num { top: -1rem; left: -0.25rem; }
  .stop-frame { aspect-ratio: 16 / 10; }
  .district-body { grid-template-columns: 1fr; gap: 0; }
}

@media (max-width: 560px) {
  .hero-meta { gap: 0.7rem; font-size: 0.72rem; }
  .hero-actions { gap: 1rem; }
}
</style>
