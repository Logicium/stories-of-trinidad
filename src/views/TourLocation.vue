<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocationsStore } from '@/stores/locations'
import ImageSlideshow from '@/components/ImageSlideshow.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import TranscriptSection from '@/components/TranscriptSection.vue'
import NearbyLocations from '@/components/NearbyLocations.vue'
import { MapPin, Clock } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const locationsStore = useLocationsStore()
const captionsEnabled = ref(false)

const location = computed(() => locationsStore.currentLocation)
const nearbyLocations = computed(() => {
  if (!location.value) return []
  return locationsStore.getNearbyLocations(location.value.id)
})

const stopIndex = computed(() => {
  if (!location.value) return 0
  return locationsStore.locations.findIndex(l => l.id === location.value!.id) + 1
})
const stopTotal = computed(() => locationsStore.locations.length)
const pad = (n: number) => String(n).padStart(2, '0')

const handleCaptionsToggle = (enabled: boolean) => {
  captionsEnabled.value = enabled
}

const loadLocation = () => {
  const locationId = parseInt(route.params.id as string)
  if (!isNaN(locationId)) {
    locationsStore.setCurrentLocation(locationId)
  }
}

onMounted(loadLocation)
watch(() => route.params.id, () => {
  loadLocation()
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="tour" v-if="location">
    <!-- Immersive hero -->
    <ImageSlideshow
      :images="location.images"
      :location-name="location.name"
      :address="location.description"
      :era="location.era"
      :stop-label="`Stop ${pad(stopIndex)} / ${pad(stopTotal)}`"
    />

    <!-- Reading column -->
    <article class="story">
      <div class="story-inner">
        <div class="placard" v-reveal>
          <span class="numeral placard-num">{{ pad(stopIndex) }}</span>
          <div class="placard-meta">
            <span v-if="location.style" class="chip">{{ location.style }}</span>
            <span v-if="location.era" class="chip chip--ghost">
              <Clock :size="13" :stroke-width="1.8" /> {{ location.era }}
            </span>
            <span class="chip chip--ghost">
              <MapPin :size="13" :stroke-width="1.8" /> {{ location.description }}
            </span>
          </div>
        </div>

        <TranscriptSection
          :text="location.transcript"
          :auto-expand="captionsEnabled"
        />
      </div>
    </article>

    <NearbyLocations
      :locations="nearbyLocations"
      :current-location-name="location.name"
      :current-location="location.coordinates"
    />

    <!-- Sticky audio dock -->
    <AudioPlayer
      :audio-url="location.audioUrl"
      :title="location.name"
      :subtitle="`Stop ${pad(stopIndex)} of ${pad(stopTotal)} · ${location.duration || 'Audio tour'}`"
      @toggle-captions="handleCaptionsToggle"
    />
  </div>

  <div v-else class="loading-state">
    <div class="spinner"></div>
    <p class="eyebrow">Loading stop…</p>
  </div>
</template>

<style scoped>
.tour {
  min-height: 100vh;
  background: var(--paper);
  padding-bottom: 7.5rem; /* room for the sticky audio dock */
}

.story {
  background: var(--paper);
  padding: var(--sp-8) 0 var(--sp-6);
}
.story-inner {
  max-width: var(--measure);
  margin: 0 auto;
  padding-inline: clamp(1.25rem, 5vw, 2rem);
}

.placard {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding-bottom: var(--sp-5);
  margin-bottom: var(--sp-5);
  border-bottom: 1px solid var(--line);
}
.placard-num {
  font-size: clamp(2.75rem, 8vw, 4rem);
  line-height: 0.85;
  flex-shrink: 0;
}
.placard-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding-top: 0.4rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  padding: 0.5em 0.9em;
  border-radius: 100px;
}
.chip--ghost {
  color: var(--ink-2);
  background: transparent;
  border: 1px solid var(--line-2);
}

/* Loading */
.loading-state {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  background: var(--paper);
}
.spinner {
  width: 38px; height: 38px;
  border: 1.5px solid var(--line-2);
  border-top-color: var(--brass);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
