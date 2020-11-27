<script>
  export let sticky
</script>

<style>
  .paragraph-container {
    padding: 1em;
    background: white;
    border: 3px solid black;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
    max-width: 40rem;
    margin: 1rem 0 0;
  }
  .sticky {
    position: sticky;
    top: 1rem;
  }
</style>

<div class:sticky class="paragraph-container">
  <slot />
</div>
