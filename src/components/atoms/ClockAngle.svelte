<script>
  import { scaleLinear } from 'd3'
  import { expandArrayOfNumbers } from '../../utilities/clock'
  import { radius } from '../store/clock'

  export let minAngle
  export let maxAngle

  const textMargin = 35
  const lineMargin = textMargin * 1.75
  let group

  $: angleScale = scaleLinear().domain([minAngle, maxAngle]).range([0, 360])
  $: angleData = expandArrayOfNumbers([minAngle, maxAngle]).slice(0, -1)
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
    font: 700 24px sans-serif;
  }
</style>

<g bind:this={group} class="angle-group">
  {#each angleData as datum}
    <g transform="rotate({angleScale(datum)})">
      <line x1="100" x2={$radius - lineMargin} class="angle-line" />
      <text
        text-anchor="middle"
        alignment-baseline="middle"
        x={$radius - textMargin}
        transform="rotate({-angleScale(datum) + 90} {$radius - textMargin} 0)"
        class="angle-text">
        {datum}
      </text>
    </g>
  {/each}
</g>
