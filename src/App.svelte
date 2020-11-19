<script>
  import { onMount } from 'svelte'
  import { parseRDWData } from './modules/data'
  import { rdwData } from './components/store/data'

  import H1 from './components/atoms/H1.svelte'
  import H2 from './components/atoms/H2.svelte'
  import H3 from './components/atoms/H3.svelte'
  import Clock from './components/molecules/Clock.svelte'
  import { get } from 'svelte/store'

  onMount(() => {
    if (!get(rdwData).length)
      parseRDWData().then(rdwData.set).catch(console.trace)
  })
</script>

<style>
  :global(*, *:before, *:after) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    font-family: 'PT Sans', sans-serif;
    line-height: 1.5;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: 'Vollkorn', serif;
    line-height: 1.125;
  }
</style>

<H1>Hello world!</H1>
<H2>Doei world!</H2>
<H3>Hello again world!</H3>
<Clock />
