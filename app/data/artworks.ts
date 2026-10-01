// Fonte: main:stores/collectionsStore.ts. Tecnica e misure estratte dalle vecchie descrizioni libere.
export type Category = 'pittura' | 'scultura' | 'disegno'

export interface Artwork {
  slug: string
  /** Missing = untitled; render with `artworkTitle`. */
  title?: string
  category: Category
  abstract?: boolean
  /** Tecnica e supporto, as the artist wrote them: "Tempera su tela". */
  medium?: string
  /** cm, width × height as in the original descriptions. */
  size?: [number, number]
  /** Author of the original, for copies. */
  copyOf?: string
  note?: string
  /** What the work shows, in plain words. Required for untitled works: it is their alt text. */
  subject?: string
  image: string
  /** Pixel size of the photo, so the page reserves its space before it loads. */
  px: [number, number]
  /** English text; the Italian fields stay the source. Proper names and Latin titles stay as they are. */
  en?: Partial<Pick<Artwork, 'title' | 'medium' | 'note' | 'subject'>>
}

/** The work in the page's language: English fields over the Italian ones. */
export const artworkText = (a: Artwork, lang: string) => (lang === 'en' ? { ...a, ...a.en } : a)

export const artworkTitle = (a: Artwork, lang = 'it') => artworkText(a, lang).title ?? (lang === 'en' ? 'Untitled' : 'Senza titolo')

/** Alt text: the title, or for untitled works what they show, then the medium. */
export const artworkAlt = (a: Artwork, lang = 'it') => {
  const w = artworkText(a, lang)
  return [w.title ?? `${artworkTitle(a, lang)}: ${w.subject}`, w.medium?.toLowerCase()].filter(Boolean).join(', ')
}

/** "Grafite su cartoncino, 33 × 48 cm": the size never breaks across lines. */
export const artworkCaption = (a: Artwork, lang = 'it') =>
  [artworkText(a, lang).medium, a.size && `${a.size[0]}\u00a0×\u00a0${a.size[1]}\u00a0cm`].filter(Boolean).join(', ')

/** The path, stage by stage: each stage is one poster with its own ink. Titles and lines: `stages.<id>` in i18n/locales. */
// Painting first: it is his main work and gets the first impact of the scroll.
export const stages = [
  { id: 'figurativo', ink: 'green', match: (a: Artwork) => a.category === 'pittura' && !a.abstract },
  { id: 'astratto', ink: 'blue', match: (a: Artwork) => a.category === 'pittura' && !!a.abstract },
  { id: 'disegno', ink: 'black', match: (a: Artwork) => a.category === 'disegno' },
  { id: 'scultura', ink: 'yellow', match: (a: Artwork) => a.category === 'scultura' },
] as const

