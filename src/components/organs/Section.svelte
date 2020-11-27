<script>
  import { always, filter, pipe, unless } from 'ramda'
  import { rdwData } from '../../store/data'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import { timeFormatter } from '../../utilities/string.js'
  import Highlight from '../atoms/Highlight.svelte'
  import ParagraphContainer from '../atoms/ParagraphContainer.svelte'
  import ArticleSection from '../molecules/ArticleSection.svelte'
  import DataClock from '../molecules/DataClock.svelte'
  import Form from '../molecules/Form.svelte'

  export let distances = [0, 1]
  export let times = [0, 12]
  export let timeType = 'opening'
  export let showInvalidOpeningHours = false
  export let chosenHotspot

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
</script>

<style>
  .sub-grid {
    display: grid;
    align-items: stretch;
    grid-template-rows: auto auto;
    grid-gap: 2rem;
  }
</style>

<ArticleSection>
  <ParagraphContainer sticky>
    <slot name="heading" />
    <slot name="image" />
    <slot />
    <p>
      Binnen een straal van
      <Highlight>{distances[0]}km tot {distances[1]}km</Highlight>
      van de hotspot
      <Highlight>
        {data.length === 1 ? 'ligt 1 parkeergelegenheid' : `liggen ${data.length} parkeergelegenheden`}
      </Highlight>
      {#if showInvalidOpeningHours}
        waarvan
        <Highlight>
          {amountWithOpeningHours === 1 ? '1 locatie' : `${amountWithOpeningHours} locaties`}
          met
        </Highlight>
        {timeType === 'opening' ? (amountWithOpeningHours === 1 ? 'een openingstijd' : 'openingstijden') : amountWithOpeningHours === 1 ? 'een sluitingstijd' : 'sluitingstijden'}
        van
        {timeFormatter(times[0], true)}
        tot
        {timeFormatter(times[1], true)}
        uur en
        <Highlight>
          {data.length - amountWithOpeningHours}
          parkeergelegenheden zonder
        </Highlight>
        {timeType === 'opening' ? (data.length - amountWithOpeningHours === 1 ? 'openingstijd' : 'openingstijden') : data.length - amountWithOpeningHours === 1 ? 'sluitingstijd' : 'sluitingstijden'}.
      {:else}
        met een
        {timeType === 'opening' ? 'openingstijd' : 'sluitingstijd'}
        van
        {timeFormatter(times[0], true)}
        tot
        {timeFormatter(times[1], true)}.
      {/if}
    </p>
    {#if amountCapacitySources > 0}
      <p>
        Er kunnen, als we kijken naar de
        <Highlight>
          {amountCapacitySources === 1 ? 'enige locatie' : `${amountCapacitySources} locaties`}
        </Highlight>
        waarvan de totale capaciteit bekend is, in totaal
        <Highlight>{totalCapacity} auto's</Highlight>
        terecht bij de
        {data.length === 1 ? 'gelegenheid' : 'gelegenheden'}.

        <Highlight>
          {totalCapacity > 750 ? "Dat zijn veel auto's" : totalCapacity > 500 ? "Dat zijn best wat auto's" : totalCapacity > 250 ? 'Dat komt al best ver' : 'Dat zijn best wel weinig parkeerplaatsen'}.
        </Highlight>
      </p>
    {/if}
  </ParagraphContainer>
  <div class="sub-grid">
    <DataClock {distances} {times} {timeType} {chosenHotspot} bind:data />
    <Form
      bind:distances
      bind:times
      bind:timeType
      bind:showInvalidOpeningHours />
  </div>
</ArticleSection>
