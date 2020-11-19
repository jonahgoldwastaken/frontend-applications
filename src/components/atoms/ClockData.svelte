<script>
  import { lineRadial } from 'd3'
  import { derived } from 'svelte/store'
  import { angleScale, radiusScale, timeType } from '../store/clock'
  import { chosenHotspot, filteredData } from '../store/data'

  export let toasterVisible

  let group
  let data

  filteredData.subscribe(val => {
    data = val
  })
  const line = derived(
    [angleScale, radiusScale, chosenHotspot],
    ([$angleScale, $radiusScale, $chosenHotspot]) =>
      lineRadial()
        .radius(d => $radiusScale(d.distanceToHotspot[$chosenHotspot]))
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
