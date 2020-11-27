<script>
  import { onMount, afterUpdate } from 'svelte'
  import { always, filter, pipe, unless } from 'ramda'
  import { rdwData, hotspotData } from '../../store/data'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import Highlight from '../atoms/Highlight.svelte'
  import DataClock from '../molecules/DataClock.svelte'
  import ParagraphContainer from '../atoms/ParagraphContainer.svelte'
  import { timeFormatter } from '../../utilities/string.js'

  export let distances = [0, 1]
  export let times = [0, 12]
  export let timeType = 'opening'
  export let showInvalidOpeningHours = false
  export let chosenHotspot = 'Dam'

  $: data = pipe(
    filter(filterOnDistanceToHotspot(distances, chosenHotspot)),
    filter(filterOnOpeningHours(times, timeType)),
    unless(always(showInvalidOpeningHours), filter(filterDataWithValidHours))
  )($rdwData)
  $: amountWithOpeningHours = data.reduce(
    (acc, curr) => (curr.openingHours[0] != undefined ? acc + 1 : acc),
    0
  )
  $: capacity = data.reduce((acc, curr) => acc + curr.capacity, 0)
  $: amountCapacitySources = data.reduce(
    (acc, curr) => (curr.capacity > 0 ? acc + 1 : acc),
    0
  )
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
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 2rem;
    grid-template-rows: 1fr;
    min-height: 100vh;
    height: 100%;
    margin: 0 auto 4rem;
    align-items: start;
  }

  form {
    padding: 1em;
    background: white;
    border: 3px solid black;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
  }

  form div,
  form label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  form div:not(:last-child),
  form label:not(:last-child) {
    margin-bottom: 1em;
  }

  form p {
    margin: 0;
  }

  form div button,
  form label input,
  form label select {
    margin-left: 1rem;
  }
</style>

<section>
  <DataClock {distances} {times} {timeType} {chosenHotspot} bind:data />
  <form on:submit|preventDefault>
    <h2>Playground</h2>
    <h3>Filters</h3>
    <label>Hotspot
      <select bind:value={chosenHotspot}>
        {#each $hotspotData as hotspot (hotspot.name)}
          <option value={hotspot.name}>{hotspot.name}</option>
        {/each}
      </select>
    </label>
    <label>Openings- of sluitingstijd?
      <select bind:value={timeType}>
        <option value="opening">Openingstijd</option>
        <option value="closing">Sluitingstijd</option>
      </select>
    </label>
    <div>
      <p id="time-label">
        {timeType === 'opening' ? 'Openingstijden' : 'Sluitingstijden'}
        van
        {timeFormatter(times[0], true)}
        tot
        {timeFormatter(times[1], true)}
      </p>
      <button
        aria-labelledby="time-label"
        type="button"
        on:click={() => {
          times = times[0] === 0 ? times : [times[0] - 1, times[1] - 1]
        }}>
        Eerder
      </button>
      <button
        aria-labelledby="time-label"
        type="button"
        on:click={() => {
          times = times[1] === 24 ? times : [times[0] + 1, times[1] + 1]
        }}>
        Later
      </button>
    </div>
    <label>Minimum afstand<input
        type="number"
        min="0"
        max="9"
        step="1"
        bind:value={distances[0]}
        on:input={e => {
          if (e.currentTarget.value == 10) {
            distances[0] = 9
          } else if (e.currentTarget.value >= distances[1]) {
            distances[1] = distances[0] + 1
          }
        }} /></label>
    <label>Maximum afstand<input
        type="number"
        min="1"
        max="10"
        step="1"
        bind:value={distances[1]}
        on:input={e => {
          if (e.currentTarget.value == 0) {
            distances[1] = 1
          } else if (e.currentTarget.value <= distances[0]) {
            distances[0] = distances[1] - 1
          }
        }} /></label>
    <label>Laat parkeergelegenheden zien zonder openingstijden
      <input type="checkbox" bind:checked={showInvalidOpeningHours} />
    </label>
  </form>
</section>
