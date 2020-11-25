<script>
  import ClockCenter from '../atoms/ClockCenter.svelte'
  import ClockOutline from '../atoms/ClockOutline.svelte'
  import HoursHand from '../atoms/HoursHand.svelte'
  import MinutesHand from '../atoms/MinutesHand.svelte'
  import SecondsHand from '../atoms/SecondsHand.svelte'
</script>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: white;
  }
</style>

<div>
  <ClockOutline>
    <HoursHand />
    <MinutesHand />
    <SecondsHand />
    <ClockCenter>Laden</ClockCenter>
  </ClockOutline>
</div>
