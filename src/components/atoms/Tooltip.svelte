<script>
  import { chosenHotspot } from '../../store/data'

  let pageX
  let pageY
  export let currentParkingArea = null

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

{#if currentParkingArea}
  <div style="--x: {pageX}px; --y: {pageY}px">
    <ul>
      <li>
        Afstand tot
        {$chosenHotspot}:
        {currentParkingArea.distanceToHotspot[$chosenHotspot]}km
      </li>
      <li>Capaciteit: {currentParkingArea.capacity}</li>
      <li>
        Openingstijd:
        {currentParkingArea.openingHours[0] < 10 ? `0${currentParkingArea.openingHours[0]}` : currentParkingArea.openingHours[0]}:{currentParkingArea.openingHours[0] % 1 ? (currentParkingArea.openingHours[0] % 1) * 60 : '00'}
        uur
      </li>
      <li>
        Sluitingstijd:
        {currentParkingArea.openingHours[1] < 10 ? `0${currentParkingArea.openingHours[1]}` : currentParkingArea.openingHours[1]}:{currentParkingArea.openingHours[1] % 1 ? (currentParkingArea.openingHours[1] % 1) * 60 : '00'}
        uur
      </li>
      <li />
    </ul>
  </div>
{/if}
