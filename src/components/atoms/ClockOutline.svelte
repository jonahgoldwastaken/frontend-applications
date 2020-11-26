<script>
  import { dimension, radius } from '../../store/clock'
</script>

<style>
  svg {
    width: 100%;
    margin-top: 1rem;
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
  }
  .clock {
    fill: white;
    stroke: #323031;
    stroke-width: 12px;
  }
</style>

<svg viewBox="0 0 {$dimension} {$dimension}">
  <g transform="translate({$dimension / 2}, {$dimension / 2})">
    <circle r={$radius} class="clock" />
    <slot />
  </g>
</svg>
