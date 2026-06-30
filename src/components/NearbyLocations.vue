<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowUpRight, Navigation } from 'lucide-vue-next'
import HomeTourMap from '@/components/HomeTourMap.vue'
import { formatDistance } from '@/utils/geo'
import type { Location } from '@/stores/locations'

interface LocationWithDistance extends Location {
  distance: number
}

interface Props {
  locations: LocationWithDistance[]
  currentLocationName: string
  currentLocation?: { lat: number; lng: number }
}

const props = defineProps<Props>()
const router = useRouter()

const NEAR = 4 // nearest stops shown as cards + numbered on the map

const sorted = computed(() => [...props.locations].sort((a, b) => a.distance - b.distance))
const nearest = computed(() => sorted.value.slice(0, NEAR))
const farther = computed(() => sorted.value.slice(NEAR))

const navigateToLocation = (id: number) => {
  router.push({ name: 'location', params: { id } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section class="explore">
    <!-- Immersive map band — gradient + text overlay, like the hero -->
    <div class="explore-map">
      <HomeTourMap
        :stops="sorted"
        :user-location="currentLocation ?? null"
        :highlight="NEAR"
        bleed
        offset-right
      />
      <div class="explore-scrim" aria-hidden="true"></div>
      <div class="container explore-overlay">
        <span class="eyebrow eyebrow--brass">Keep walking</span>
        <h2 class="explore-title">Nearby Stops</h2>
        <p class="explore-sub">
          {{ sorted.length }} more stories within a short walk of {{ currentLocationName }}.
        </p>
      </div>
    </div>

    <div class="container">
      <!-- Nearest — full cards, numbered to match the map -->
      <ul class="near">
        <li
          v-for="(loc, i) in nearest"
          :key="loc.id"
          class="row"
          @click="navigateToLocation(loc.id)"
        >
          <span class="row-num">{{ i + 1 }}</span>
          <div class="row-thumb">
            <img :src="loc.images[0]?.url || ''" :alt="loc.images[0]?.alt || loc.name" loading="lazy" />
          </div>
          <div class="row-body">
            <span class="row-name">{{ loc.name }}</span>
            <span class="row-meta">
              <Navigation :size="12" :stroke-width="2" />
              {{ formatDistance(loc.distance) }} away
              <span v-if="loc.era"> · {{ loc.era }}</span>
            </span>
          </div>
          <ArrowUpRight class="row-go" :size="20" :stroke-width="1.6" />
        </li>
      </ul>

      <!-- Farther afield — compact thumbnail grid -->
      <div v-if="farther.length" class="far">
        <div class="far-head">
          <span class="eyebrow">Farther afield</span>
          <span class="far-count">{{ farther.length }} stops</span>
        </div>
        <div class="far-grid">
          <button
            v-for="loc in farther"
            :key="loc.id"
            class="far-card"
            @click="navigateToLocation(loc.id)"
          >
            <div class="far-thumb">
              <img :src="loc.images[0]?.url || ''" :alt="loc.images[0]?.alt || loc.name" loading="lazy" />
            </div>
            <div class="far-info">
              <span class="far-name">{{ loc.name }}</span>
              <span class="far-meta">{{ formatDistance(loc.distance) }} away</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.explore {
  background: var(--paper-2);
  padding: var(--sp-7) 0 var(--sp-8);
  border-top: 1px solid var(--line);
}

/* ---- Immersive map band ---- */
.explore-map {
  position: relative;
  width: 100%;
  height: min(58svh, 480px);
  margin-bottom: var(--sp-6);
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.explore-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    var(--paper-2) 0%,
    color-mix(in srgb, var(--paper-2) 90%, transparent) 30%,
    color-mix(in srgb, var(--paper-2) 50%, transparent) 46%,
    transparent 62%
  );
}
.explore-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
}
.explore-overlay .eyebrow { margin-bottom: 0.9rem; }
.explore-title {
  font-size: var(--fs-display);
  font-style: italic;
  font-weight: 300;
  margin-bottom: 0.9rem;
}
.explore-sub {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: var(--fs-lead);
  line-height: 1.45;
  color: var(--ink-2);
  max-width: 24rem;
}

/* ---- Nearest cards ---- */
.near { list-style: none; display: flex; flex-direction: column; }
.row {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 1.1rem 0.25rem;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: padding var(--t-fast);
}
.row:first-child { border-top: 1px solid var(--line); }
.row:hover { padding-left: 0.75rem; }
.row-num {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper);
  border: 1.5px solid var(--brass-2);
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 600;
}
.row-thumb {
  width: 72px; height: 72px;
  flex-shrink: 0;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--paper);
}
.row-thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: saturate(0.92);
  transition: transform var(--t);
}
.row:hover .row-thumb img { transform: scale(1.06); }
.row-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.35rem; }
.row-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.1;
  color: var(--ink);
  transition: color var(--t-fast);
}
.row:hover .row-name { color: var(--brass); }
.row-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.row-go { flex-shrink: 0; color: var(--ink-3); transition: color var(--t-fast), transform var(--t); }
.row:hover .row-go { color: var(--brass); transform: translate(3px, -3px); }

/* ---- Farther grid ---- */
.far { margin-top: var(--sp-6); }
.far-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--line);
}
.far-count {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.far-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(218px, 1fr));
  gap: 1.25rem;
}
.far-card {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  text-align: left;
  cursor: pointer;
}
.far-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--paper);
  box-shadow: var(--shadow-sm);
}
.far-thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: saturate(0.92);
  transition: transform var(--t-slow), filter var(--t);
}
.far-card:hover .far-thumb img { transform: scale(1.05); filter: saturate(1.02); }
.far-info { display: flex; flex-direction: column; gap: 0.2rem; }
.far-name {
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 400;
  line-height: 1.15;
  color: var(--ink);
  transition: color var(--t-fast);
}
.far-card:hover .far-name { color: var(--brass); }
.far-meta {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
}

@media (max-width: 640px) {
  .explore-map { height: 52svh; min-height: 340px; }
  .explore-scrim {
    background: linear-gradient(
      180deg,
      transparent 0%,
      color-mix(in srgb, var(--paper-2) 55%, transparent) 55%,
      var(--paper-2) 100%
    );
  }
  .explore-overlay { justify-content: flex-end; padding-bottom: 1.75rem; }
  .far-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}
</style>
