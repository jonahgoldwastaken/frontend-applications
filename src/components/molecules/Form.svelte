<script>
  import { timeFormatter } from '../../utilities/string'
  import { hotspotData } from '../../store/data'

  export let timeType
  export let distances
  export let times
  export let showInvalidOpeningHours
  export let chosenHotspot
  export let disabled = false
</script>

<style>
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

<form on:submit|preventDefault>
  <h3>Filters</h3>
  {#if chosenHotspot}
    <label>Hotspot
      <select {disabled} bind:value={chosenHotspot}>
        {#each $hotspotData as hotspot (hotspot.name)}
          <option value={hotspot.name}>{hotspot.name}</option>
        {/each}
      </select>
    </label>
  {/if}
  <label>Openings- of sluitingstijd?
    <select {disabled} bind:value={timeType}>
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
      {disabled}
      on:click={() => {
        times = times[0] === 0 ? times : [times[0] - 1, times[1] - 1]
      }}>
      Eerder
    </button>
    <button
      aria-labelledby="time-label"
      type="button"
      {disabled}
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
      {disabled}
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
      {disabled}
      bind:value={distances[1]}
      on:input={e => {
        if (e.currentTarget.value == 0) {
          distances[1] = 1
        } else if (e.currentTarget.value <= distances[0]) {
          distances[0] = distances[1] - 1
        }
      }} /></label>
  <label>Laat parkeergelegenheden zien zonder openingstijden
    <input type="checkbox" {disabled} bind:checked={showInvalidOpeningHours} />
  </label>
</form>
