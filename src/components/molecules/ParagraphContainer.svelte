<script>
  export let top = '1em'
</script>

<style>
  .paragraph-container {
    position: sticky;
    top: var(--top);
    align-self: start;
    padding: 1em;
    background: white;
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
    max-width: 40rem;
    margin: 0 auto;
  }
</style>

<div style="--top: {top}" class="paragraph-container">
  <slot />
</div>
