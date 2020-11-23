<script>
  import { distanceRadius } from '../../store/clock'
</script>

<style>
  .hand {
    stroke: #b40000;
    stroke-width: 10px;
    animation: handAnimation 0.5s linear infinite forwards;
  }

  @keyframes -global-handAnimation {
    from {
      transform: rotate(-90deg);
    }
    to {
      transform: rotate(270deg);
    }
  }
</style>

<line x1="0" x2={$distanceRadius} class="hand" />
