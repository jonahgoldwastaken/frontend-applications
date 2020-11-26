<script>
  import { onMount } from 'svelte'
  import { always, filter, pipe, unless } from 'ramda'
  import { rdwData } from '../../store/data'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import DataClock from '../molecules/DataClock.svelte'
  import ParagraphContainer from '../molecules/ParagraphContainer.svelte'

  export let distances = [0, 1]
  export let times = [0, 12]
  export let timeType = 'opening'
  export let showInvalidOpeningHours = true
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

  onMount(() => {
    console.log(data.length, capacity, averageOpeningTime, averageClosingTime)
  })
</script>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 2rem;
    height: 100vh;
    align-items: center;
    margin: 0 auto 2rem;
  }
  div {
    display: block;
  }
</style>

<section>
  <ParagraphContainer>
    <slot />
  </ParagraphContainer>
  <div>
    <DataClock {distances} {times} {timeType} {chosenHotspot} bind:data />
  </div>
</section>
