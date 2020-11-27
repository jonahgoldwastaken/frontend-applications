<script>
  import { timeFormatter } from '../../utilities/string.js'
  import ClockAngle from '../atoms/ClockAngle.svelte'
  import ClockCenter from '../atoms/ClockCenter.svelte'
  import ClockData from '../atoms/ClockData.svelte'
  import ClockOutline from '../atoms/ClockOutline.svelte'
  import ClockRadius from '../atoms/ClockRadius.svelte'
  import Tooltip from '../atoms/Tooltip.svelte'

  let currentParkingArea = null
  export let data = []
  export let times
  export let timeType
  export let distances
  export let chosenHotspot
  export let preview = false

  function mouseOverHandler(data) {
    return () => {
      currentParkingArea = data
    }
  }

  function mouseOutHandler() {
    currentParkingArea = null
  }
</script>

<ClockOutline>
  <ClockRadius minRadius={distances[0]} maxRadius={distances[1]} />
  <ClockAngle
    minAngle={times[0]}
    maxAngle={times[1]}
    legend={timeType === 'opening' ? 'Openingstijd' : 'Sluitingstijd'}
    textFormatter={timeFormatter} />
  <ClockData
    bind:data
    animate={!preview}
    {times}
    {timeType}
    {distances}
    {chosenHotspot}
    mouseover={mouseOverHandler}
    mouseout={mouseOutHandler} />
  <ClockCenter>{chosenHotspot}</ClockCenter>
</ClockOutline>
{#if !preview}
  <Tooltip bind:currentParkingArea bind:chosenHotspot />
{/if}
