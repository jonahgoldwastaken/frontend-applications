<script>
  import { chosenHotspot, distances, times } from '../../store/data'
  import ClockAngle from '../atoms/ClockAngle.svelte'
  import ClockCenter from '../atoms/ClockCenter.svelte'
  import ClockData from '../atoms/ClockData.svelte'
  import ClockOutline from '../atoms/ClockOutline.svelte'
  import ClockRadius from '../atoms/ClockRadius.svelte'
  import Tooltip from '../atoms/Tooltip.svelte'

  let currentParkingArea = null

  function mouseOverHandler(data) {
    return () => {
      currentParkingArea = data
    }
  }

  function mouseOutHandler() {
    currentParkingArea = null
  }
</script>

<div>
  <ClockOutline>
    <ClockAngle
      minAngle={$times[0]}
      maxAngle={$times[1]}
      textFormatter={d => (d > 12 ? d + 'PM' : d === 0 ? '12AM' : d + 'AM')} />
    <ClockRadius minRadius={$distances[0]} maxRadius={$distances[1]} />
    <ClockCenter>{$chosenHotspot}</ClockCenter>
    <ClockData mouseover={mouseOverHandler} mouseout={mouseOutHandler} />
  </ClockOutline>
  <Tooltip bind:currentParkingArea />
</div>
