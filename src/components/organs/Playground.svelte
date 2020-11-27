<script>
  import { onMount, afterUpdate } from 'svelte'
  import { always, filter, pipe, unless } from 'ramda'
  import { rdwData, hotspotData } from '../../store/data'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import Highlight from '../atoms/Highlight.svelte'
  import DataClock from '../molecules/DataClock.svelte'
  import ParagraphContainer from '../atoms/ParagraphContainer.svelte'
  import { timeFormatter } from '../../utilities/string.js'
  import ArticleSection from '../molecules/ArticleSection.svelte'
  import Form from '../molecules/Form.svelte'

  let distances = [0, 1]
  let times = [0, 12]
  let timeType = 'opening'
  let showInvalidOpeningHours = false
  let chosenHotspot = 'Dam'

  $: data = pipe(
    filter(filterOnDistanceToHotspot(distances, chosenHotspot)),
    filter(filterOnOpeningHours(times, timeType)),
    unless(always(showInvalidOpeningHours), filter(filterDataWithValidHours))
  )($rdwData)
  $: amountWithOpeningHours = data.reduce(
    (acc, curr) => (curr.openingHours[0] != undefined ? acc + 1 : acc),
    0
  )
  $: totalCapacity = data.reduce((acc, curr) => acc + curr.capacity, 0)
  $: amountCapacitySources = data.reduce(
    (acc, curr) => (curr.capacity > 0 ? acc + 1 : acc),
    0
  )
  $: hotspotAudience = $hotspotData
    .find(hotspot => hotspot.name === chosenHotspot)
    .audience.toLowerCase()
</script>

<ArticleSection>
  <ParagraphContainer sticky>
    <h2>Playground</h2>
    <p>
      De gekozen hotspot is:
      <Highlight>{chosenHotspot}</Highlight>, met
      {hotspotAudience}
      als primaire doelgroep. Parkeergelegenheden
      {showInvalidOpeningHours ? 'met en zonder' : 'met'}
      <Highlight>
        {timeType === 'opening' ? 'openingstijden' : 'sluitingstijden'}
        van
        {timeFormatter(times[0])}
        tot
        {timeFormatter(times[1])}
      </Highlight>
      worden getoond. De locaties liggen op een afstand
      <Highlight>tussen de {distances[0]} en {distances[1]}km.</Highlight>
    </p>
    <p>
      Er worden
      <Highlight>in totaal {data.length} parkeerlocaties</Highlight>
      getoond,
      {#if totalCapacity > 0}
        met een
        <Highlight>totale capaciteit van {totalCapacity}</Highlight>
        afgeleid van
        {amountCapacitySources}
        locaties die hun capaciteit door hebben gegeven.
      {:else}waarvan er geen capaciteiten bekend zijn.{/if}
    </p>
  </ParagraphContainer>
  <div>
    <DataClock {distances} {times} {timeType} {chosenHotspot} bind:data />
    <Form
      bind:showInvalidOpeningHours
      bind:chosenHotspot
      bind:distances
      bind:times
      bind:timeType />
  </div>
</ArticleSection>
