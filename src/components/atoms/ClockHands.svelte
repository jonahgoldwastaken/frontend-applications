<script>
  import { distanceRadius } from '../../store/clock'
</script>

<style>
  .hours-hand {
    stroke: darkgrey;
    stroke-width: 4px;
    animation: handAnimation 1800s linear infinite forwards;
  }
  .minutes-hand {
    stroke: darkgrey;
    stroke-width: 4px;
    animation: handAnimation 30s linear infinite forwards;
  }
  .seconds-hand {
    stroke: #b40000;
    stroke-width: 10px;
    animation: handAnimation 0.5s linear infinite forwards;
  }

  @keyframes handAnimation {
    from {
      transform: rotate(-90deg);
    }
    to {
      transform: rotate(270deg);
    }
  }
</style>

<line x1="0" x2={$distanceRadius - 20} class="hours-hand" />
<line x1="0" x2={$distanceRadius - 10} class="minutes-hand" />
<line x1="0" x2={$distanceRadius} class="seconds-hand" />
