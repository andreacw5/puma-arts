import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (import.meta.client) gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/** Runs `setup` after mount inside a gsap.matchMedia scoped to `root`; reverts everything on unmount. */
export function useMotion(root: Ref<HTMLElement | undefined>, setup: (mm: gsap.MatchMedia, el: HTMLElement) => void) {
  let mm: gsap.MatchMedia | undefined
  onMounted(() => {
    if (!root.value) return
    mm = gsap.matchMedia(root.value)
    setup(mm, root.value)
  })
  onBeforeUnmount(() => mm?.revert())
}

/**
 * Opening of a page poster: the image is pasted on from the top, then the heading rises line by line.
 * Pair with the `intro-art` / `intro-heading` classes, which main.css hides before first paint.
 */
export function pasteIn(art: Element, heading: Element) {
  gsap.to(art, { clipPath: 'inset(0% 0 0% 0)', duration: 1.4, ease: 'expo.out' })
  return SplitText.create(heading, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'intro-line',
    autoSplit: true,
    onSplit: (self) => {
      gsap.set(heading, { visibility: 'visible' })
      return gsap.from(self.lines, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.5 })
    },
  })
}
