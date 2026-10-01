import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The walk is measured from the layout; re-measure once a new page has mounted.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => ScrollTrigger.refresh())
})
