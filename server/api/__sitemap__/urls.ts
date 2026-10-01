import { artworks } from '../../../app/data/artworks'

// Artwork pages come from the data, so a new work lands in the sitemap on its own.
export default defineSitemapEventHandler(() =>
  artworks.map(a => ({ loc: `/opere/${a.slug}` })),
)
