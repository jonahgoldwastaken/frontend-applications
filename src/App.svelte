<script>
  import H1 from './components/atoms/H1.svelte'
  import Clock from './components/organisms/Clock.svelte'
  import { filteredData } from './store/data'
</script>

<style>
  :global(*, *:before, *:after) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
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

<H1>Hello world!</H1>
<Clock />
