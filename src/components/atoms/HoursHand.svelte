<script>
  import { distanceRadius } from '../../store/clock'
</script>

<style>
  .hours-hand {
    stroke: darkgrey;
    stroke-width: 4px;
    animation: handAnimation 1800s linear infinite forwards;
  }
</style>

<line x1="0" x2={$distanceRadius - 20} class="hours-hand" />
