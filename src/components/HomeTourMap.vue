<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { loadGoogleMaps, parchmentMapStyles } from '@/utils/maps'
import type { LatLng } from '@/utils/geo'
import type { Location } from '@/stores/locations'

interface Props {
  stops: Location[]          // already ordered (nearest-first)
  userLocation: LatLng | null
  bleed?: boolean            // full-bleed background mode (no frame)
  offsetRight?: boolean      // bias the route into the right half of the map
  highlight?: number         // how many nearest stops form the walking loop
}
const props = withDefaults(defineProps<Props>(), { highlight: 5 })
const router = useRouter()

const mapEl = ref<HTMLElement | null>(null)
const status = ref<'loading' | 'ready' | 'error'>('loading')
const tilesReady = ref(false)
let map: google.maps.Map | null = null
let overlays: Array<google.maps.Marker | google.maps.Polyline> = []
let timers: number[] = []

const clear = () => {
  timers.forEach((t) => window.clearTimeout(t))
  timers = []
  overlays.forEach((o) => o.setMap(null))
  overlays = []
}

// A numbered brass dot, anchored exactly on the stop's coordinate.
const buildDotIcon = (n: number) => {
  const s = 28
  const c = s / 2
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'>` +
    `<circle cx='${c}' cy='${c}' r='9' fill='#211C17' stroke='#B9954F' stroke-width='2'/>` +
    `<text x='${c}' y='${c + 0.5}' fill='#F6F0E4' font-family='Space Grotesk, Arial, sans-serif' font-size='11' font-weight='600' text-anchor='middle' dominant-baseline='central'>${n}</text>` +
    `</svg>`
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    size: new google.maps.Size(s, s),
    anchor: new google.maps.Point(c, c),
  }
}

// Ramp a marker's opacity from 0 → 1 after `delay` ms.
const fadeInMarker = (marker: google.maps.Marker, delay: number) => {
  marker.setOpacity(0)
  const t = window.setTimeout(() => {
    const start = performance.now()
    const dur = 460
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      marker.setOpacity(p)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, delay)
  timers.push(t)
}

// The nearest `highlight` stops form the walking loop; the rest are ambient.
const loopStops = () => props.stops.slice(0, props.highlight)

// Frame to the walking loop (user + nearest stops), not the whole city.
const fitView = () => {
  if (!map) return
  const bounds = new google.maps.LatLngBounds()
  if (props.userLocation) bounds.extend(props.userLocation)
  loopStops().forEach((s) => bounds.extend(s.coordinates))
  if (bounds.isEmpty()) return

  const w = mapEl.value?.clientWidth ?? 0
  const padLeft = props.offsetRight && w > 900 ? Math.round(w * 0.56) : 80

  // Cap the zoom *only during the fit* so the loop opens at a calm overview
  // level, then lift the cap so visitors can zoom in further if they wish.
  map.setOptions({ maxZoom: 16 })
  map.fitBounds(bounds, { top: 130, right: 120, bottom: 130, left: padLeft })
  google.maps.event.addListenerOnce(map, 'idle', () => {
    map?.setOptions({ maxZoom: 21 })
  })
}

const draw = () => {
  if (!map || typeof google === 'undefined') return
  clear()

  const loop = loopStops()
  const path: google.maps.LatLngLiteral[] = []

  // Ambient dots for every other stop — conveys the full reach of the tour.
  props.stops.slice(props.highlight).forEach((stop, i) => {
    const dot = new google.maps.Marker({
      position: stop.coordinates,
      map,
      title: stop.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 4,
        fillColor: '#211C17',
        fillOpacity: 0.45,
        strokeColor: '#F2ECE1',
        strokeWeight: 1,
      },
      zIndex: 10,
    })
    dot.addListener('click', () =>
      router.push({ name: 'location', params: { id: stop.id } }),
    )
    fadeInMarker(dot, 700 + i * 24)
    overlays.push(dot)
  })

  // User location — start of the loop, fades in first.
  if (props.userLocation) {
    path.push(props.userLocation)
    const you = new google.maps.Marker({
      position: props.userLocation,
      map,
      title: 'You are here',
      zIndex: 60,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: '#B5522C',
        fillOpacity: 1,
        strokeColor: '#FBF8F2',
        strokeWeight: 3,
      },
    })
    fadeInMarker(you, 60)
    overlays.push(you)
  }

  // Numbered dots for the nearest stops — these match the key badges.
  loop.forEach((stop, i) => {
    path.push(stop.coordinates)
    const dotIcon = buildDotIcon(i + 1)
    const dot = new google.maps.Marker({
      position: stop.coordinates,
      map,
      title: stop.name,
      icon: { url: dotIcon.url, scaledSize: dotIcon.size, anchor: dotIcon.anchor },
      zIndex: 50 - i,
    })
    dot.addListener('click', () =>
      router.push({ name: 'location', params: { id: stop.id } }),
    )
    fadeInMarker(dot, 220 + i * 150)
    overlays.push(dot)
  })

  // Close the loop back to the start
  if (props.userLocation && loop.length) path.push(props.userLocation)

  // Dotted "walking trail" — revealed after the dots settle.
  if (path.length > 1) {
    const dot: google.maps.Symbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 2.2,
      fillColor: '#9C7A41',
      fillOpacity: 1,
      strokeOpacity: 0,
    }
    const trail = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeOpacity: 0,
      icons: [{ icon: dot, offset: '0', repeat: '14px' }],
      zIndex: 5,
    })
    const t = window.setTimeout(() => trail.setMap(map), 180)
    timers.push(t)
    overlays.push(trail)
  }

  fitView()
}

