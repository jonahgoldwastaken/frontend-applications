import { derived, readable } from 'svelte/store'

export const dimension = readable(960)
export const radius = derived(dimension, $dimension => $dimension / 2 - 6)
export const distanceRadius = derived(
  dimension,
  $dimension => $dimension / 2 - 76
)
