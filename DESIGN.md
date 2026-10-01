---
name: Emanuele Puma
description: Vetrina di Emanuele Puma, pittore e scultore. Il percorso come una serie di manifesti d'affissione.
colors:
  paper: "#f4f3ef"
  paper-white: "#fdfcf9"
  ink: "#141414"
  ink-2: "#4a4843"
  red: "#e2401c"
  green: "#3f6b1f"
  blue: "#1f3fbf"
  yellow: "#f2b705"
  on-red: "#fff6ef"
  on-green: "#f6f7ee"
  on-blue: "#f3f5ff"
  on-yellow: "#141414"
  on-black: "#f4f3ef"
  heyatom: "#00a86b"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 21vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, min(21cqi, 11svh), 11rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 12vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  numeral:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4rem)"
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 62"
    fontFeature: "tnum"
  work-title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 800
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.6vw, 1.25rem)"
    fontWeight: 500
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
  caption:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
rounded:
  none: "0"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(4rem, 10vw, 8rem)"
  max: "1440px"
  sheet-gap: "clamp(1.5rem, 4vw, 4rem)"
components:
  bill-band:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.display}"
    padding: "0.9rem clamp(1rem, 4vw, 3rem) 1.25rem"
  stage-head:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.headline}"
    padding: "1.25rem clamp(1rem, 4vw, 3rem) 1.1rem"
  stage-wall:
    backgroundColor: "{colors.paper}"
    height: "100svh"
  sheet-caption:
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
  wall-nav-button:
    backgroundColor: "transparent"
    textColor: "{colors.on-red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.8rem"
  wall-nav-button-hover:
    backgroundColor: "{colors.on-red}"
    textColor: "{colors.red}"
  path-strip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "1.5rem clamp(1rem, 4vw, 3rem) 1.75rem"
  path-strip-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
  work-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-black}"
    typography: "{typography.title}"
    padding: "1.5rem clamp(1rem, 4vw, 3rem) 2rem"
  site-close:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-black}"
    padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem) 2rem"
  powered-by:
    textColor: "{colors.on-black}"
    typography: "{typography.label}"
---

# Design System: Emanuele Puma

## Overview

**Creative North Star: "Il muro d'affissione"**

Ogni tappa del percorso è un manifesto di mostra incollato su un muro: l'opera stampata piatta sulla carta, il testo in inchiostro pieno, una sola tinta per foglio. Passare da una tappa all'altra significa incollare un manifesto nuovo sopra il precedente, con il bordo superiore strappato che lascia vedere l'anima bianca della carta. Il mondo è chiaro e tipografico: carta da affissione fredda, nero da stampa, quattro tinte piatte sature (il vermiglio della copertina, verde vescica, cobalto, giallo) e un grottesco variabile spinto al condensato più pesante.

La densità è bassa e frontale: un solo manifesto per schermo, un'opera alla volta in piena vista, nessuna griglia di miniature. L'interfaccia è stampata dentro i manifesti (navigazione nella fascia, conteggi, numerazione 07/26), mai sovrapposta all'opera. Le foto delle opere sono scatti amatoriali e restano quello che sono: mai ritagliate, mai incorniciate, mai ombreggiate.

Rifiuti confermati dal brief: la parete bianca da galleria con griglia masonry, il nero da galleria di lusso, il vecchio look scuro con accento arancione e verde.

**Key Characteristics:**
- Una tinta piena per schermo, assegnata alla tappa.
- Display Archivo a larghezza 62%, peso 900, maiuscolo, interlinea sotto 0,9.
- Bordo strappato come unica giunzione tra fogli.
- Nessun raggio, nessuna card, nessuna ombra.
- Il muro è alto esattamente uno schermo; lo scroll verticale lo percorre in orizzontale.

## Colors

Carta e nero da stampa come base, tre inchiostri pieni da manifesto che non convivono mai sullo stesso schermo.

### Primary
- **Vermiglio da affissione** (`red`): la tinta del manifesto di copertina in home, e solo quella. È la prima nota satura che il visitatore vede.
- **Verde vescica** (`green`): la tinta della tappa Pittura, la prima che si incolla sulla copertina. È il complementare del vermiglio, così il primo stacco dello scroll è netto, e sta a 63° di tinta dal verde HeyAtom per non confondersi con il segno del footer. Testo `on-green` a 5,67:1.

### Secondary
- **Cobalto tipografico** (`blue`): tinta della tappa Astratto.

### Tertiary
- **Giallo cartellone** (`yellow`): tinta della tappa Scultura. È l'unica tinta che porta testo nero (`on-yellow`).

