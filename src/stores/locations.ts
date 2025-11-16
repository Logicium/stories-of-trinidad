import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { locationsData, type LocationData, type LocationImage } from '@/data/locations'

export type { LocationImage, LocationData as Location }

export const useLocationsStore = defineStore('locations', () => {
  const locations = ref<LocationData[]>(locationsData)
  const currentLocation = ref<LocationData | null>(null)

  function setCurrentLocation(locationId: number) {
    currentLocation.value = locations.value.find(loc => loc.id === locationId) || null
  }

  function getNearbyLocations(locationId: number, maxDistance: number = 10) {
    const current = locations.value.find(loc => loc.id === locationId)
    if (!current) return []

    // Calculate distance using Haversine formula
    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
      const R = 6371 // Earth's radius in km
      const dLat = toRad(lat2 - lat1)
      const dLng = toRad(lng2 - lng1)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    }

    const toRad = (degrees: number) => degrees * (Math.PI / 180)

    return locations.value
      .filter(loc => loc.id !== locationId)
      .map(loc => ({
        ...loc,
        distance: calculateDistance(
          current.coordinates.lat,
          current.coordinates.lng,
          loc.coordinates.lat,
          loc.coordinates.lng
        )
      }))
      .filter(loc => loc.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
  }

  return {
    locations,
    currentLocation,
    setCurrentLocation,
    getNearbyLocations
  }
})
