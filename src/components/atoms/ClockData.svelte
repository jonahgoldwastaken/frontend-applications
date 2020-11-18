<script>
  import { afterUpdate, beforeUpdate } from 'svelte'
  import { lineRadial, select } from 'd3'
  import { rdwData } from '../store/data'
  import { enterDots, updateDots } from '../../modules/clock.js'
  import { angleScale, radiusScale, timeType } from '../store/clock'
  import { derived } from 'svelte/store'

  export let toasterVisible

  let group, data

  rdwData.subscribe(val => {
    data = val
  })
  const line = derived(
    [angleScale, radiusScale],
    ([$angleScale, $radiusScale]) =>
      lineRadial()
        .radius(d => $radiusScale(d.distanceToHotspot['Melkweg']))
        .angle(d =>
          $angleScale(
            timeType === 'opening' ? d.openingHours[0] : d.openingHours[1]
          )
        )
  )
</script>

<style>
  /* .dot {
  } */
  .dot-has-time {
    fill: black;
  }
  .dot-has-no-time {
    fill: darkgray;
  }
</style>

<g bind:this={group} class="data-group">
  {#each data as datum, index (datum.id + datum.description + index)}
    <circle
      class="dot"
      on:mouseover={() => (toasterVisible = true)}
      on:mouseout={() => (toasterVisible = false)}
      class:dot-has-time={(timeType === 'opening' && datum.openingHours[0]) || (timeType === 'closing' && datum.openingHours[1])}
      class:dot-has-no-time={(timeType === 'opening' && !datum.openingHours[0]) || (timeType === 'closing' && !datum.openingHours[1])}
      transform="translate({$line([datum]).slice(1).slice(0, -1)})"
      r="4" />
  {/each}
</g>
