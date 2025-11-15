<template>
  <div class="nearby-section">
    <div class="nearby-container">
      <h2 class="section-title">Nearby Locations</h2>
      
      <!-- Google Map -->
      <div class="map-container">
        <div ref="mapElement" class="google-map"></div>
      </div>
      
      <!-- List of nearby locations -->
      <div class="locations-list">
        <div 
          v-for="location in sortedLocations"
          :key="location.id"
          class="location-card"
          @click="navigateToLocation(location.id)"
        >
          <div class="location-image">
            <img 
              :src="location.images[0].url" 
              :alt="location.images[0].alt"
            />
          </div>
          
          <div class="location-info">
            <h3 class="location-name">{{ location.name }}</h3>
            <p class="location-description">{{ location.description }}</p>
            <div class="location-meta">
              <span class="distance">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {{ formatDistance(location.distance) }}
              </span>
            </div>
          </div>
          
          <div class="location-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
        
        <div v-if="sortedLocations.length === 0" class="empty-state">
          <p>No other locations nearby</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
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

const sortedLocations = computed(() => {
  return [...props.locations].sort((a, b) => a.distance - b.distance)
})

const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof google !== 'undefined' && google.maps) {
      resolve()
      return
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      reject(new Error('Google Maps API key not found. Please restart your dev server.'))
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Maps script'))
    document.head.appendChild(script)
  })
}

const initMap = async () => {
  if (!mapElement.value || !props.currentLocation) return

  try {
    await loadGoogleMapsScript()

    // Create map centered on current location
    map = new google.maps.Map(mapElement.value, {
      center: props.currentLocation,
      zoom: 15,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    })

    // Add marker for current location (larger, terracotta)
    new google.maps.Marker({
      position: props.currentLocation,
      map: map,
      title: props.currentLocationName,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#C97D60',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 3,
      },
    })

    // Add markers for nearby locations (smaller, rust)
    sortedLocations.value.forEach((location) => {
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#9B4F3E',
          fillOpacity: 0.8,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
      })

      marker.addListener('click', () => {
        navigateToLocation(location.id)
      })

      markers.push(marker)
    })

    // Fit bounds to show all markers
    if (sortedLocations.value.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      bounds.extend(props.currentLocation)
      sortedLocations.value.forEach((loc) => {
        bounds.extend(loc.coordinates)
      })
      map.fitBounds(bounds)
    }
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    // Show fallback message
    if (mapElement.value) {
      mapElement.value.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #E8D5B7 0%, #D4A574 100%); color: #4A3428; padding: 2rem; text-align: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem; opacity: 0.7;">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: 600;">${props.currentLocationName}</p>
          <p style="font-size: 0.9rem; opacity: 0.7;">Map temporarily unavailable</p>
        </div>
      `
    }
  }
}

const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`
  }
  return `${distance.toFixed(1)}km away`
}

const navigateToLocation = (locationId: string) => {
  router.push({ name: 'location', params: { id: locationId } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  initMap()
})

watch(() => props.currentLocation, () => {
  // Clear existing markers
  markers.forEach(marker => marker.setMap(null))
  markers.length = 0
  // Reinitialize map
  initMap()
})
</script>

<style scoped>
.nearby-section {
  width: 100%;
  background: var(--color-surface);
  padding: var(--spacing-2xl) 0;
}

.nearby-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.section-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-deep-brown);
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.map-container {
  margin-bottom: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.google-map {
  width: 100%;
  height: 400px;
}

.locations-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.location-card {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.location-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-clay);
}

.location-card:active {
  transform: translateY(0);
}

.location-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-sand);
}

.location-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-info {
  flex: 1;
  min-width: 0;
}

.location-name {
  font-family: var(--font-accent);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-deep-brown);
  margin-bottom: var(--spacing-xs);
}

.location-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.location-meta {
  display: flex;
  gap: var(--spacing-md);
}

.distance {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.85rem;
  color: var(--color-rust);
  font-weight: 600;
}

.distance svg {
  flex-shrink: 0;
}

.location-arrow {
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-secondary);
}

.empty-state p {
  font-family: var(--font-accent);
  font-size: 1.1rem;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .nearby-section {
    padding: var(--spacing-xl) 0;
  }
  
  .nearby-container {
    padding: 0 var(--spacing-md);
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .location-card {
    gap: var(--spacing-sm);
  }
  
  .location-image {
    width: 80px;
    height: 80px;
  }
  
  .location-name {
    font-size: 1.1rem;
  }
  
  .location-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .location-image {
    width: 70px;
    height: 70px;
  }
  
  .location-name {
    font-size: 1rem;
  }
}
</style>
