<script>
  import { dimension } from '../../store/clock'
</script>

<style>
  .center {
    --dimension: 200px;
    width: var(--dimension);
    height: var(--dimension);
  }
  .center__background {
    fill: black;
    stroke: none;
  }
  .center__text {
    width: 100%;
    font: 700 24px 'PT Sans';
    text-anchor: middle;
    dominant-baseline: middle;
    fill: white;
    text-align: center;
    /* https://css-tricks.com/almanac/properties/o/overflow-wrap/ */
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
</style>

<g style="--dimension: {$dimension / 5}" class="center">
  <circle r={$dimension / 10} class="center__background" />
  <text class="center__text">
    <slot />
  </text>
</g>
