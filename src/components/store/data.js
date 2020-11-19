import { always, pipe, filter, unless } from 'ramda'
import { derived, readable, writable } from 'svelte/store'
import hotspots from '../../modules/hotspots.json'
import {
  filterDataWithValidHours,
  filterOnDistanceToHotspot,
  filterOnOpeningHours,
} from '../../utilities/clock'
import { distances, showInvalidOpeningHours, times, timeType } from './clock'

const storedData = JSON.parse(localStorage.getItem('data'))

export const rdwData = writable(storedData || [])
export const hotspotData = readable(hotspots)
export const chosenHotspot = writable('Melkweg')
export const currentHotspot = derived(
  [hotspotData, chosenHotspot],
  ([$hotspotData, $chosenHotspot]) =>
    $hotspotData.find(item => item.name === $chosenHotspot)
)
export const filteredData = derived(
  [
    rdwData,
    distances,
    times,
    timeType,
    showInvalidOpeningHours,
    currentHotspot,
  ],
  ([
    $rdwData,
    $distances,
    $times,
    $timeType,
    $showInvalidOpeningHours,
    $currentHotspot,
  ]) =>
    pipe(
      filter(filterOnDistanceToHotspot($distances, $currentHotspot.name)),
      filter(filterOnOpeningHours($times, $timeType)),
      unless(always($showInvalidOpeningHours), filter(filterDataWithValidHours))
    )($rdwData)
)

rdwData.subscribe(val => {
  localStorage.setItem('data', JSON.stringify(val))
})
