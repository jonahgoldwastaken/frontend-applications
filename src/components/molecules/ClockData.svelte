<script>
  import { afterUpdate } from 'svelte'
  import { get } from 'svelte/store'
  import { rdwData } from '../store/data'
  import { enterDots, updateDots } from '../../modules/clock.js'

  let group
  $: data = get(rdwData)
  $: 

  afterUpdate(() => {
    let line = lineRadial()
      .radius(d => $distanceScale(d.distanceToHotSpot))
      .angle(d =>
        $timeScale(
          timeType === 'opening' ? d.openingHours[0] : d.openingHours[1]
        )
      )
    select(group)
      .selectAll('circle')
      .data(data)
      .join(enterDots(line), updateDots(line))
      .classed('dot', true)
      .attr('r', 4)
      .classed(
        'dot-has-time',
        d =>
          (timeType === 'opening' && d.openingHours[0]) ||
          (timeType === 'closing' && d.openingHours[1])
      )
      .classed(
        'dot-has-no-time',
        d =>
          (timeType === 'opening' && !d.openingHours[0]) ||
          (timeType === 'closing' && !d.openingHours[1])
      )
      .on('mouseover', () => (toasterVisible = true))
      .on('mouseout', () => (toasterVisible = false))
  })
</script>

<style>
</style>

<g bind:this={group} class="data-group" />
