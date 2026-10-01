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
  image: string
}

export const artworkTitle = (a: Artwork) => a.title ?? 'Senza titolo'

// Newest first, the order the old site used.
export const artworks: Artwork[] = [
  { slug: 'senza-titolo-1', category: 'pittura', image: '/arts/24.webp' },
  { slug: 'papaveri', title: 'Papaveri', category: 'pittura', image: '/arts/25.webp' },
  { slug: 'volti', title: 'Volti', category: 'pittura', abstract: true, image: '/arts/26.webp' },
  { slug: 'antico-fregio', title: 'Antico fregio', category: 'disegno', medium: 'Grafite su cartoncino', size: [23, 11], note: 'Copia di una sezione di un antico fregio.', image: '/arts/1.webp' },
  { slug: 'bagnanti-sulla-spiaggia', title: 'Bagnanti sulla spiaggia', category: 'disegno', medium: 'Grafite su cartoncino', size: [33, 48], copyOf: 'Giorgio de Chirico', image: '/arts/2.webp' },
  { slug: 'senza-titolo-2', category: 'disegno', medium: 'Grafite su cartoncino', size: [35, 21], image: '/arts/3.webp' },
  { slug: 'gufo-campana', title: 'Gufo campana', category: 'scultura', medium: 'Terracotta', note: 'Campana a forma di gufo.', image: '/arts/4.webp' },
  { slug: 'tramonto', title: 'Tramonto', category: 'pittura', medium: 'Acrilico su tela', size: [50, 70], image: '/arts/5.webp' },
  { slug: 'audrey-hepburn', title: 'Audrey Hepburn', category: 'pittura', medium: 'Acrilico su tela', size: [50, 70], note: 'Ritratto.', image: '/arts/6.webp' },
  { slug: 'senza-titolo-3', category: 'disegno', medium: 'China su cartoncino', size: [33, 48], image: '/arts/7.webp' },
  { slug: 'natura-morta-con-frutta', title: 'Natura morta con frutta', category: 'disegno', medium: 'China su cartoncino', size: [33, 48], image: '/arts/8.webp' },
  { slug: 'natura-morta-con-cipolle', title: 'Natura morta con cipolle', category: 'disegno', medium: 'Pastello su cartoncino', size: [33, 48], copyOf: 'Paul Cézanne', image: '/arts/9.webp' },
  { slug: 'natura-morta-con-brocca', title: 'Natura morta con brocca e mele', category: 'disegno', medium: 'Grafite su cartoncino', size: [35, 50], copyOf: 'Pablo Picasso', image: '/arts/10.webp' },
  { slug: 'san-sebastiano', title: 'San Sebastiano', category: 'pittura', medium: 'Acrilico su cartoncino', size: [21, 30], image: '/arts/11.webp' },
  { slug: 'crux-infernalis', title: 'Crux infernalis', category: 'pittura', abstract: true, medium: 'Su lastra di metallo', size: [45, 30], note: 'Croce infernale.', image: '/arts/12.webp' },
  { slug: 'senza-titolo-4', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [40, 40], image: '/arts/13.webp' },
  { slug: 'pioggia-di-meteore', title: 'Pioggia di meteore', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [24, 30], image: '/arts/14.webp' },
  { slug: 'senza-titolo-5', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [40, 60], image: '/arts/15.webp' },
  { slug: 'incendio', title: 'Incendio', category: 'pittura', abstract: true, medium: 'Tempera su tela', size: [18, 24], image: '/arts/16.webp' },
  { slug: 'velieri-in-viaggio', title: 'Velieri in viaggio', category: 'pittura', medium: 'Tempera su tavola in legno', size: [40, 60], image: '/arts/17.webp' },
  { slug: 'senza-titolo-6', category: 'pittura', abstract: true, medium: 'Su tela', size: [50, 70], image: '/arts/18.webp' },
  { slug: 'senza-limiti', title: 'Senza limiti', category: 'pittura', abstract: true, note: 'Raffigura che non ci sono limiti alla mente umana.', image: '/arts/19.webp' },
  { slug: 'velieri-al-tramonto', title: 'Velieri al tramonto', category: 'pittura', medium: 'Su tela', size: [30, 25], image: '/arts/20.webp' },
  { slug: 'tragedie-umane', title: 'Tragedie umane', category: 'pittura', abstract: true, note: "Raffigura la rabbia, l'impotenza, l'amarezza davanti alle tragedie della guerra.", image: '/arts/21.webp' },
  { slug: 'il-coraggio-di-guardare', title: 'Il coraggio di guardare', category: 'pittura', medium: 'Tempera su tela', size: [30, 40], image: '/arts/22.webp' },
  { slug: 'fiordi-ghiacciati-all-alba', title: "Fiordi ghiacciati all'alba", category: 'pittura', medium: 'Su tela', size: [40, 50], image: '/arts/23.webp' },
]
