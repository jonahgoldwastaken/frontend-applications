<script>
  import ParagraphContainer from '../atoms/ParagraphContainer.svelte'
</script>

<style>
  section {
    min-height: 30rem;
    height: 100vh;
    margin: 0 auto 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<section>
  <ParagraphContainer>
    <slot />
  </ParagraphContainer>
</section>
