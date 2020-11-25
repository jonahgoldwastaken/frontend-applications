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
</section>
