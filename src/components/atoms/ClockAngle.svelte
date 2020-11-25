<script>
  import { range, scaleLinear } from 'd3'
  import { dimension, distanceRadius, radius } from '../../store/clock'

  export let minAngle
  export let maxAngle
  export let textFormatter = d => d
  export let stepSize = 1

  const textMargin = 40
  let group

  $: angleScale = scaleLinear().domain([minAngle, maxAngle]).range([0, 360])
  $: angleData = range(minAngle, maxAngle, stepSize)
</script>

<style>
  .angle-group {
    transform: rotate(-90deg);
  }

  .angle-line {
    fill: none;
    stroke-width: 4px;
    stroke: lightgrey;
    stroke-dasharray: 5;
  }

  .angle-text {
    text-anchor: middle;
    alignment-baseline: middle;
    font: 700 18px 'PT Sans';
  }
</style>

<g bind:this={group} class="angle-group">
  {#each angleData as datum}
    <g transform="rotate({angleScale(datum)})">
      <line x1={$dimension / 10} x2={$distanceRadius} class="angle-line" />
      <text
        width="100"
        height="100"
        x={$radius - textMargin}
        transform="rotate({-angleScale(datum) + 90} {$radius - textMargin} 0)"
        class="angle-text">
        {textFormatter(datum)}
      </text>
    </g>
  {/each}
</g>
