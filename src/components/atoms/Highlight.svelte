<script>
  export let background = '#177e89'
  export let text = 'white'
</script>

<style>
  .highlight {
    display: inline-block;
    background: var(--background);
    color: var(--text);
    border-radius: 5px;
    padding: 0 0.3em 0.1em;
    font-weight: 400;
  }
</style>

<strong style="--background: {background}; --text: {text};" class="highlight">
  <slot />
</strong>
