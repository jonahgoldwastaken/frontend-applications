<script>
  import Anchor from '../atoms/Anchor.svelte'
  import Header from '../atoms/Header.svelte'
  import Highlight from '../atoms/Highlight.svelte'
  import Intro from '../molecules/Intro.svelte'
  import Playground from '../organs/Playground.svelte'
  import Preview from '../organs/Preview.svelte'
  import Section from '../organs/Section.svelte'
</script>

<style>
  article {
    max-width: 84rem;
    margin: 0 auto;
    padding: 0 2rem;
    scroll-snap-type: y proximity;
  }
</style>

<article>
  <meta name="author" content="Jonah Meijers" />
  <meta
    name="title"
    content="Hoe goed worden de primaire doelgroepen van hotspots in Amsterdam vertegenwoordigd in parkeermogelijkheden?" />
  <Header>
    <h1>
      Hoe goed worden de primaire doelgroepen van hotspots in Amsterdam
      vertegenwoordigd in parkeermogelijkheden?
    </h1>
  </Header>
  <Preview />
  <Intro>
    <p>
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
    </p>
    <p>
      Er zijn veel bekende en drukke locaties met elk hun eigen doelgroep, hoe
      worden die nu gerepresenteerd in het verkeer, en gaat dat veranderen in de
      toekomst?
    </p>
    <p>
      <small>
        Disclaimer: De data die is niet altijd even compleet. De parkeergarages
        hebben lang niet allemaal een aangegeven aantal parkeerplaatsen,
        waardoor sommige getallen erg krom uit de verf komen. Houdt hier
        rekening mee tijdens het lezen van dit artikel.
      </small>
    </p>
  </Intro>
  <Section showInvalidOpeningHours chosenHotspot="Dam">
    <h2 slot="heading">Het hart van Amsterdam</h2>
    <img
      slot="image"
      src="https://images0.persgroep.net/rcs/Cot8L8HoH9oD0vP5J__edGZ2LpU/diocontent/170590323/_fill/1409/900/?appId=21791a8992982cd8da851550a453bd7f&quality=0.9"
      alt="Foto van het paleis op de Dam" />
    <p>
      Foto
      <Anchor
        href="https://persgroep.net"
        target="_blank"
        rel="noopener noreferrer">
        ANP
      </Anchor>
    </p>
    <p>
      Laten we beginnen bij de Dam, het kloppende hart van Amsterdam. De Dam is
      een van de meest bezochte plekken in de stad, waardoor je zou denken dat
      bereikbaarheid van groot belang is. Als iedereen er moet kunnen komen,
      kunnen mensen die dat het liefst met de auto doen ook?
    </p>
  </Section>
  <Section chosenHotspot="Melkweg" showInvalidOpeningHours times={[12, 24]}>
    <h2 slot="heading">Centrum voor de moderne muziek</h2>
    <img
      slot="image"
      src="https://s3-eu-west-1.amazonaws.com/static.melkweg.nl/media/images/event_default.jpg"
      alt="Foto van de Melkweg in Amsterdam bij nacht" />
    <p>
      Foto
      <Anchor
        href="https://melkweg.nl"
        target="_blank"
        rel="noopener noreferrer">
        Melkweg
      </Anchor>
    </p>
    <p>
      De Melkweg stelt zichzelf graag tentoon als
      <Anchor
        href="https://s3-eu-west-1.amazonaws.com/static.melkweg.nl/uploads/documents/melkweg-ondernemingsplan-2017-2020-2.pdf">
        "de geschikte plek voor een groot aantal specifieke doelgroepen, die
        vaak nog geen plek hebben in het hoofdstedelijke nachtleven" (Pagina 7
        uit het ondernemingsplan 2017-2020)
      </Anchor>.
      <Highlight background="#323031" text="white">Iedereen</Highlight>
      die naar moderne muziek luistert komt in aanmerking voor een bezoekje aan
      de Melkweg om een favoriete artiest live te zien. Kom je daar ook goed
      terecht
      <Highlight>met de auto?</Highlight>
    </p>
  </Section>
  <Section showInvalidOpeningHours chosenHotspot="Rijksmuseum">
    <h2 slot="heading">Hét museum voor de klassieke kunst</h2>
    <img
      slot="image"
      src="https://images.arcadis.com/media/6/6/8/%7B66844D25-A8FF-46FB-BBF6-E5855A6087E3%7DRijksmuseumAmsterdam-main.jpg"
      alt="Foto van het Rijksmuseum" />
    <p>
      Foto
      <Anchor
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.arcadis.com/nl/nederland/wat-we-doen/projecten/europa/nederland/renovatie-rijksmuseum/">
        Arcadis
      </Anchor>
    </p>
    <p>
      Het Rijksmuseum kennen we allemaal wel, en willen we misschien ook wel
      allemaal graag heen. Wellicht met de auto, maar kan dat ook?
    </p>
  </Section>
  <Intro>
    <h3>En de rest?</h3>
    <p>
      Het ziet er naar uit dat de grote spelers goed worden gerepresenteerd, en
      dat het toch wel lijkt dat er voor iedereen wel plek is om met de auto te
      komen, in ieder geval voor nu. Ben je nog niet overtuigd? Scroll dan
      vooral verder, en ga aan de slag met alle andere locaties die beschikbaar
      zijn in de dataset.
    </p>
  </Intro>
  <Playground />
  <Intro>
    <h3>Bronnen</h3>
    <p>
      De data is afkomstig uit meerdere datasets van het RDW, waarbij de data
      van dezelfde parkeergebieden zijn samengevoegd:
    </p>
    <ul>
      <li>
        <Anchor
          href="https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEBIED/adw6-9hsg"
          target="_blank"
          rel="noopener noreferrer">
          RDW Open Data - GEBIED
        </Anchor>
      </li>
      <li>
        <Anchor
          href="https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-PARKING-TOEGANG/edv8-qiyg"
          target="_blank"
          rel="noopener noreferrer">
          RDW Open Data - PARKING TOEGANG
        </Anchor>
      </li>
      <li>
        <Anchor
          href="https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEOMETRIE-GEBIED/nsk3-v9n7"
          target="_blank"
          rel="noopener noreferrer">
          RDW Open Data - GEOMETRIE GEBIED
        </Anchor>
      </li>
    </ul>
  </Intro>
</article>
