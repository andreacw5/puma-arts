# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Privati locali** (primario): persone che conoscono Emanuele o arrivano da passaparola e Instagram (`@puma_art_lab`). Leggono quasi sempre da telefono, spesso aprendo il link dalla bio o da un messaggio. Job: vedere le opere, capire chi è l'artista, eventualmente seguirlo o scrivergli.
- Addetti ai lavori (gallerie, curatori): pubblico possibile ma non primario, non guida le decisioni.

## Product Purpose

studioartepuma.it è la vetrina di Emanuele Puma, pittore e scultore: fa conoscere l'artista e il suo lavoro. Non vende e non spinge commissioni. Successo: chi arriva da Instagram o dal passaparola guarda le opere con calma, ne esce con un'idea chiara di chi è Emanuele, e se vuole lo segue o gli scrive.

## Positioning

Un artista vero con un percorso vero: dalla copia dei maestri (Cézanne, Picasso, de Chirico) in grafite, china e pastello, alla pittura figurativa, all'astratto in tempera e acrilico, fino alla terracotta. Il sito mostra questo percorso com'è, opere giovanili comprese, senza atteggiarsi a galleria commerciale.

## Operating Context

- Ingresso tipico: link dalla bio Instagram, da mobile. La prima schermata deve già mostrare opere.
- Contatto: solo `mailto:emanuelepuma2001@gmail.com` e Instagram. Nessun form, nessun carrello, nessun listino.
- Solo italiano.
- Le opere si aggiornano di rado; le aggiunge Andrea (sviluppatore), non l'artista.

## Capabilities and Constraints

- Nuxt 4 + CSS puro con token + GSAP, pagine prerenderizzate, deploy Docker. Stessa impostazione di `../heyatom-portfolio`.
- Opere in `app/data/artworks.ts`: titolo (assente = "Senza titolo"), categoria (pittura, scultura, disegno), astratto sì/no, tecnica, misure in cm, autore dell'originale per le copie, nota dell'artista. Immagini su FileHarbor, ridimensionate on demand.
- Pagine previste: home, `/opere` con filtro per categoria, `/opere/[slug]`, `/chi-sono`. Contatti nel footer e in chiusura, non in una pagina a sé.
- Le foto delle opere sono scatti amatoriali: inquadrature, luce e sfondi variano (tavolo, muro, tela storta). Il design deve reggerle, non presupporre riproduzioni da catalogo.
- Non decisi: anno delle opere (non disponibile), stato venduta/disponibile (non mostrato, il sito non vende).

## Brand Commitments

- Il sito si firma **Emanuele Puma**. "Studio Arte Puma" resta nel dominio, nel title e nell'og:site_name, non come marchio visivo.
- **Voce: prima persona singolare**, quella dell'artista ("Ogni opera che creo è una parte di me"). Tono personale, sincero, senza gergo da critica d'arte.
- Nessun logo esistente. Il vecchio look (Vuetify scuro con accento arancione e verde HeyAtom) è scartato: vale solo come anti-riferimento.
- Footer: byline "Powered by HeyAtom" (componente `PoweredBy`, segno con la mano verde `--heyatom`), link a heyatom.dev, discreto.

## Evidence on Hand

- 26 opere con foto e dati: `app/data/artworks.ts`.
- Ritratto dell'artista: foto notturna di profilo davanti a fontane illuminate, `site.portrait` in `app/data/site.ts`. Non è nello studio.
- Testi "chi sono" del vecchio sito: `git show main:pages/about.vue`. Contengono affermazioni da riconfermare con l'artista prima di riusarle: "oltre 100 opere realizzate", impegni universitari e lavorativi, commissioni già realizzate per privati.
- **Assenti, non inventare:** mostre, premi, studi artistici, anni delle opere, prezzi, recensioni, citazioni di terzi.

## Product Principles

1. **Le opere prima di tutto.** L'interfaccia si fa da parte: nessun elemento decorativo compete con un quadro.
2. **Da telefono, dalla bio di Instagram.** Ogni scelta va giudicata prima su un 375 px aperto da un link.
3. **Il percorso è il racconto.** Copie, figurativo, astratto, scultura: mostrarli come tappe di una crescita, non nasconderli.
4. **Onestà sul materiale.** Niente claim, niente cornici finte da galleria: foto vere, dati veri, "Senza titolo" quando non c'è un titolo.

## Accessibility & Inclusion

- Ogni immagine ha un alt descrittivo: titolo, tecnica, e per le senza titolo cosa raffigurano.
- Movimento con `prefers-reduced-motion` statico, come nel portfolio.