// Newest first, the order the old site used.
export const artworks: Artwork[] = [
  { slug: 'senza-titolo-1', category: 'pittura', subject: 'un uccello giallo, arancio e blu posato su rami stilizzati, tra foglie disegnate a contorno su fondo color pesca', image: 'https://fileharbor.heyatom.dev/v2/images/0eda0411-499d-4511-b60c-b1953bc85fba', px: [1268, 1280], en: { subject: 'a yellow, orange and blue bird perched on stylised branches, among leaves drawn in outline on a peach ground' } },
  { slug: 'papaveri', title: 'Papaveri', category: 'pittura', image: 'https://fileharbor.heyatom.dev/v2/images/a5608c5e-3b40-42f6-9989-c068f9f52f1e', px: [1213, 1280], en: { title: 'Poppies' } },
  { slug: 'volti', title: 'Volti', category: 'pittura', abstract: true, image: 'https://fileharbor.heyatom.dev/v2/images/c86e2ccc-8c51-4ba4-8b75-61cb66d4df4a', px: [960, 1280], en: { title: 'Faces' } },
  { slug: 'antico-fregio', title: 'Antico fregio', category: 'disegno', medium: 'Grafite su cartoncino', size: [23, 11], note: 'Copia di una sezione di un antico fregio.', image: 'https://fileharbor.heyatom.dev/v2/images/d5006eec-47bc-45ae-8f2f-1083071a6a4f', px: [1788, 1009], en: { title: 'Ancient frieze', medium: 'Graphite on card', note: 'Copy of a section of an ancient frieze.' } },
  { slug: 'bagnanti-sulla-spiaggia', title: 'Bagnanti sulla spiaggia', category: 'disegno', medium: 'Grafite su cartoncino', size: [33, 48], copyOf: 'Giorgio de Chirico', image: 'https://fileharbor.heyatom.dev/v2/images/fd6239d5-8143-44ad-b9e8-8d0d183c7921', px: [1788, 1344], en: { title: 'Bathers on the beach', medium: 'Graphite on card' } },
  { slug: 'senza-titolo-2', category: 'disegno', medium: 'Grafite su cartoncino', size: [35, 21], subject: 'un uccellino con una mascherina scura sugli occhi, posato su un ramo tra le foglie', image: 'https://fileharbor.heyatom.dev/v2/images/446ae9b1-92db-4965-b944-29f2033f9d23', px: [1788, 1449], en: { medium: 'Graphite on card', subject: 'a small bird with a dark mask over its eyes, perched on a branch among the leaves' } },
  { slug: 'gufo-campana', title: 'Gufo campana', category: 'scultura', medium: 'Terracotta', note: 'Campana a forma di gufo.', image: 'https://fileharbor.heyatom.dev/v2/images/a75f9a17-949a-4c27-bc5f-310be1cb03ae', px: [1700, 1788], en: { title: 'Owl bell', medium: 'Terracotta', note: 'A bell shaped like an owl.' } },
  { slug: 'tramonto', title: 'Tramonto', category: 'pittura', medium: 'Acrilico su tela', size: [50, 70], image: 'https://fileharbor.heyatom.dev/v2/images/02a183ca-4990-4586-8d8b-0368b7753527', px: [1788, 1210], en: { title: 'Sunset', medium: 'Acrylic on canvas' } },
  { slug: 'audrey-hepburn', title: 'Audrey Hepburn', category: 'pittura', medium: 'Acrilico su tela', size: [50, 70], note: 'Ritratto.', image: 'https://fileharbor.heyatom.dev/v2/images/bd718cb6-c1c5-49ea-aaac-96a97c208093', px: [1430, 1788], en: { medium: 'Acrylic on canvas', note: 'Portrait.' } },
  { slug: 'senza-titolo-3', category: 'disegno', medium: 'China su cartoncino', size: [33, 48], subject: 'alberi spogli dai rami intricati in un giardino, con un campanile sullo sfondo', image: 'https://fileharbor.heyatom.dev/v2/images/ed16b4b9-8f7e-46b1-81c2-f29793aa0f0a', px: [1430, 1788], en: { medium: 'Ink on card', subject: 'bare trees with tangled branches in a garden, a bell tower in the background' } },
  { slug: 'natura-morta-con-frutta', title: 'Natura morta con frutta', category: 'disegno', medium: 'China su cartoncino', size: [33, 48], image: 'https://fileharbor.heyatom.dev/v2/images/02e867c5-a7be-4b4f-8087-1e1318c1d27f', px: [1788, 1337], en: { title: 'Still life with fruit', medium: 'Ink on card' } },
  { slug: 'natura-morta-con-cipolle', title: 'Natura morta con cipolle', category: 'disegno', medium: 'Pastello su cartoncino', size: [33, 48], copyOf: 'Paul Cézanne', image: 'https://fileharbor.heyatom.dev/v2/images/b48c2d98-0d83-4042-87d2-26f17dfa24ff', px: [1788, 1396], en: { title: 'Still life with onions', medium: 'Pastel on card' } },
  { slug: 'natura-morta-con-brocca', title: 'Natura morta con brocca e mele', category: 'disegno', medium: 'Grafite su cartoncino', size: [35, 50], copyOf: 'Pablo Picasso', image: 'https://fileharbor.heyatom.dev/v2/images/2e0b94e1-99cb-4501-b6c1-e098dda7002d', px: [1430, 1788], en: { title: 'Still life with jug and apples', medium: 'Graphite on card' } },
  { slug: 'san-sebastiano', title: 'San Sebastiano', category: 'pittura', medium: 'Acrilico su cartoncino', size: [21, 30], image: 'https://fileharbor.heyatom.dev/v2/images/ba43e3d8-f10f-49f2-b6be-80ca26a14f3b', px: [1430, 1788], en: { title: 'Saint Sebastian', medium: 'Acrylic on card' } },
  { slug: 'crux-infernalis', title: 'Crux infernalis', category: 'pittura', abstract: true, medium: 'Su lastra di metallo', size: [45, 30], note: 'Croce infernale.', image: 'https://fileharbor.heyatom.dev/v2/images/0e66605f-15e1-49e4-bbde-7f039943100e', px: [1788, 1319], en: { medium: 'On a metal sheet', note: 'Infernal cross.' } },
  { slug: 'senza-titolo-4', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [40, 40], subject: 'pennellate bianche, ocra, rosse, turchesi e verdi su fondo chiaro, attraversate da sottili linee nere', image: 'https://fileharbor.heyatom.dev/v2/images/447e9c76-60a0-4468-8c0f-54e693189792', px: [1788, 1698], en: { medium: 'Tempera on canvas', subject: 'white, ochre, red, turquoise and green brushstrokes on a light ground, crossed by thin black lines' } },
  { slug: 'pioggia-di-meteore', title: 'Pioggia di meteore', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [24, 30], image: 'https://fileharbor.heyatom.dev/v2/images/216f17bb-7a83-4657-9a7f-32a4ea8e4e0f', px: [1788, 1441], en: { title: 'Meteor shower', medium: 'Tempera on canvas' } },
  { slug: 'senza-titolo-5', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [40, 60], subject: 'campiture arancio, rosse e gialle con schizzi bianchi e neri, linee incrociate e cerchi, accanto a una fascia nera verticale', image: 'https://fileharbor.heyatom.dev/v2/images/d2b3874e-357a-41e0-a1aa-5e9cae503079', px: [1788, 1341], en: { medium: 'Tempera on canvas', subject: 'orange, red and yellow fields with white and black splashes, crossing lines and circles, beside a vertical black band' } },
  { slug: 'incendio', title: 'Incendio', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [18, 24], image: 'https://fileharbor.heyatom.dev/v2/images/91fc0926-6727-41da-b531-3d9770860565', px: [1430, 1788], en: { title: 'Fire', medium: 'Tempera on canvas' } },
  { slug: 'velieri-in-viaggio', title: 'Velieri in viaggio', category: 'pittura', medium: 'Tempera su tavola in legno', size: [40, 60], image: 'https://fileharbor.heyatom.dev/v2/images/6939fe30-5534-46c4-9ff9-e89463a76120', px: [1430, 1788], en: { title: 'Sailing ships on their way', medium: 'Tempera on wood panel' } },
  { slug: 'senza-titolo-6', category: 'pittura', abstract: true, medium: 'Su tela', size: [50, 70], subject: 'fondo grigio e nero con schizzi bianchi, una fascia orizzontale nera, bianca e rossa e due grandi cerchi bianchi', image: 'https://fileharbor.heyatom.dev/v2/images/c67dc36e-3052-4524-b2e7-fb76cbb4034f', px: [1080, 754], en: { medium: 'On canvas', subject: 'a grey and black ground with white splashes, a horizontal black, white and red band and two large white circles' } },
  { slug: 'senza-limiti', title: 'Senza limiti', category: 'pittura', abstract: true, note: 'Raffigura che non ci sono limiti alla mente umana.', image: 'https://fileharbor.heyatom.dev/v2/images/059b567a-81b4-4894-a190-891d50986bf8', px: [1080, 1350], en: { title: 'No limits', note: 'It shows that the human mind has no limits.' } },
  { slug: 'velieri-al-tramonto', title: 'Velieri al tramonto', category: 'pittura', medium: 'Su tela', size: [30, 25], image: 'https://fileharbor.heyatom.dev/v2/images/a823c916-3528-4523-9bee-613ff11ec916', px: [1080, 1266], en: { title: 'Sailing ships at sunset', medium: 'On canvas' } },
  { slug: 'tragedie-umane', title: 'Tragedie umane', category: 'pittura', abstract: true, note: "Raffigura la rabbia, l'impotenza, l'amarezza davanti alle tragedie della guerra.", image: 'https://fileharbor.heyatom.dev/v2/images/cea66dac-dd35-47ff-a233-4203ef2e4c43', px: [1080, 570], en: { title: 'Human tragedies', note: 'It shows the anger, the helplessness, the bitterness in the face of the tragedies of war.' } },
  { slug: 'il-coraggio-di-guardare', title: 'Il coraggio di guardare', category: 'pittura', medium: 'Tempera su tela', size: [30, 40], image: 'https://fileharbor.heyatom.dev/v2/images/3e9e8e06-8875-4896-ae35-f2cb7ee38af1', px: [1080, 1350], en: { title: 'The courage to look', medium: 'Tempera on canvas' } },
  { slug: 'fiordi-ghiacciati-all-alba', title: "Fiordi ghiacciati all'alba", category: 'pittura', medium: 'Su tela', size: [40, 50], image: 'https://fileharbor.heyatom.dev/v2/images/20e121af-2e16-4327-84fc-a8c44ebe7f7c', px: [1080, 851], en: { title: 'Frozen fjords at dawn', medium: 'On canvas' } },
]

/** Stages with their works, numbered across the whole path (07/26). Home and detail pages share it. */
let n = 0
export const path = stages.map(s => ({ ...s, works: artworks.filter(s.match).map(w => ({ ...w, n: ++n })) }))
export const pathOrder = path.flatMap(s => s.works.map(w => ({ ...w, stage: s })))
