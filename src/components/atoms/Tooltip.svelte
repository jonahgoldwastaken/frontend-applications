<script>
  import { currentParkingArea, tooltipVisible } from '../../store/clock'
  import { chosenHotspot } from '../../store/data'

  let pageX
  let pageY

  function handleMouseMove(e) {
    pageX = e.pageX
    pageY = e.pageY
  }

  $: currentData = $currentParkingArea
  $: hotspotName = $chosenHotspot
</script>

<style>
  div {
    --x: 0px;
    --y: 0px;
    position: fixed;
    top: var(--y);
    left: var(--x);
    background: black;
    pointer-events: none;
    padding: 2rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    color: white;
  }
</style>

<svelte:body on:mousemove={handleMouseMove} />

{#if $tooltipVisible}
  <div style="--x: {pageX}px; --y: {pageY}px">
    <ul>
      <li>
        Afstand tot
        {hotspotName}:
        {currentData.distanceToHotspot[hotspotName]}km
      </li>
      <li>Capaciteit: {currentData.capacity}</li>
      <li>
        Openingstijd:
        {currentData.openingHours[0] < 10 ? `0${currentData.openingHours[0]}` : currentData.openingHours[0]}:00
        uur
      </li>
      <li>
        Sluitingstijd:
        {currentData.openingHours[1] < 10 ? `0${currentData.openingHours[1]}` : currentData.openingHours[1]}:00
        uur
      </li>
      <li />
    </ul>
  </div>
{/if}
