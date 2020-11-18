<script>
  let pageX
  let pageY

  function handleMouseMove(e) {
    if (visible) {
      pageX = e.pageX
      pageY = e.pageY
    }
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
  }
</style>

<svelte:body on:mousemove={handleMouseMove} />
<div style="--x: {pageX}px; --y: {pageY}px">
  <slot />
</div>