### Neutral
- **Carta da affissione** (`paper`): fondo di pagina e muro su cui stanno le opere; anche testo sul nero (`on-black`).
- **Anima della carta** (`paper-white`): solo il labbro di fibra bianca lungo lo strappo, più chiaro del foglio stampato.
- **Nero da stampa** (`ink`): testo, tinta della tappa Disegno, fascia dell'opera di Disegno e chiusura del sito. Anche selezione, scrollbar e filetti da 2px.
- **Grigio inchiostro** (`ink-2`): didascalie secondarie sotto le opere (tecnica, misure, "da" per le copie).
- **Testo su tinta** (`on-red`, `on-green`, `on-blue`, `on-yellow`, `on-black`): il colore del testo stampato su ciascun inchiostro, sempre in coppia con la sua tinta.
- **Verde HeyAtom** (`heyatom`): solo il segno della mano nel byline "Powered by", il suo hover e il suo focus ring.

### Named Rules
**The Una Tinta per Schermo Rule.** Su ogni schermo c'è una sola tinta piena di tappa. Due tinte convivono solo durante l'incollaggio, mentre il manifesto nuovo scorre sopra il precedente. Nella pagina "chi sono" le strisce del percorso restano carta e si inondano della loro tinta una alla volta, solo in hover o focus.

**The Inchiostri Globali Rule.** Le tinte di tappa si applicano solo con le classi globali `.ink-black`, `.ink-red`, `.ink-green`, `.ink-blue`, `.ink-yellow`, che impostano la coppia `--stage-ink` / `--on-stage`. I componenti leggono quella coppia; non ridefiniscono mai `--stage-ink` o `--on-stage` in CSS scoped. La mappa tappa → tinta vive in `app/data/artworks.ts` (`stages[].ink`): nell'ordine del percorso Pittura verde vescica, Astratto cobalto, Disegno nero, Scultura giallo. La pittura viene prima perché è il lavoro principale di Emanuele e prende il primo impatto dello scroll.

**The Verde Non è un Inchiostro Rule.** `heyatom` appartiene al segno della piattaforma, non al mondo: non è mai fondo, tinta di tappa, link o accento.

## Typography

**Display Font:** Archivo Variable (asse `wdth`, via `@fontsource-variable/archivo/wdth.css`), con Archivo e system-ui come fallback
**Body Font:** Archivo Variable, alla larghezza normale

**Character:** un solo grottesco usato come materia: condensato al 62% e peso 900 per tutto ciò che è manifesto, larghezza normale per leggere. Numeri tabellari ovunque, perché conteggi e numerazione sono contenuto.

### Hierarchy
- **Display** (900, `wdth` 62, clamp(3.5rem, 21vw, 9rem), 0.82, maiuscolo): il nome EMANUELE PUMA nella fascia di copertina, che riempie la riga. In layout affiancato sale a clamp(3.5rem, min(8.4vw, 26svh), 11rem). Variante "chi sono": clamp(3rem, min(17vw, 12svh), 10rem), interlinea 0.84, `text-wrap: balance`.
- **Headline** (900, `wdth` 62, clamp(2.25rem, min(21cqi, 11svh), 11rem), 0.82, maiuscolo): titolo di tappa, dimensionato sulla propria colonna (container query) perché ASTRATTO, il più lungo, ci stia. Le stesse misure servono le grandi frasi di pagina (citazione "chi sono" clamp(2.5rem, 7vw, 6rem); "Scrivimi." clamp(4rem, 19vw, 11rem); nomi di tappa nel percorso clamp(2.75rem, 11vw, 6.5rem)).
- **Title** (900, `wdth` 62, clamp(2.75rem, 12vw, 6rem), 0.86, maiuscolo, bilanciato): titolo dell'opera nella sua pagina.
- **Numeral** (900, `wdth` 62, clamp(2.5rem, 7vw, 4rem), 1, non maiuscolo): la numerazione 06/26 nella pagina opera.
- **Work title** (800, 1.15rem, -0.01em): titolo dell'opera sotto il quadro, sul muro.
- **Lead** (500, clamp(1rem, 1.6vw, 1.25rem), max 32ch): la riga che descrive una tappa. Il testo lungo di "chi sono" usa clamp(1.05rem, 1.3vw, 1.2rem) a 62ch.
- **Body** (400, 1rem, 1.55, tabular-nums): testo corrente.
- **Label** (700, 0.9 to 0.95rem): conteggi ("9 opere"), navigazione stampata, bottoni del muro.
- **Caption** (400, 0.9rem, `ink-2`): tecnica e misure sotto le opere; "da [maestro]" in corsivo per le copie.

### Named Rules
**The Condensato Pieno Rule.** Ogni testo da manifesto è Archivo a `font-stretch: 62%`, peso 900, tracking -0.02em, interlinea tra 0.82 e 0.9. Il testo da leggere torna a larghezza normale. Nessun peso intermedio per i titoli, nessun tracking positivo.

