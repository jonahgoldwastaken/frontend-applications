<script>
  import { range, scaleLinear } from 'd3'
  import { dimension, distanceRadius } from '../../store/clock'

  export let minRadius
  export let maxRadius

  $: radiusScale = scaleLinear()
    .domain([minRadius, maxRadius])
    .range([$dimension / 10, $distanceRadius])
  $: radiusData = range(minRadius, maxRadius, (maxRadius - minRadius) / 5)
    .concat(maxRadius)
    .slice(1)
</script>

<style>
  .radius-line {
    fill: none;
    stroke-width: 2px;
    stroke: lightgrey;
    stroke-dasharray: 10;
  }

  .radius-text {
    font: 500 12px 'PT Sans';
    text-anchor: middle;
    fill: black;
  }
</style>

<g class="radius-group">
  {#each radiusData as datum}
    <circle class="radius-line" r={radiusScale(datum)} />
    <text
      class="radius-text"
      y={-radiusScale(datum) - 5}
      transform="rotate(15)">
      {Number.isInteger(datum) ? datum : datum.toFixed(2)}km
    </text>
  {/each}
</g>
