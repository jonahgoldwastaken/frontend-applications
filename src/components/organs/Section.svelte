<script>
  import { onMount, afterUpdate } from 'svelte'
  import { always, filter, pipe, unless } from 'ramda'
  import { rdwData } from '../../store/data'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import DataClock from '../molecules/DataClock.svelte'
  import H3 from '../atoms/H3.svelte'
  import ParagraphContainer from '../molecules/ParagraphContainer.svelte'
  import { timeFormatter } from '../../utilities/string.js'

  export let distances = [0, 1]
  export let times = [0, 12]
  export let timeType = 'opening'
  export let showInvalidOpeningHours = false
  export let chosenHotspot
  let preview = false

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
    console.log(
      data,
      data.length,
      capacity,
      averageOpeningTime,
      averageClosingTime
    )
    if (!chosenHotspot) {
      preview = true
      chosenHotspot = 'Olympisch Stadion'
      setInterval(() => {
        switch (chosenHotspot) {
          case 'Concertgebouw':
            chosenHotspot = 'Olympisch stadion'
            times = [9, 21]
            distances = [0, 5]
            timeType = 'closing'
            showInvalidOpeningHours = !showInvalidOpeningHours
            break
          case 'Melkweg':
            chosenHotspot = 'Concertgebouw'
            times = [3, 15]
            distances = [2, 4]
            timeType = 'opening'
            break
          case 'RAI':
            chosenHotspot = 'Melkweg'
            times = [7, 19]
            distances = [30, 35]
            timeType = 'opening'
            break
          case 'NEMO':
            chosenHotspot = 'RAI'
            times = [2, 14]
            distances = [0, 2]
            timeType = 'closing'
            showInvalidOpeningHours = !showInvalidOpeningHours
            break
          case 'Rijksmuseum':
            chosenHotspot = 'NEMO'
            times = [7, 19]
            distances = [5, 7]
            timeType = 'opening'
            break
          case 'De Dam':
            chosenHotspot = 'Rijksmuseum'
            times = [0, 12]
            distances = [0, 3]
            timeType = 'closing'
            showInvalidOpeningHours = !showInvalidOpeningHours
            break
          default:
            chosenHotspot = 'De Dam'
            times = [11, 23]
            distances = [0, 1]
            timeType = 'closing'
            break
        }
      }, 2000)
    }
  })
</script>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 2rem;
    grid-template-rows: 100vh;
    min-height: 100vh;
    height: min-content;
    align-items: stretch;
    margin: 0 auto 4rem;
  }

  section:last-child {
    margin-bottom: 0;
  }

  section > div {
    display: block;
  }

  form {
    margin-top: 2rem;
    padding: 1em;
    background: white;
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
  }

  form div,
  form label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
  <ParagraphContainer>
    <slot />
  </ParagraphContainer>
  <div>
    <DataClock
      bind:preview
      {distances}
      {times}
      {timeType}
      {chosenHotspot}
      bind:data />
    <form on:submit|preventDefault>
      <H3>Filters</H3>
      <label>Openings- of sluitingstijd?
        <select disabled={preview} bind:value={timeType}>
          <option value="opening">Openingstijd</option>
          <option value="closing">Sluitingstijd</option>
        </select>
      </label>
      <div>
        <p id="time-label">
          {timeType === 'opening' ? 'Openingstijden' : 'Sluitingstijden'}
          van
          {timeFormatter(times[0])}
          tot
          {timeFormatter(times[1])}
        </p>
        <button
          aria-labelledby="time-label"
          type="button"
          disabled={preview}
          on:click={() => {
            times = times[0] === 0 ? times : [times[0] - 1, times[1] - 1]
          }}>
          Eerder
        </button>
        <button
          aria-labelledby="time-label"
          type="button"
          disabled={preview}
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
          disabled={preview}
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
          disabled={preview}
          bind:value={distances[1]}
          on:input={e => {
            if (e.currentTarget.value == 0) {
              distances[1] = 1
            } else if (e.currentTarget.value <= distances[0]) {
              distances[0] = distances[1] - 1
            }
          }} /></label>
      <label>Laat parkeer-gelegenheden zien zonder openingstijden
        <input
          disabled={preview}
          type="checkbox"
          bind:checked={showInvalidOpeningHours} />
      </label>
    </form>
  </div>
</section>