**The Numerazione Onesta Rule.** I numeri sono conteggi veri: "NN/26" per l'opera (posizione nel percorso, zero iniziale), "N opere" per la tappa, "26 opere" in copertina. Calcolati dai dati, mai scritti a mano.

## Layout

Il modello spaziale è il manifesto a tutto schermo. Ogni manifesto è alto `100svh`; il gutter orizzontale è `gutter`, il respiro verticale delle sezioni di testo è `section`, il testo lungo è contenuto in `max`.

- **Copertina (bill):** su telefono l'opera riempie lo schermo sopra una fascia a tutta larghezza nella tinta della copertina (`grid-template-rows: minmax(0, 1fr) auto`). La copertina resta sticky sotto, perché la prima tappa le venga incollata sopra.
- **Tappa (muro):** testata in tinta, poi il muro di carta con le opere in fila orizzontale (`sheet-gap` tra i fogli), centrate e allineate in verticale con la loro didascalia. Il muro tiene 40px liberi in basso per lo strappo del manifesto successivo.
- **Pagina opera:** l'opera su carta in alto (min 62svh, immagine max 76svh), poi la fascia della tinta della sua tappa con titolo, didascalia, numerazione, scala A4 e precedente/successiva.

**Layout affiancato.** Copertina e muri passano al layout affiancato a `(min-width: 900px), (orientation: landscape) and (max-height: 520px)`: un telefono in orizzontale conta come schermo largo. Copertina 62/38 (opera a sinistra, fascia a destra), "chi sono" 50/50, tappa 30/70 (testata a sinistra, muro a destra). La pagina opera va a 66/34 allo stesso punto; su uno schermo basso la fascia scorre da sola e l'opera resta ferma.

### Named Rules
**The Muro di Uno Schermo Rule.** Ogni muro è alto esattamente `100svh`. Con il movimento attivo la tappa è sticky, lo scroll verticale fa scorrere la fila delle opere in orizzontale (GSAP ScrollTrigger, `scrub: 0.6`), poi la tappa resta ferma per un altro schermo mentre la successiva le scorre sopra (`margin-top: -100svh`). L'ultima tappa non ha nulla sopra: la chiusura segue.

**The Muro Senza Movimento Rule.** Con `prefers-reduced-motion: reduce` il muro diventa uno scroller orizzontale nativo (scroll-snap al centro) e la testata mostra due bottoni, Indietro e Avanti, che spostano il muro dell'80% della sua larghezza e si spengono agli estremi del muro. Servono perché le scrollbar in sovrimpressione di macOS non danno nulla da afferrare al mouse. Quando il percorso a scorrimento è attivo i bottoni spariscono.

## Elevation & Depth

Il sistema è piatto: la profondità è solo carta incollata su carta. Un foglio sta sopra l'altro perché ci scorre sopra e perché il suo bordo superiore è strappato, non perché proietta un'ombra. L'unico ordine di sovrapposizione è quello di affissione: copertina, tappe in sequenza, chiusura.

### Named Rules
**The Il Box è il Quadro Rule.** Le opere non vengono mai ritagliate e mai ombreggiate: l'immagine mantiene le proporzioni della foto (`width/height: auto` entro i massimi), senza cornice, passe-partout, bordo o ombra. Solo le foto di copertina della pagina (copertina e ritratto) riempiono il loro riquadro con `object-fit: cover`.

**The Strappo è l'Unica Giunzione Rule.** Il passaggio tra un foglio e il successivo è sempre il bordo strappato `.torn`, mai una linea, un'ombra o una sfumatura.

## Shapes

Nessun raggio: ogni superficie è un foglio rettangolare a spigolo vivo (`rounded.none`). Le uniche forme irregolari sono gli strappi, generati da `public/edge.svg` (passeggiata casuale con seme, 1200×40) usato come maschera ripetuta in orizzontale. I filetti sono pieni da 2px in `ink` o `currentColor`; il focus è un outline da 3px in `currentColor` con 3px di offset.

## Components

### Bordo strappato (`.torn`)
Un manifesto incollato sopra il precedente. Classe globale; il componente imposta `--torn-ink` sul colore del proprio foglio (di solito `var(--stage-ink)`) e, se vuole variare il profilo, `--torn-x` per spostare la maschera.
- **`::before`:** il labbro di fibra bianca (`paper-white`), 37px che sporgono 36px sopra il foglio, maschera a 760px spostata di 41px.
- **`::after`:** lo strappo inchiostrato in `--torn-ink`, 31px che sporgono 30px, maschera a 900px.
- **Dove:** testata di ogni tappa, fascia della pagina opera (solo nel layout impilato, `--torn-x: 120px`), chiusura del sito (`--torn-x: 300px`).

