<script>
  import ClockData from '../atoms/ClockData.svelte'
  import ClockAngle from '../atoms/ClockAngle.svelte'
  import Toaster from '../atoms/Toaster.svelte'
  import { distances, radius, times } from '../store/clock'
  import ClockRadius from '../atoms/ClockRadius.svelte'
  import ClockHotspot from '../atoms/ClockHotspot.svelte'

  let svg
  let toasterVisible = false
  let toasterData = {}
</script>

<style>
  .clock {
    fill: none;
    stroke: black;
    stroke-width: 12px;
  }
</style>

<div>
  <svg width="960" height="960" bind:this={svg}>
    <g transform="translate(480, 480)">
      <circle r={$radius} class="clock" />
      <ClockAngle minAngle={$times[0]} maxAngle={$times[1]} />
      <ClockRadius minRadius={$distances[0]} maxRadius={$distances[1]} />
      <ClockHotspot />
      <ClockData {toasterVisible} />
    </g>
  </svg>

  {#if toasterVisible}
    <Toaster />
  {/if}
</div>
