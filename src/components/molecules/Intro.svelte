<script>
  import ParagraphContainer from '../molecules/ParagraphContainer.svelte'
</script>

<style>
  section {
    min-height: 30rem;
    height: 100vh;
    margin: 0 auto 4rem;
  }
</style>

<section>
  <ParagraphContainer top="25vh">
    <slot />
  </ParagraphContainer>
</section>
