import { derived, readable, writable } from 'svelte/store'
import hotspots from '../modules/hotspots.json'
import { localStorageIsSupported } from '../utilities/data'

const storedData = JSON.parse(localStorage.getItem('data'))

export const rdwData = writable(storedData || [])
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

rdwData.subscribe(val => {
  if (localStorageIsSupported())
    localStorage.setItem('data', JSON.stringify(val))
})
