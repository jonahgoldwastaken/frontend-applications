<script>
  import { dimension, radius } from '../../store/clock'
</script>

<style>
  .clock {
    fill: none;
    stroke: black;
    stroke-width: 12px;
  }
</style>

<svg viewBox="0 0 {$dimension} {$dimension}">
  <g transform="translate({$dimension / 2}, {$dimension / 2})">
    <circle r={$radius} class="clock" />
    <slot />
  </g>
</svg>
