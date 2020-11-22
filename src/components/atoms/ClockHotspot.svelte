<script>
  import { chosenHotspot } from '../../store/data'
</script>

<style>
  .hotspot {
    width: 200px;
    height: 200px;
  }
  .hotspot__background {
    fill: black;
    stroke: none;
  }
  .hotspot__text {
    width: 100%;
    font: 700 24px sans-serif;
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

<g class="hotspot">
  <circle r="100" class="hotspot__background" />
  <text class="hotspot__text">{$chosenHotspot}</text>
</g>
