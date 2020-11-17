<script>
  let pageX
  let pageY
  export let visible = false
</script>

<style>
  div {
    --x: 0px;
    --y: 0px;
    position: fixed;
    top: var(--y);
    left: var(--x);
  }
</style>

{#if visible}
  <div style="--x: {pageX}px; --y: {pageY}px">
    <slot />
  </div>
{/if}
