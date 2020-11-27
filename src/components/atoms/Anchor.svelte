<script>
  export let href
  export let rel
  export let target
  export let light = false
  export let align = 'left'
</script>

<style>
  a {
    color: #084c61;
    font-weight: 700;
    transition: color 0.1s ease;
  }
  a.light {
    color: white;
  }
  a:hover,
  a:focus {
    outline: none;
    color: black;
  }
  a.light:hover,
  a.light:focus {
    color: #ffc857;
  }
  a.right {
    text-align: right;
    display: block;
    width: 100%;
  }
</style>

<a
  class:light
  class:right={align === 'right'}
  {href}
  {target}
  {rel}><slot /></a>
