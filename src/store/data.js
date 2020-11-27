import { readable } from 'svelte/store'
import { parseRDWData } from '../modules/data'
import hotspots from '../modules/hotspots.json'
import { retrieveLocalData, storeData } from '../utilities/data'

export const hotspotData = readable(hotspots)

const pageLoadedAmount = () => {
  const storedAmount = localStorage.getItem('loadAmt')
  if (+storedAmount > 9) {
    localStorage.setItem('loadAmt', 0)
    return 0
  }
  localStorage.setItem('loadAmt', +storedAmount + 1)
  return +storedAmount + 1
}

export const rdwData = readable(new Promise(() => {}), set => {
  if (pageLoadedAmount() === 0) {
    parseRDWData()
      .then(data => {
        storeData(data)
        set(data)
      })
      .catch(console.trace)
  } else {
  const storedData = retrieveLocalData()
  if (!storedData)
    parseRDWData()
      .then(data => {
        storeData(data)
        set(data)
      })
      .catch(console.trace)
  else set(storedData)
  // }
})
