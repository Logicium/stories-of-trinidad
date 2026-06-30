<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowUpRight, Navigation } from 'lucide-vue-next'
import { loadGoogleMaps, parchmentMapStyles } from '@/utils/maps'
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
const mapElement = ref<HTMLElement | null>(null)
let map: google.maps.Map | null = null
const markers: google.maps.Marker[] = []

const sortedLocations = computed(() =>
  [...props.locations].sort((a, b) => a.distance - b.distance),
)

const initMap = async () => {
  if (!mapElement.value || !props.currentLocation) return
  try {
    await loadGoogleMaps()
    map = new google.maps.Map(mapElement.value, {
      center: props.currentLocation,
      zoom: 15,
      styles: parchmentMapStyles,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
      disableDefaultUI: true,
      backgroundColor: '#F2ECE1',
    })

    new google.maps.Marker({
      position: props.currentLocation,
      map,
      title: props.currentLocationName,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: '#B5522C',
        fillOpacity: 1,
        strokeColor: '#FBF8F2',
        strokeWeight: 3,
      },
      zIndex: 10,
    })

    sortedLocations.value.forEach((location) => {
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#211C17',
          fillOpacity: 0.92,
          strokeColor: '#FBF8F2',
          strokeWeight: 2.5,
        },
      })
      marker.addListener('click', () => navigateToLocation(location.id))
      markers.push(marker)
    })

    if (sortedLocations.value.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      bounds.extend(props.currentLocation)
      sortedLocations.value.forEach((loc) => bounds.extend(loc.coordinates))
      map.fitBounds(bounds, 80)
    }
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    if (mapElement.value) {
      mapElement.value.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:#f2ece1;color:#4A4138;padding:2rem;text-align:center;font-family:'Space Grotesk',sans-serif;">
          <p style="font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;color:#897e6f;margin-bottom:.5rem;">${props.currentLocationName}</p>
          <p style="font-size:.85rem;color:#897e6f;">Map temporarily unavailable</p>
        </div>`
    }
  }
}

const formatDistance = (distance: number): string => {
  if (distance < 1) return `${Math.round(distance * 1000)} m`
  return `${distance.toFixed(1)} km`
}

const navigateToLocation = (locationId: number) => {
  router.push({ name: 'location', params: { id: locationId } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(initMap)
watch(
  () => props.currentLocation,
  () => {
    markers.forEach((m) => m.setMap(null))
    markers.length = 0
    initMap()
  },
)
</script>

<template>
  <section class="nearby">
    <div class="container">
      <div class="nearby-head" v-reveal>
        <span class="eyebrow eyebrow--brass">Keep walking</span>
        <h2 class="nearby-title">Nearby Stops</h2>
      </div>

      <div class="nearby-grid">
        <!-- Map -->
        <div class="map-wrap" v-reveal>
          <div ref="mapElement" class="map"></div>
          <div class="map-legend">
            <span class="lg lg--here"><i></i> You are here</span>
            <span class="lg lg--other"><i></i> Other stops</span>
          </div>
        </div>

        <!-- List -->
        <div class="list">
          <button
            v-for="(location, i) in sortedLocations"
            :key="location.id"
            class="row"
            v-reveal="i * 70"
            @click="navigateToLocation(location.id)"
          >
            <div class="row-thumb">
              <img
                :src="location.images[0]?.url || ''"
                :alt="location.images[0]?.alt || location.name"
                loading="lazy"
              />
            </div>
            <div class="row-body">
              <span class="row-name">{{ location.name }}</span>
              <span class="row-meta">
                <Navigation :size="12" :stroke-width="2" />
                {{ formatDistance(location.distance) }} away
                <span v-if="location.era"> · {{ location.era }}</span>
              </span>
            </div>
            <ArrowUpRight class="row-go" :size="20" :stroke-width="1.6" />
          </button>

          <div v-if="sortedLocations.length === 0" class="empty">
            <p>You’ve reached the edge of the tour.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nearby {
  background: var(--paper-2);
  padding: var(--sp-8) 0;
  border-top: 1px solid var(--line);
}

.nearby-head { margin-bottom: var(--sp-6); }
.nearby-head .eyebrow { display: block; margin-bottom: 0.75rem; }
.nearby-title {
  font-size: var(--fs-display);
  font-style: italic;
  font-weight: 300;
}

.nearby-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: start;
}

/* Map */
.map-wrap {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--line);
}
.map {
  width: 100%;
  height: 460px;
  background: #f2ece1;
}
.map-legend {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: flex;
  gap: 1rem;
  padding: 0.6rem 0.9rem;
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  backdrop-filter: blur(8px);
  border: 1px solid var(--line);
  border-radius: 100px;
}
.lg {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-2);
  font-weight: 500;
}
.lg i { width: 9px; height: 9px; border-radius: 50%; }
.lg--here i { background: var(--ember); }
.lg--other i { background: var(--ink); }

/* List */
.list {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  text-align: left;
  padding: 1.1rem 0.25rem;
  border-bottom: 1px solid var(--line);
  transition: padding var(--t-fast);
}
.row:first-child { border-top: 1px solid var(--line); }
.row:hover { padding-left: 0.75rem; }

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

.row-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
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
.row-go {
  flex-shrink: 0;
  color: var(--ink-3);
  transition: color var(--t-fast), transform var(--t);
}
.row:hover .row-go { color: var(--brass); transform: translate(3px, -3px); }

.empty {
  padding: 2.5rem 0;
  text-align: center;
}
.empty p {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--ink-3);
}

@media (max-width: 860px) {
  .nearby-grid { grid-template-columns: 1fr; }
  .map { height: 340px; }
}
</style>