const init = async () => {
  try {
    await loadGoogleMaps()
    if (!mapEl.value) return
    map = new google.maps.Map(mapEl.value, {
      center: props.stops[0]?.coordinates ?? { lat: 37.1694, lng: -104.5005 },
      zoom: 14,
      styles: parchmentMapStyles,
      disableDefaultUI: true,
      zoomControl: false,
      // Plain scroll passes through to the page; ctrl/⌘ + scroll zooms the map.
      // The cooperative hint banner is hidden via CSS below.
      gestureHandling: 'cooperative',
      keyboardShortcuts: false,
      clickableIcons: false,
      backgroundColor: '#F2ECE1',
    })
    status.value = 'ready'
    google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
      tilesReady.value = true
    })
    draw()
  } catch (e) {
    console.error('[HomeTourMap]', e)
    status.value = 'error'
  }
}

// Re-frame (only) on viewport changes — no marker re-animation.
let resizeTimer: number | undefined
const onResize = () => {
  window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(fitView, 200)
}

onMounted(() => {
  init()
  window.addEventListener('resize', onResize, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  clear()
})
watch(() => [props.userLocation, props.stops], draw, { deep: true })
</script>

<template>
  <div class="tour-map" :class="{ 'tour-map--bleed': bleed }">
    <div ref="mapEl" class="tour-map__canvas" :class="{ 'is-ready': tilesReady }"></div>

    <div v-if="status !== 'ready'" class="tour-map__state" :data-status="status">
      <span v-if="status === 'error'">Map unavailable</span>
      <span v-else>Plotting your route…</span>
    </div>

  </div>
</template>

<style scoped>
.tour-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 360px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #f2ece1;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-lg);
}
.tour-map--bleed {
  border-radius: 0;
  border: 0;
  box-shadow: none;
  min-height: 0;
}
.tour-map__canvas {
  position: absolute;
  inset: 0;
  opacity: 0;
  filter: blur(16px);
  transform: scale(1.04);
  transition: opacity 1000ms var(--ease-out), filter 1100ms var(--ease-out),
    transform 1200ms var(--ease-out);
}
.tour-map__canvas.is-ready {
  opacity: 1;
  filter: blur(0);
  transform: none;
}

.tour-map__state {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: #f2ece1;
  color: var(--ink-3);
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}
.tour-map__state[data-status='error'] { color: var(--ember); }

/* Hide Google's "use ctrl + scroll to zoom" cooperative-gesture banner */
.tour-map :deep(.gm-style-pbc),
.tour-map :deep(.gm-style-moc) {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

</style>
