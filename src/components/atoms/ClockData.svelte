<script>
  import { lineRadial, selectAll } from 'd3'
  import { always, filter, pipe, unless } from 'ramda'
  import { afterUpdate, beforeUpdate } from 'svelte'
  import { derived } from 'svelte/store'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import {
    angleScale,
    currentParkingArea,
    radiusScale,
    tooltipVisible,
  } from '../store/clock'
  import {
    chosenHotspot,
    currentHotspot,
    distances,
    rdwData,
    showInvalidOpeningHours,
    times,
    timeType,
  } from '../store/data'

  let group
  $: data = derived(
    [
      rdwData,
      distances,
      times,
      timeType,
      showInvalidOpeningHours,
      currentHotspot,
    ],
    ([
      $rdwData,
      $distances,
      $times,
      $timeType,
      $showInvalidOpeningHours,
      $currentHotspot,
    ]) =>
      pipe(
        filter(filterOnDistanceToHotspot($distances, $currentHotspot.name)),
        filter(filterOnOpeningHours($times, $timeType)),
        unless(
          always($showInvalidOpeningHours),
          filter(filterDataWithValidHours)
        )
      )($rdwData)
  )
  $: line = derived(
    [angleScale, radiusScale, chosenHotspot, timeType],
    ([$angleScale, $radiusScale, $chosenHotspot, $timeType]) =>
      lineRadial()
        .radius(d => $radiusScale(d.distanceToHotspot[$chosenHotspot]))
        .angle(d =>
          $angleScale(
            $timeType === 'opening' ? d.openingHours[0] : d.openingHours[1]
          )
        )
  )

  afterUpdate(() => {
    selectAll('.dot')
      .on('mouseover', mouseOverHandler)
      .on('mouseout', mouseOutHandler)
  })

  function mouseOverHandler(data) {
    return () => {
      currentParkingArea.set(data)
      tooltipVisible.set(true)
    }
  }

  function mouseOutHandler() {
    tooltipVisible.set(false)
  }
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
  {#each $data as datum, index (datum.id + datum.description + index)}
    <circle
      class="dot"
      on:mouseover={mouseOverHandler(datum)}
      on:mouseout={mouseOutHandler}
      class:dot-has-time={(timeType === 'opening' && datum.openingHours[0]) || (timeType === 'closing' && datum.openingHours[1])}
      class:dot-has-no-time={(timeType === 'opening' && !datum.openingHours[0]) || (timeType === 'closing' && !datum.openingHours[1])}
      transform="translate({$line([datum]).slice(1).slice(0, -1)})"
      r="4" />
  {/each}
</g>
