<script>
  import { fade, fly } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'
  import { lineRadial, scaleLinear } from 'd3'
  import { dimension, distanceRadius } from '../../store/clock'

  export let mouseover
  export let mouseout
  export let data = []
  export let distances
  export let times
  export let timeType
  export let chosenHotspot
  export let animate

  $: angleScale = scaleLinear()
    .domain(times)
    .range([0, 2 * Math.PI])
  $: radiusScale = scaleLinear()
    .domain(distances)
    .range([$dimension / 10, $distanceRadius])
  $: radialLine = lineRadial()
    .radius(d => radiusScale(d.distanceToHotspot[chosenHotspot]))
    .angle(d =>
      angleScale(
        d.openingHours[0]
          ? timeType === 'opening'
            ? d.openingHours[0]
            : d.openingHours[1]
          : times[0]
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
  .animate {
    transition: transform 0.2s ease;
  }
  .dot-has-time {
    fill: black;
  }
  .dot-has-no-time {
    fill: darkgray;
  }
</style>

<g class="data-group">
  {#each data as datum (datum.id)}
    <circle
      class="dot"
      on:mouseover={mouseover(datum)}
      on:mouseout={mouseout}
      class:animate
      transition:fade={{ duration: animate ? 200 : 0, easing: cubicInOut }}
      class:dot-has-time={(timeType === 'opening' && datum.openingHours[0]) || (timeType === 'closing' && datum.openingHours[1])}
      class:dot-has-no-time={(timeType === 'opening' && !datum.openingHours[0]) || (timeType === 'closing' && !datum.openingHours[1])}
      transform="translate({radialLine([datum]).slice(1).slice(0, -1)})"
      r="4" />
  {/each}
</g>
