<script>
  import { onMount } from 'svelte'
  import { always, filter, pipe, unless } from 'ramda'
  import Form from '../molecules/Form.svelte'
  import { rdwData } from '../../store/data'
  import {
    filterDataWithValidHours,
    filterOnDistanceToHotspot,
    filterOnOpeningHours,
  } from '../../utilities/clock'
  import DataClock from '../molecules/DataClock.svelte'
  import ArticleSection from '../molecules/ArticleSection.svelte'
  import Highlight from '../atoms/Highlight.svelte'
  import ParagraphContainer from '../atoms/ParagraphContainer.svelte'

  let distances = [0, 1]
  let times = [0, 12]
  let timeType = 'opening'
  let showInvalidOpeningHours = false
  let chosenHotspot

  $: data = pipe(
    filter(filterOnDistanceToHotspot(distances, chosenHotspot)),
    filter(filterOnOpeningHours(times, timeType)),
    unless(always(showInvalidOpeningHours), filter(filterDataWithValidHours))
  )($rdwData)
  $: capacity = data.reduce((acc, curr) => acc + curr.capacity, 0)

  onMount(() => {
    chosenHotspot = 'Olympisch Stadion'
    setInterval(() => {
      switch (chosenHotspot) {
        case 'Concertgebouw':
          chosenHotspot = 'Olympisch stadion'
          times = [9, 21]
          distances = [0, 5]
          timeType = 'closing'
          showInvalidOpeningHours = !showInvalidOpeningHours
          break
        case 'Melkweg':
          chosenHotspot = 'Concertgebouw'
          times = [3, 15]
          distances = [2, 4]
          timeType = 'opening'
          break
        case 'RAI':
          chosenHotspot = 'Melkweg'
          times = [7, 19]
          distances = [30, 35]
          timeType = 'opening'
          break
        case 'NEMO':
          chosenHotspot = 'RAI'
          times = [2, 14]
          distances = [0, 2]
          timeType = 'closing'
          showInvalidOpeningHours = !showInvalidOpeningHours
          break
        case 'Rijksmuseum':
          chosenHotspot = 'NEMO'
          times = [7, 19]
          distances = [5, 7]
          timeType = 'opening'
          break
        case 'Dam':
          chosenHotspot = 'Rijksmuseum'
          times = [0, 12]
          distances = [0, 3]
          timeType = 'closing'
          showInvalidOpeningHours = !showInvalidOpeningHours
          break
        default:
          chosenHotspot = 'Dam'
          times = [11, 23]
          distances = [0, 1]
          timeType = 'closing'
          break
      }
    }, 2000)
  })
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
  <ParagraphContainer>
    <h2>Een korte uitleg</h2>
    <p>
      Deze grafiek laat de openings- en sluitingstijden zien voor
      <Highlight>alle</Highlight>
      parkeerplekken rondom een hotspot in de stad. Elke
      parkeergarage/gelegenheid is een
      <Highlight background="black">zwart</Highlight>
      bolletje als de openingstijden bekend zijn of een
      <Highlight background="darkgrey">donkergrijs</Highlight>
      bolletje als dat niet zo is. De tijden die worden getoond kan je zien aan
      de buitenrand van de grafiek. En aan de label rechts van de grafiek is te
      zien of het gaat om de tijd wanneer een parkeergarage opent of sluit.
    </p>
    <p>
      Je kan met de filters de diagram aanpassen naar eigen smaak. Je kan voor
      openings- of sluitingstijd kiezen, de tijden verplaatsen, de minimum- en
      maximumafstand bepalen en ervoor kiezen om parkeergelegenheden zonder
      openingstijden te laten zien of niet.
    </p>
    <p>
      Wanneer je een filter aanpast, verandert de tekst in het zijbalkje mee,
      zoals
      <Highlight>
        De totale hoeveelheid vermelde parkeerplaatsen:
        {capacity}
      </Highlight>
      of
      <Highlight>De minimum afstand: {distances[0]}km</Highlight>
    </p>
  </ParagraphContainer>
  <div class="sub-grid">
    <DataClock
      preview={true}
      {distances}
      {times}
      {timeType}
      {chosenHotspot}
      bind:data />
    <Form
      disabled={true}
      bind:showInvalidOpeningHours
      bind:distances
      bind:times
      bind:timeType />
  </div>
</ArticleSection>
