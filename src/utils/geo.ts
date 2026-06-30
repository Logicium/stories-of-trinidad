export interface LatLng {
  lat: number
  lng: number
}

/** Great-circle distance in kilometres. */
export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s))
}

/**
 * Greedy nearest-neighbour ordering of stops starting from `start`.
 * Produces a sensible walking sequence beginning at the closest stop.
 */
export function orderByNearest<T extends { coordinates: LatLng }>(
  start: LatLng,
  stops: T[],
): T[] {
  const remaining = [...stops]
  const ordered: T[] = []
  let cursor: LatLng = start

  while (remaining.length) {
    let bestIndex = 0
    let bestDist = Infinity
    remaining.forEach((stop, i) => {
      const d = haversineKm(cursor, stop.coordinates)
      if (d < bestDist) {
        bestDist = d
        bestIndex = i
      }
    })
    const next = remaining.splice(bestIndex, 1)[0]!
    ordered.push(next)
    cursor = next.coordinates
  }
  return ordered
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}
