<style>
  section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 2rem;
    grid-template-rows: 1fr;
    min-height: 100vh;
    height: 100%;
    margin: 0 auto 4rem;
    align-items: start;
    scroll-snap-align: start;
  }
</style>

<section>
  <slot />
</section>
