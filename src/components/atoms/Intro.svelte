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
    justify-content: center;
    flex-direction: column;
  }
</style>

<section class:intro>
  <slot />
</section>
