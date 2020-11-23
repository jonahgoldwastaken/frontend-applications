<script>
  import { currentParkingArea, tooltipVisible } from '../../store/clock'
  import { chosenHotspot } from '../../store/data'

  let pageX
  let pageY

  function handleMouseMove(e) {
    pageX = e.pageX
    pageY = e.pageY
  }
</script>

<style>
  div {
    --x: 0px;
    --y: 0px;
    display: none;
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

<svelte:body on:mousemove|passive={handleMouseMove} />

{#if $tooltipVisible}
  <div style="--x: {pageX}px; --y: {pageY}px">
    <ul>
      <li>
        Afstand tot
        {$chosenHotspot}:
        {$currentParkingArea.distanceToHotspot[$chosenHotspot]}km
      </li>
      <li>Capaciteit: {$currentParkingArea.capacity}</li>
      <li>
        Openingstijd:
        {$currentParkingArea.openingHours[0] < 10 ? `0${$currentParkingArea.openingHours[0]}` : $currentParkingArea.openingHours[0]}:00
        uur
      </li>
      <li>
        Sluitingstijd:
        {$currentParkingArea.openingHours[1] < 10 ? `0${$currentParkingArea.openingHours[1]}` : $currentParkingArea.openingHours[1]}:00
        uur
      </li>
      <li />
    </ul>
  </div>
{/if}
