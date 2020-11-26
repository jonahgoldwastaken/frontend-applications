<script>
  export let href
</script>

<style>
  a {
    color: #084c61;
    font-weight: 700;
    transition: color 0.1s ease;
  }
  a:hover,
  a:focus {
    outline: none;
    color: black;
  }
</style>

<a {href}><slot /></a>
