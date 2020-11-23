<script>
  import { distanceRadius } from '../../store/clock'
</script>

<style>
  .hand {
    stroke: darkgrey;
    stroke-width: 4px;
    animation: handAnimation 30s linear infinite forwards;
  }
</style>

<line x1="0" x2={$distanceRadius - 10} class="hand" />
