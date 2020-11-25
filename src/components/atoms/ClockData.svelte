<script>
  import { lineRadial, scaleLinear } from 'd3'
  import { dimension, distanceRadius } from '../../store/clock'
  import {
    chosenHotspot,
    distances,
    filteredData,
    times,
    timeType,
  } from '../../store/data'

  export let mouseover
  export let mouseout
  let group

  $: angleScale = scaleLinear()
    .domain($times)
    .range([0, 2 * Math.PI])
  $: radiusScale = scaleLinear()
    .domain($distances)
    .range([$dimension / 10, $distanceRadius])
  $: radialLine = lineRadial()
    .radius(d => radiusScale(d.distanceToHotspot[$chosenHotspot]))
    .angle(d =>
      angleScale(
        $timeType === 'opening' ? d.openingHours[0] : d.openingHours[1]
      )
    )
</script>

<style>
  .data-group {
    pointer-events: none;
  }
  .dot {
    pointer-events: all;
  }
  .dot-has-time {
    fill: black;
  }
  .dot-has-no-time {
    fill: darkgray;
  }
</style>

<g bind:this={group} class="data-group">
  {#each $filteredData as datum, index (datum.id + datum.description + index)}
    <circle
      class="dot"
      on:mouseover={mouseover(datum)}
      on:mouseout={mouseout}
      class:dot-has-time={($timeType === 'opening' && datum.openingHours[0]) || ($timeType === 'closing' && datum.openingHours[1])}
      class:dot-has-no-time={($timeType === 'opening' && !datum.openingHours[0]) || ($timeType === 'closing' && !datum.openingHours[1])}
      transform="translate({radialLine([datum]).slice(1).slice(0, -1)})"
      r="4" />
  {/each}
</g>
