---
version: 1
slug: "app-pages-index-vue"
primary_target: "app/pages/index.vue"
related_targets: []
---

# Surface brief: home + percorso

Scope: home (`app/pages/index.vue`), poi `/opere`, `/opere/[slug]`, `/chi-sono` nello stesso mondo.
Mode: Experience. Visitatore: privato locale da bio Instagram, telefono. Job: vedere le opere, capire il percorso, seguire o scrivere.
Contenuto: 26 opere in `app/data/artworks.ts`; tappe = copie dei maestri → figurativo → astratto → scultura.
Vincoli utente: primo schermo = un'opera a tutto schermo; esplorazione in tappe; evitare "galleria di lusso" e "scuro/cupo".

## Direction contract

THESIS: Ogni tappa del percorso è un manifesto di mostra incollato a un muro d'affissione: l'opera stampata a piena pagina, il testo in inchiostro pieno. Rifiuta la parete bianca con griglia masonry e il nero da galleria.

OWN-WORLD: Carta da affissione bianca fredda (#f4f3ef), nero tipografico (#141414), una sola tinta piena per tappa (vermiglio #e2401c, cobalto #1f3fbf, giallo #f2b705), mai due a schermo. Grottesco variabile Archivo, dal condensato pesante per il display al normale per il testo. Bordi di carta, sovrapposizioni di fogli incollati, numerazione 07/26. Nessun raggio, nessuna card, nessuna ombra morbida.

STORY: Il visitatore vede subito un quadro grande, capisce che è di Emanuele Puma, scorre tappa per tappa vedendo crescere il percorso, apre un'opera per misure in scala e dettagli, esce verso Instagram o la mail.

FIRST VIEWPORT: Su telefono l'opera (Papaveri) riempie il 72% dell'altezza, senza cornice; sotto, fascia vermiglio a tutta larghezza con EMANUELE PUMA in Archivo condensato 900 che riempie la riga, e "Pittura, scultura, disegno · 26 opere". Nessuna barra di navigazione sopra l'opera: un piccolo tag "Opere" e "Chi sono" stampato nella fascia. Desktop: opera a sinistra a tutta altezza, fascia verticale a destra.

FORM: Manifesto d'affissione, candidato 6 della lista ordinata, seed d171ad8a. Raise: glazier (una nota satura per schermo), oscilloscope (misure in scala con A4), sukeban (richiamo annotato sulle copie), alphabet (tipografia come materia), minihompy (numerazione e conteggi onesti). Segnatura: il passaggio tra tappe è un manifesto nuovo incollato sopra il precedente, con bordo strappato.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Aperto
- Anteprima del primo viewport richiesta dall'utente prima della build completa.
