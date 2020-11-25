import { always, filter, pipe, unless } from 'ramda'
import { derived, readable, writable } from 'svelte/store'
import { parseRDWData } from '../modules/data'
import hotspots from '../modules/hotspots.json'
import {
  filterDataWithValidHours,
  filterOnDistanceToHotspot,
  filterOnOpeningHours,
} from '../utilities/clock'
import { retrieveLocalData, storeData } from '../utilities/data'

export const hotspotData = readable(hotspots)
export const chosenHotspot = writable('De Dam')
export const currentHotspot = derived(
  [hotspotData, chosenHotspot],
  ([$hotspotData, $chosenHotspot]) =>
    $hotspotData.find(item => item.name === $chosenHotspot)
)

export const times = writable([0, 12])
export const distances = writable([0, 1])
export const timeType = writable('opening')
export const showInvalidOpeningHours = writable(true)

const pageLoadedAmount = () => {
  const storedAmount = localStorage.getItem('loadAmt')
  if (+storedAmount > 9) {
    localStorage.setItem('loadAmt', 0)
    return 0
  }
  localStorage.setItem('loadAmt', +storedAmount + 1)
  return +storedAmount + 1
}

const rdwData = readable([], set => {
  if (pageLoadedAmount() === 0) {
    parseRDWData().then(set).catch(console.trace)
  } else {
    const storedData = retrieveLocalData()
    if (!storedData) parseRDWData().then(set).catch(console.trace)
    else set(storedData)
  }
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

rdwData.subscribe(storeData)
