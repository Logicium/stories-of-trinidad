import { ref } from 'vue'
import type { LatLng } from '@/utils/geo'

export type GeoStatus = 'idle' | 'prompting' | 'granted' | 'denied' | 'unavailable'

export function useGeolocation() {
  const coords = ref<LatLng | null>(null)
  const status = ref<GeoStatus>('idle')

  function request() {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      status.value = 'unavailable'
      return
    }
    status.value = 'prompting'
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        coords.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        status.value = 'granted'
      },
      () => {
        status.value = 'denied'
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  return { coords, status, request }
}
