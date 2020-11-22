import { lineRadial, scaleLinear } from 'd3'
import { derived, readable, writable } from 'svelte/store'
import { chosenHotspot, distances, times, timeType } from './data'

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
export const radiusScale = derived(
  [distances, distanceRadius],
  ([$distances, $distanceRadius]) =>
    scaleLinear().domain($distances).range([100, $distanceRadius])
)
export const radialLine = derived(
  [radiusScale, chosenHotspot, angleScale, timeType],
  ([$radiusScale, $chosenHotspot, $angleScale, $timeType]) =>
    lineRadial()
      .radius(d => $radiusScale(d.distanceToHotspot[$chosenHotspot]))
      .angle(d =>
        $angleScale(
          $timeType === 'opening' ? d.openingHours[0] : d.openingHours[1]
        )
      )
)
export const currentParkingArea = writable({})
export const tooltipVisible = writable(false)
