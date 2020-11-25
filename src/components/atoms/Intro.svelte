<script>
  export let intro = false
</script>

<style>
  section {
    min-height: 100vh;
    height: min-content;
  }
  .intro {
    display: flex;
    align-items: center;
  }
</style>

<section class:intro>
  <slot />
</section>