### Copertina (bill)
Il manifesto d'apertura di una pagina: foto a tutta altezza e fascia con navigazione stampata in alto, titolo display, riga descrittiva. In home la fascia è vermiglio; in "chi sono" è carta, perché la foto notturna è già scura. La navigazione è una fila di link in grassetto (700, 0.95rem) senza sottolineatura, sottolineati in hover.
- **Apertura:** `pasteIn` di `app/utils/motion.ts`. L'immagine porta `.intro-art`, il titolo `.intro-heading`; `main.css` li nasconde prima del primo paint solo se il movimento li rivelerà (classe `.js` impostata in head). L'immagine si incolla dall'alto (`clip-path`, 1.4s, `expo.out`), poi il titolo sale riga per riga da una maschera (1.1s, stagger 0.08, ritardo 0.5s).

### Testata di tappa e muro
Testata in `--stage-ink` / `--on-stage` con titolo headline, riga lead, conteggio label. Sotto, il muro di carta con i fogli: opera, numero "NN/26" (700, `ink`), titolo work-title, didascalia caption. Hover e focus del foglio sottolineano il titolo (2px).

### Bottoni del muro
Solo senza movimento. Contorno pieno da 2px in `currentColor`, fondo trasparente, label 700 0.9rem, spigolo vivo. In hover si invertono: fondo `--on-stage`, testo `--stage-ink`.

### Strisce del percorso ("chi sono")
Righe di carta separate da filetti da 2px in `ink`, ciascuna con la sua classe d'inchiostro. Nome della tappa in condensato pieno, riga, conteggio. In hover o focus la striscia si inonda della propria tinta (`background-color` e `color` in 0.45s, `--ease-out`).

### Fascia dell'opera e scala A4
La fascia della pagina opera prende la tinta della tappa dell'opera. Le misure sono disegnate in scala accanto a un foglio A4 (21×29,7 cm): A4 in tratteggio `currentColor` (stroke 0.3, dash 1 0.8, opacità 0.8), opera come rettangolo pieno `currentColor`, lato lungo orientato come la foto. Le frecce sinistra/destra della tastiera navigano il percorso.

### Chiusura del sito (SiteClose)
Ogni pagina che ha un percorso finisce qui: foglio nero strappato sopra quanto precede, "Scrivimi." in condensato pieno, mail (700, clamp(1.1rem, 3vw, 1.6rem)), Instagram, byline in fondo.

### Powered by
Byline discreta: label 600 0.875rem in `on-black` al 70%, nome "HeyAtom" 700 a piena forza, segno della mano 16px in `heyatom`. In hover o focus la mano saluta dal polso (0.9s) e il nome diventa verde; focus ring 2px `heyatom`. Statico con movimento ridotto.

### Movimento
Un solo easing di sistema, `--ease-out` (cubic-bezier(0.16, 1, 0.3, 1)), anche per le view transition (0.55s) con cui un'opera cresce dal muro alla sua pagina (`view-transition-name: art-<slug>`). Con `prefers-reduced-motion: reduce` nessuna animazione: scroll istantaneo, view transition spente, titoli e immagini visibili da subito.

## Do's and Don'ts

### Do:
- **Do** applicare la tinta di una superficie solo con `.ink-black` / `.ink-red` / `.ink-green` / `.ink-blue` / `.ink-yellow` e leggere `--stage-ink` / `--on-stage`.
- **Do** tenere una sola tinta piena per schermo; due solo durante l'incollaggio.
- **Do** unire un foglio al precedente con `.torn`, impostando `--torn-ink` sul colore del foglio.
- **Do** mostrare le opere intere: proporzioni della foto, nessun ritaglio, nessuna ombra, nessuna cornice.
- **Do** aprire ogni pagina-manifesto con `pasteIn` e le classi `.intro-art` / `.intro-heading`.
- **Do** tenere ogni muro alto esattamente `100svh` e passare al layout affiancato a `(min-width: 900px), (orientation: landscape) and (max-height: 520px)`.
- **Do** dare a ogni opera senza titolo un `subject`: è il suo testo alternativo ("Senza titolo: …").
- **Do** fornire con il movimento ridotto un'alternativa manovrabile (scroller nativo con Indietro/Avanti) a ogni scorrimento guidato.

### Don't:
- **Don't** ridefinire `--stage-ink` o `--on-stage` in CSS scoped.
- **Don't** usare `heyatom` fuori dal segno di PoweredBy.
- **Don't** arrotondare angoli, usare card o ombre: qui la profondità è carta su carta.
- **Don't** ritagliare un'opera sul muro o nella sua pagina con `object-fit: cover`.
- **Don't** mettere due tinte di tappa piene sullo stesso schermo a riposo.
- **Don't** scrivere titoli da manifesto a larghezza normale o sotto il peso 900.
