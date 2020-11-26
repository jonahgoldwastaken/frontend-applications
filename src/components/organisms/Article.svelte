<script>
  import H1 from '../atoms/H1.svelte'
  import Intro from '../atoms/Intro.svelte'
  import Section from '../organs/Section.svelte'
  import Paragraph from '../atoms/Paragraph.svelte'
  import Highlight from '../atoms/Highlight.svelte'
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
  <header>
    <H1>
      Hoe goed worden verschillende bevolkingsgroepen gerepresenteerd als het
      gaat om parkeermogelijkheden voor aantrekkelijke locaties (hot-spots)?
    </H1>
  </header>
  <Intro intro={true}>
    <Paragraph>
      De rol van auto's gaat de komende jaren zeer veranderen in onze hoofdstad.
      <a
        href="https://www.parool.nl/nieuws/vanaf-2030-wordt-alle-verkeer-in-de-stad-elektrisch~b536e878/"
        target="_blank"
        rel="noopener noreferrer">Vanaf 2030 mogen er alleen nog maar
        elektrische auto's in het centrum rijden</a>,
      <a
        href="https://www.ad.nl/auto/oude-dieselauto-s-mogen-amsterdam-niet-meer-in~a6436be1"
        target="_blank"
        rel="noopener noreferrer">vervuilende dieselauto's al niet meer binnen
        de ring mogen rijden</a>
      en
      <a
        href="https://www.parool.nl/nieuws/ruim-10-000-parkeerplaatsen-verdwijnen-voor-2025~b8496335"
        target="_blank"
        rel="noopener noreferrer">voor 2025 moeten er 10.000 parkeerplaatsen
        verdwenen zijn</a>. Veel ambitieuze plannen om de rol van de auto binnen
      Amsterdam radicaal om te gooien, maar hoe zit het dan met de
      bereikbaarheid van hotspots in de stad?
    </Paragraph>
    <Paragraph>
      Disclaimer: De data die is niet altijd even compleet. De parkeergarages
      hebben lang niet allemaal een aangegeven aantal parkeerplaatsen, waardoor
      sommige getallen erg krom uit de verf komen. Houdt hier rekening mee
      tijdens het lezen van dit artikel.
    </Paragraph>
  </Intro>
  <Section>
    <Paragraph>
      Deze grafiek laat de openingstijden zien voor
      <Highlight>alle</Highlight>
      parkeerplekken rondom een hotspot in de stad.
    </Paragraph>
  </Section>
  <Section>
    <Paragraph>
      Laten we beginnen bij De Dam, het kloppende hart van Amsterdam. Binnen een
      straal van 1 kilometer zijn er 15 parkeergarages, met 1637 vermelde
      parkeerplekken in totaal. Maar 5 van de 15 parkeergelegenheden hebben hun
      openings- en sluitingstijden vermeld. Dat is vrij weinig data, maar je kan
      wel bijna de gehele dag parkeren op deze plekken. Je kan bij de meeste
      parkeergarages inrijden vanaf 9 uur tot 12 uur 's nachts, waarvan 2 open
      zijn tot 4 uur 's nachts.
    </Paragraph>
    <Paragraph>
      De Dam is een plek waar veel mensen naartoe komen, dus het is niet zo gek
      dat er zoveel parkeerplekken beschikbaar zijn in de buurt.
    </Paragraph>
  </Section>
</article>
