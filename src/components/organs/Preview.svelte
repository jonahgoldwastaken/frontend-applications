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
  import Highlight from '../atoms/Highlight.svelte'
  import ParagraphContainer from '../atoms/ParagraphContainer.svelte'
  import { timeFormatter } from '../../utilities/string.js'

  let distances = [0, 1]
  let times = [0, 12]
  let timeType = 'opening'
  let showInvalidOpeningHours = false
  let chosenHotspot
  let preview = true

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
        case 'Dam':
          chosenHotspot = 'Rijksmuseum'
          times = [0, 12]
          distances = [0, 3]
          timeType = 'closing'
          showInvalidOpeningHours = !showInvalidOpeningHours
          break
        default:
          chosenHotspot = 'Dam'
          times = [11, 23]
          distances = [0, 1]
          timeType = 'closing'
          break
      }
    }, 2000)
  })
</script>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 2rem;
    grid-template-rows: 1fr;
    min-height: 100vh;
    height: 100%;
    margin: 0 auto 4rem;
    align-items: start;
  }

  section:last-child {
    margin-bottom: 0px;
  }

  .sub-grid {
    display: grid;
    align-items: stretch;
    grid-template-rows: auto auto;
    grid-gap: 2rem;
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
    <h2>Een korte uitleg</h2>
    <p>
      Deze grafiek laat de openings- en sluitingstijden zien voor
      <Highlight>alle</Highlight>
      parkeerplekken rondom een hotspot in de stad. Elke
      parkeergarage/gelegenheid is een
      <Highlight background="black">zwart</Highlight>
      bolletje als de openingstijden bekend zijn of een
      <Highlight background="darkgrey">donkergrijs</Highlight>
      bolletje als dat niet zo is. De tijden die worden getoond kan je zien aan
      de buitenrand van de grafiek. En aan de label rechts van de grafiek is te
      zien of het gaat om de tijd wanneer een parkeergarage opent of sluit.
    </p>
    <p>
      Je kan met de filters de diagram aanpassen naar eigen smaak. Je kan voor
      openings- of sluitingstijd kiezen, de tijden verplaatsen, de minimum- en
      maximumafstand bepalen en ervoor kiezen om parkeergelegenheden zonder
      openingstijden te laten zien of niet.
    </p>
    <p>
      Wanneer je een filter aanpast, verandert de tekst in het zijbalkje mee,
      zoals
      <Highlight>De totale hoeveelheid parkeerplaatsen: {capacity}</Highlight>
      of
      <Highlight>De minimum afstand: {distances[0]}km</Highlight>
    </p>
  </ParagraphContainer>
  <div class="sub-grid">
    <DataClock
      bind:preview
      {distances}
      {times}
      {timeType}
      {chosenHotspot}
      bind:data />
    <form on:submit|preventDefault>
      <h3>Filters</h3>
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
      <label>Laat parkeergelegenheden zien zonder openingstijden
        <input
          disabled={preview}
          type="checkbox"
          bind:checked={showInvalidOpeningHours} />
      </label>
    </form>
  </div>
</section>
