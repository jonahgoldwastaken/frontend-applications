<script>
  import Anchor from './Anchor.svelte'
</script>

<style>
  footer {
    background: #323031;
    padding: 2rem;
    color: white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  footer p,
  footer a {
    max-width: 40rem;
    margin: 0;
  }
</style>

<footer>
  <p><small>Copyright Jonah Meijers 2020</small></p>
  <Anchor
    light={true}
    align="right"
    href="https://github.com/theonejonahgold/frontend-applications">
    GitHub pagina
  </Anchor>
</footer>
