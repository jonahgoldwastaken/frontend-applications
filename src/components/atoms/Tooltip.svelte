<script>
  import { timeFormatter } from '../../utilities/string'

  let pageX
  let pageY
  export let currentParkingArea = null
  export let chosenHotspot = ''

  function handleMouseMove(e) {
    pageX = e.pageX - window.scrollX
    pageY = e.pageY - window.scrollY
  }
</script>

<style>
  div {
    --x: 0px;
    --y: 0px;
    position: fixed;
    top: var(--y);
    left: var(--x);
    background: white;
    pointer-events: none;
    padding: 1em;
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    color: black;
  }
</style>

<svelte:body on:mousemove={handleMouseMove} />

{#if currentParkingArea}
  <div style="--x: {pageX}px; --y: {pageY}px">
    <ul>
      <li>
        Afstand tot
        {chosenHotspot}:
        {currentParkingArea.distanceToHotspot[chosenHotspot]}km
      </li>
      <li>Capaciteit: {currentParkingArea.capacity}</li>
      {#if currentParkingArea.openingHours[0] != undefined}
        <li>
          Openingstijd:
          {timeFormatter(currentParkingArea.openingHours[0], true)}
          uur
        </li>
        <li>
          Sluitingstijd:
          {timeFormatter(currentParkingArea.openingHours[1], true)}
          uur
        </li>
        <li />
      {/if}
    </ul>
  </div>
{/if}
