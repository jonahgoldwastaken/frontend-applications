<script>
  import { expandArrayOfNumbers } from '../../utilities/clock'
  import { scaleLinear } from 'd3'
  import { radius } from '../store/clock'

  export let minRadius
  export let maxRadius

  $: radiusScale = scaleLinear()
    .domain([minRadius, maxRadius])
    .range([100, $radius])
  let radiusData = expandArrayOfNumbers([minRadius, maxRadius]).slice(1)
</script>

<style>
  .radius-line {
    fill: none;
    stroke-width: 2px;
    stroke: lightgrey;
    stroke-dasharray: 10;
  }

  .radius-text {
    font: 500 12px sans-serif;
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
      {datum}km
    </text>
  {/each}
</g>
