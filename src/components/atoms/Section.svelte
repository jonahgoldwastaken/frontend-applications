<script>
  import { always, filter, pipe, unless } from 'ramda'
  import { rdwData } from '../../store/data'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import DataClock from '../molecules/DataClock.svelte'

  export let distances = [0, 1]
  export let times = [0, 12]
  export let timeType = 'opening'
  export let showInvalidOpeningHours = false
  export let chosenHotspot = 'De Dam'

  $: data = pipe(
    filter(filterOnDistanceToHotspot(distances, chosenHotspot)),
    filter(filterOnOpeningHours(times, timeType)),
    unless(always(showInvalidOpeningHours), filter(filterDataWithValidHours))
  )($rdwData)
  $: capacity = data.reduce((acc, curr) => acc + curr.capacity, 0)
  $: averageOpeningTime = data.reduce(
    (acc, curr) =>
      curr.openingHours[0] != undefined
        ? acc + curr.openingHours[0] / data.length
        : acc,
    0
  )
  $: averageClosingTime = data.reduce(
    (acc, curr) =>
      curr.openingHours[1] != undefined
        ? acc + curr.openingHours[1] / data.length
        : acc,
    0
  )
</script>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>

<section>
  <slot />
  <DataClock {distances} {times} {timeType} {chosenHotspot} bind:data />
  <p>
    Data:
    {data.length},
    {capacity},
    {averageOpeningTime},
    {averageClosingTime}
  </p>
</section>
