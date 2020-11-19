<script>
  import ClockAngle from '../atoms/ClockAngle.svelte'
  import ClockData from '../atoms/ClockData.svelte'
  import ClockHotspot from '../atoms/ClockHotspot.svelte'
  import ClockRadius from '../atoms/ClockRadius.svelte'
  import Toaster from '../atoms/Tooltip.svelte'
  import { radius } from '../store/clock'
  import { distances, times } from '../store/data'

  let svg
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
      <ClockData />
    </g>
  </svg>
  <Toaster />
</div>
