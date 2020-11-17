<script>
  import { afterUpdate, onMount } from 'svelte'
  import ClockData from '../molecules/ClockData.svelte'
  import Toaster from '../atoms/Toaster.svelte'
  import { select, lineRadial } from 'd3'
  import { radiusScale, angleScale } from '../store/clock'
  import { get } from 'svelte/store'

  let svg, dataG, toasterVisible
  let timeType = 'opening'

  $: distanceScale = get(radiusScale)
  $: timeScale = get(timeScale)

  onMount(() => {
    dataG = select(svg).append('g')
  })

  // afterUpdate(() => {
  // updateHotSpotText(svg, hotSpot.name)
  // updateTimesLabel(timeType, times)
  // updateDistancesLabel(distances)
  // })
</script>

<div>
  <svg width="960" height="960" bind:this={svg}>
    <ClockData />
  </svg>

  <Toaster visible={toasterVisible} />
</div>
