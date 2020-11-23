import { derived, readable, writable } from 'svelte/store'

export const dimension = readable(960)
export const radius = derived(dimension, $dimension => $dimension / 2 - 30)
export const distanceRadius = derived(
  dimension,
  $dimension => $dimension / 2 - 100
)
export const currentParkingArea = writable({})
export const tooltipVisible = writable(false)
