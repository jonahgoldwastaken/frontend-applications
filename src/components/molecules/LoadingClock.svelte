<script>
  import ClockCenter from '../atoms/ClockCenter.svelte'
  import ClockHands from '../atoms/ClockHands.svelte'
  import ClockOutline from '../atoms/ClockOutline.svelte'
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
    <ClockHands />
    <ClockCenter>Laden</ClockCenter>
  </ClockOutline>
</div>
