<!--
  Platform attribution: the site runs on HeyAtom's services. A byline in the close, quieter than
  what surrounds it. The mark keeps its own green: it is the platform's glyph, not a stage ink.
-->
<template>
  <a
    class="powered"
    href="https://heyatom.dev"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="powered-label">Powered by</span>
    <span class="powered-logo">
      <svg width="14" height="14" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="var(--heyatom)" d="M1037.1 449.6 820 789.1l-87.6 169.1c-8 15.4-21.8 27.1-38.3 32.4l-269.8 86.3c-13.8 4.5-28.8 4.1-42.5-.8l-236.6-85.8c-13.9-5.1-25.5-15.3-32.1-28.6L46.9 829.8c-4.5-8.9-6.6-18.9-6.1-28.9l12.3-253.7 15.7-436c.2-4.8 2.1-9.2 5.5-12.6l8.6-8.6c8-8 18.7-12.5 30-12.6l23.5-.3c7.1 0 13.5-4.1 16.7-10.5l30.6-62.2c1.6-3.3 5.4-4.9 8.9-3.8l62.1 19.3c7.4 2.3 12.9 8.6 14.1 16.3l82.5 489.6c1.5 8.6-4.4 16.8-13 18.4l-71.6 12.6c-7 1.3-13.1 5.4-16.7 11.5l-10.7 18.1c-5.8 9.7 2.4 21.8 13.6 20l141.1-23c5.8-1 11.8-1 17.6 0l141.1 23c11.2 1.8 19.3-10.2 13.6-20l-10.7-18.1c-3.6-6.1-9.8-10.3-16.7-11.5l-71.6-12.6c-8.6-1.5-14.4-9.7-13-18.4L536.6 36c1.3-7.4 6.6-13.6 13.8-15.8l59.7-18.7c5.1-1.6 10.5.7 12.9 5.5l29.8 60.7c2.9 5.7 8.7 9.5 15.1 9.5l44.9.4c4.9 0 9.3 2.7 11.8 6.8l9.9 16.6c1.2 2 1.9 4.4 2 6.7l15.7 433.5c.1 4 2.1 7.8 5.3 10.1 5.2 3.7 12.3 3.2 16.9-1.3l137.4-137.4c2.7-2.7 6.5-4 10.2-3.8l94.2 7.4c3.6.3 7 2.1 9.2 5l10.7 13.9c3.4 4.4 3.6 10.3.6 15Z" />
      </svg>
      <span class="powered-name">HeyAtom</span>
    </span>
  </a>
</template>

<style scoped>
.powered {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  /* Muted print on the black close; the name stays at full strength. */
  color: color-mix(in srgb, var(--on-black) 70%, transparent);
  text-decoration: none;
}

.powered-logo {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.powered-logo svg {
  display: block;
  flex: none;
  /* The mark is a hand: it waves from the wrist, not from its centre. */
  transform-origin: 50% 90%;
}

.powered:hover .powered-logo svg,
.powered:focus-visible .powered-logo svg {
  animation: powered-wave 0.9s ease-in-out;
}

@keyframes powered-wave {
  0%, 100% { transform: rotate(0); }
  20%      { transform: rotate(14deg); }
  40%      { transform: rotate(-8deg); }
  60%      { transform: rotate(10deg); }
  80%      { transform: rotate(-4deg); }
}

.powered-name {
  font-weight: 700;
  color: var(--on-black);
  transition: color 0.2s var(--ease-out);
}

.powered:hover .powered-name,
.powered:focus-visible .powered-name {
  color: var(--heyatom);
}

.powered:focus-visible {
  outline: 2px solid var(--heyatom);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .powered-name { transition-duration: 1ms; }
  .powered:hover .powered-logo svg,
  .powered:focus-visible .powered-logo svg { animation: none; }
}
</style>
