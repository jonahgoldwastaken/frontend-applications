<script>
  import { tooltipVisible } from '../store/clock'

  let pageX
  let pageY

  function handleMouseMove(e) {
    pageX = e.pageX
    pageY = e.pageY
  }
</script>

<style>
  div {
    --x: 0px;
    --y: 0px;
    position: fixed;
    top: var(--y);
    left: var(--x);
    background: black;
    pointer-events: none;
  }
  h1 {
    color: white;
  }
</style>

<svelte:body on:mousemove={handleMouseMove} />

{#if $tooltipVisible}
  <div style="--x: {pageX}px; --y: {pageY}px">
    <h1>Hoi</h1>
  </div>
{/if}
