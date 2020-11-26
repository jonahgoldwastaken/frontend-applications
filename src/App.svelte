<script>
  import LoadingClock from './components/molecules/LoadingClock.svelte'
  import Article from './components/organisms/Article.svelte'
  import { rdwData } from './store/data'
</script>

<style>
  :global(*, *:before, *:after) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    padding: 0 2rem;
    background: #ffc857;
  }

  :global(:root) {
    font-family: 'PT Sans', sans-serif;
    line-height: 1.5;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: 'Vollkorn', serif;
    line-height: 1.125;
  }
</style>

{#await $rdwData}
  <LoadingClock />
{:then}
  <Article />
{/await}
