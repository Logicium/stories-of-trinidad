// Shared Google Maps loader + the house "parchment" map style.
// One script load is shared across every map on the site.

let mapsPromise: Promise<void> | null = null

export function loadGoogleMaps(): Promise<void> {
  if (typeof google !== 'undefined' && google.maps) return Promise.resolve()
  if (mapsPromise) return mapsPromise

  mapsPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      reject(new Error('Missing VITE_GOOGLE_MAPS_API_KEY'))
      return
    }
    const existing = document.querySelector<HTMLScriptElement>('script[data-google-maps]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps')), {
        once: true,
      })
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true
    script.dataset.googleMaps = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Maps'))
    document.head.appendChild(script)
  })
  return mapsPromise
}

// Parchment / clay / charcoal — tuned to the Stories of Trinidad palette.
// Deliberately quiet: all labels are suppressed except the main thoroughfares
// (arterial + highway street names), for a sleek, uncluttered plate.
export const parchmentMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#F2ECE1' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#F2ECE1' }, { weight: 3 }] },

  // Hide all the area / point clutter
  { featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#CDBA94' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },

  // Land
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#F2ECE1' }] },
  { featureType: 'landscape', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#ECE3D1' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#CDD3BC' }] },

  // Roads — geometry kept, labels off by default…
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#FBF8F2' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#DDCFB1' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },

  // …then re-enabled only for the main streets.
  { featureType: 'road.arterial', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
  { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#857A68' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#E7D6B6' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#C9B58E' }] },
  { featureType: 'road.highway', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#766A55' }] },

  // Water
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#BFC8C7' }] },
  { featureType: 'water', elementType: 'labels', stylers: [{ visibility: 'off' }] },
]
