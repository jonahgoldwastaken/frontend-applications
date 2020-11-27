<script>
  import { onMount, onDestroy } from 'svelte'
  import ClockCenter from '../atoms/ClockCenter.svelte'
  import ClockHands from '../atoms/ClockHands.svelte'
  import ClockOutline from '../atoms/ClockOutline.svelte'

  let dots = '.'
  let interval

  onMount(() => {
    interval = setInterval(() => {
      if (dots.length > 2) dots = ''
      dots += '.'
    }, 2000)
  })
  onDestroy(() => {
    clearInterval(interval)
  })
</script>

<style>
  div {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vh - 3rem);
    height: calc(100vh - 3rem);
    display: grid;
  }
</style>

<div>
  <ClockOutline>
    <ClockHands />
    <ClockCenter>Laden{dots}</ClockCenter>
  </ClockOutline>
</div>
