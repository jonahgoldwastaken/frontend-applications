<script>
  import ClockCenter from '../atoms/ClockCenter.svelte'
  import ClockOutline from '../atoms/ClockOutline.svelte'
  import HoursHand from '../atoms/HoursHand.svelte'
  import MinutesHand from '../atoms/MinutesHand.svelte'
  import SecondsHand from '../atoms/SecondsHand.svelte'
</script>

<ClockOutline>
  <HoursHand />
  <MinutesHand />
  <SecondsHand />
  <ClockCenter>Laden</ClockCenter>
</ClockOutline>
