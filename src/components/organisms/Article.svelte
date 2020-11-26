<script>
  import H2 from '../atoms/H2.svelte'
  import H1 from '../atoms/H1.svelte'
  import Header from '../atoms/Header.svelte'
  import Intro from '../molecules/Intro.svelte'
  import Section from '../organs/Section.svelte'
  import Paragraph from '../atoms/Paragraph.svelte'
  import Highlight from '../atoms/Highlight.svelte'
  import Anchor from '../atoms/Anchor.svelte'
</script>

<style>
  article {
    max-width: 80rem;
    margin: 0 auto;
  }
</style>

<article>
  <meta name="author" content="Jonah Meijers" />
  <meta
    name="title"
    content="Hoe goed worden verschillende bevolkingsgroepen gerepresenteerd als het
      gaat om parkeermogelijkheden voor aantrekkelijke locaties (hot-spots)?" />
  <Header>
    <H1>
      Hoe goed worden verschillende bevolkingsgroepen gerepresenteerd als het
      gaat om parkeermogelijkheden voor aantrekkelijke locaties (hot-spots)?
    </H1>
  </Header>
  <Section>
    <H2>Een korte uitleg</H2>
    <Paragraph>
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
    </Paragraph>
    <Paragraph>
      Je kan met de filters de diagram aanpassen naar eigen smaak. Je kan voor
      openings- of sluitingstijd kiezen, de tijden verplaatsen, de minimum- en
      maximumafstand bepalen en ervoor kiezen om parkeergelegenheden zonder
      openingstijden te laten zien of niet.
    </Paragraph>
  </Section>
  <Intro>
    <Paragraph>
      De rol van auto's gaat de komende jaren zeer veranderen in onze hoofdstad.
      <Anchor
        href="https://www.parool.nl/nieuws/vanaf-2030-wordt-alle-verkeer-in-de-stad-elektrisch~b536e878/"
        target="_blank"
        rel="noopener noreferrer">
        Vanaf 2030 mogen er alleen nog maar elektrische auto's in het centrum
        rijden
      </Anchor>,
      <Anchor
        href="https://www.ad.nl/auto/oude-dieselauto-s-mogen-amsterdam-niet-meer-in~a6436be1"
        target="_blank"
        rel="noopener noreferrer">
        vervuilende dieselauto's al niet meer binnen de ring mogen rijden
      </Anchor>
      en
      <Anchor
        href="https://www.parool.nl/nieuws/ruim-10-000-parkeerplaatsen-verdwijnen-voor-2025~b8496335"
        target="_blank"
        rel="noopener noreferrer">
        voor 2025 moeten er 10.000 parkeerplaatsen verdwenen zijn
      </Anchor>. Veel ambitieuze plannen om de rol van de auto binnen Amsterdam
      radicaal om te gooien, maar hoe zit het dan met de bereikbaarheid van
      hotspots in de stad?
    </Paragraph>
    <Paragraph>
      <small>
        Disclaimer: De data die is niet altijd even compleet. De parkeergarages
        hebben lang niet allemaal een aangegeven aantal parkeerplaatsen,
        waardoor sommige getallen erg krom uit de verf komen. Houdt hier
        rekening mee tijdens het lezen van dit artikel.
      </small>
    </Paragraph>
  </Intro>
  <Section chosenHotspot="De Dam">
    <H2>Het hart van Amsterdam</H2>
    <Paragraph>
      Laten we beginnen bij De Dam, het kloppende hart van Amsterdam. Binnen een
      straal van 1 kilometer zijn er 15 parkeergarages, met
      <Highlight>1637 vermelde parkeerplekken</Highlight>
      in totaal. Maar 5 van de 15 parkeergelegenheden hebben hun openings- en
      sluitingstijden vermeld. Dat is vrij weinig data, maar je kan wel bijna de
      gehele dag parkeren op deze plekken. Je kan bij de meeste parkeergarages
      inrijden vanaf 9 uur tot 12 uur 's nachts, waarvan 2 open zijn tot 4 uur
      's nachts.
    </Paragraph>
    <Paragraph>
      De Dam is een plek waar veel mensen naartoe komen, dus het is niet zo gek
      dat er zoveel parkeerplekken beschikbaar zijn in de buurt.
    </Paragraph>
  </Section>
</article>
