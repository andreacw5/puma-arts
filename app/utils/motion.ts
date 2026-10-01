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

/** Lines rise out of a mask when the element scrolls into view. Re-splits on resize. */
export function revealLines(el: Element, vars: gsap.TweenVars = {}) {
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'ln',
    autoSplit: true,
    onSplit: self => gsap.from(self.lines, {
      yPercent: 115,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 88%' },
      ...vars,
    }),
  })
}

/** Element drifts toward the pointer and springs back on leave. Returns a cleanup. */
export function magnetic(el: HTMLElement, strength = 0.3) {
  const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
  const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    x((e.clientX - r.left - r.width / 2) * strength)
    y((e.clientY - r.top - r.height / 2) * strength)
  }
  const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' })
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  return () => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  }
}
