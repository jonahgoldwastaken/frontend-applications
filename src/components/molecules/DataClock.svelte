<script>
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

  function mouseOverHandler(data) {
    return () => {
      currentParkingArea = data
    }
  }

  function mouseOutHandler() {
    currentParkingArea = null
  }
</script>

<style>
  div {
    position: sticky;
    top: 0px;
  }
</style>

<div>
  <ClockOutline>
    <ClockRadius minRadius={distances[0]} maxRadius={distances[1]} />
    <ClockAngle
      minAngle={times[0]}
      maxAngle={times[1]}
      textFormatter={d => (d > 12 ? d + 'PM' : d === 0 ? '12AM' : d + 'AM')} />
    <ClockCenter>{chosenHotspot}</ClockCenter>
    <ClockData
      bind:data
      {times}
      {timeType}
      {distances}
      {chosenHotspot}
      mouseover={mouseOverHandler}
      mouseout={mouseOutHandler} />
  </ClockOutline>
  <Tooltip bind:currentParkingArea />
</div>
