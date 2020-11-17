import { scaleLinear } from 'd3'
import { writable, derived, readable } from 'svelte/store'

export const times = writable([0, 12])
export const distances = writable([0, 5])
export const dimension = readable(960)
export const radius = derived(dimension, $dimension => $dimension / 2 - 30)
export const distanceRadius = derived(
  dimension,
  $dimension => $dimension / 2 - 91.2
)
export const angleScale = derived(times, $times =>
  scaleLinear()
    .domain($times)
    .range([0, 2 * Math.PI])
)
export const radiusScale = derived(distances, $distances =>
  scaleLinear().domain($distances).range([100, distanceRadius])
)
