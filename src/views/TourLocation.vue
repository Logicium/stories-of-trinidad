<template>
  <div class="tour-location" v-if="location">
    <ImageSlideshow 
      :images="location.images"
      :location-name="location.name"
    />
    
    <AudioPlayer 
      :audio-url="location.audioUrl"
      @toggle-captions="handleCaptionsToggle"
    />
    
    <TranscriptSection 
      :text="location.transcript"
      :auto-expand="captionsEnabled"
    />
    
    <NearbyLocations 
      :locations="nearbyLocations"
      :current-location-name="location.name"
      :current-location="location.coordinates"
    />
  </div>
  
  <div v-else class="loading-state">
    <div class="loading-content">
      <div class="spinner"></div>
      <p>Loading location...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocationsStore } from '@/stores/locations'
import ImageSlideshow from '@/components/ImageSlideshow.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import TranscriptSection from '@/components/TranscriptSection.vue'
import NearbyLocations from '@/components/NearbyLocations.vue'

const route = useRoute()
const locationsStore = useLocationsStore()
const captionsEnabled = ref(false)

const location = computed(() => locationsStore.currentLocation)
const nearbyLocations = computed(() => {
  if (!location.value) return []
  return locationsStore.getNearbyLocations(location.value.id)
})

const handleCaptionsToggle = (enabled: boolean) => {
  captionsEnabled.value = enabled
}

const loadLocation = () => {
  const locationId = route.params.id as string
  if (locationId) {
    locationsStore.setCurrentLocation(locationId)
  }
}

onMounted(() => {
  loadLocation()
})

watch(() => route.params.id, () => {
  loadLocation()
})
</script>

<style scoped>
.tour-location {
  min-height: 100vh;
  background: var(--color-background);
}

.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-sand);
  border-top-color: var(--color-rust);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-lg);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-content p {
  font-family: var(--font-accent);
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}
</style>
