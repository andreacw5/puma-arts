// FileHarbor resizes on demand: ?width=N returns a WebP at that width.
export const img = (url: string, width: number) => `${url}?width=${width}`
export const srcset = (url: string, widths: number[]) => widths.map(w => `${img(url, w)} ${w}w`).join(', ')
