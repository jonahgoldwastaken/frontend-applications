<script>
  import LoadingClock from './components/molecules/LoadingClock.svelte'
  import Article from './components/organisms/Article.svelte'
  import Footer from './components/atoms/Footer.svelte'
  import { rdwData } from './store/data'
</script>

<style>
  :global(*, *:before, *:after) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    padding: 0;
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

  :global(h1) {
    font-weight: 700;
    font-size: 4rem;
    margin: 0 0 1em;
  }

  :global(h2) {
    font-weight: 500;
    font-size: 2rem;
    margin: 0 0 0.5em;
    color: black;
  }

  :global(h3) {
    font-weight: 500;
    font-size: 1.5rem;
    margin: 0 0 1em;
    color: black;
  }

  :global(p) {
    margin-top: 0px;
  }

  :global(p:last-child),
  :global(p:only-child) {
    margin-bottom: 0px;
  }

  :global(img) {
    width: 100%;
  }
</style>

{#await $rdwData}
  <LoadingClock />
{:then}
  <Article />
  <Footer />
{/await}
