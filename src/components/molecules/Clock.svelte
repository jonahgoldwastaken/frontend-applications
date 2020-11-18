<script>
  import ClockData from '../atoms/ClockData.svelte'
  import ClockAngle from '../atoms/ClockAngle.svelte'
  import Toaster from '../atoms/Toaster.svelte'
  import { distances, radius, times } from '../store/clock'
  import ClockRadius from '../atoms/ClockRadius.svelte'

  let svg
  let toasterVisible = false
</script>

<style>
  .clock {
    fill: none;
    stroke: black;
    stroke-width: 12px;
  }

  .clock-center {
    fill: black;
    stroke: none;
  }
</style>

<div>
  <svg width="960" height="960" bind:this={svg}>
    <g transform="translate(480, 480)">
      <g class="background-group">
        <circle r={$radius} class="clock" />
        <circle r="100" class="clock-center" />
      </g>
      <ClockAngle minAngle={$times[0]} maxAngle={$times[1]} />
      <ClockRadius minRadius={$distances[0]} maxRadius={$distances[1]} />
      <ClockData {toasterVisible} />
    </g>
  </svg>

  {#if toasterVisible}
    <Toaster />
  {/if}
</div>
