import { always, filter, pipe, unless } from 'ramda'
import { derived, readable, writable } from 'svelte/store'
import { parseRDWData } from '../modules/data'
import hotspots from '../modules/hotspots.json'
import {
  filterDataWithValidHours,
  filterOnDistanceToHotspot,
  filterOnOpeningHours,
} from '../utilities/clock'
import { localStorageIsSupported } from '../utilities/data'

export const hotspotData = readable(hotspots)
export const chosenHotspot = writable('Melkweg')
export const currentHotspot = derived(
  [hotspotData, chosenHotspot],
  ([$hotspotData, $chosenHotspot]) =>
    $hotspotData.find(item => item.name === $chosenHotspot)
)

export const times = writable([0, 12])
export const distances = writable([0, 5])
export const timeType = writable('opening')
export const showInvalidOpeningHours = writable(true)

export const rdwData = readable([], set => {
  const storedData = JSON.parse(localStorage.getItem('data'))
  if (!storedData) parseRDWData().then(set).catch(console.trace)
  else set(storedData)
  return () => console.log('dag tientjes, en tientinnetjes!')
})

export const filteredData = derived(
  [distances, chosenHotspot, times, timeType, showInvalidOpeningHours, rdwData],
  ([
    $distances,
    $chosenHotspot,
    $times,
    $timeType,
    $showInvalidOpeningHours,
    $rdwData,
  ]) =>
    pipe(
      filter(filterOnDistanceToHotspot($distances, $chosenHotspot)),
      filter(filterOnOpeningHours($times, $timeType)),
      unless(always($showInvalidOpeningHours), filter(filterDataWithValidHours))
    )($rdwData),
  []
)

rdwData.subscribe(val => {
  if (localStorageIsSupported())
    localStorage.setItem('data', JSON.stringify(val))
})
