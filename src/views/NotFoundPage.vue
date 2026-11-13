<script setup lang="ts">
/**
 * The 404. A real page with a real status in the prerendered 404.html, never
 * a redirect home: a broken link should show up in Search Console, and a
 * visitor should land somewhere useful.
 */
import { locationsData } from '@/data/locations'

const firstStops = locationsData.slice(0, 6)
</script>

<template>
  <main class="not-found">
    <p class="nf-kicker">Trinidad · Colorado</p>
    <h1 class="nf-title">This stop isn't on the tour.</h1>
    <p class="nf-lede">The page may have moved, or the link may have a typo. Pick up the walk from one of these stops.</p>
    <ul class="nf-links">
      <li v-for="l in firstStops" :key="l.id">
        <RouterLink :to="`/location/${l.id}`">{{ l.name }}</RouterLink>
      </li>
    </ul>
    <RouterLink to="/" class="nf-home">All stops</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  max-width: 44rem;
  margin: 0 auto;
  padding: clamp(5rem, 14vh, 9rem) 1.25rem clamp(4rem, 10vh, 7rem);
  display: grid;
  gap: 1.25rem;
  color: var(--text);
}
.nf-kicker {
  margin: 0;
  color: var(--text-mute);
  font-family: var(--font-sans);
}
.nf-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--fs-h1);
  line-height: 1.1;
}
.nf-lede {
  margin: 0;
  color: var(--text-soft);
  font-size: 1.1rem;
  line-height: 1.55;
}
.nf-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.4rem;
}
.nf-links a,
.nf-home {
  color: var(--text);
  text-decoration: underline;
  text-decoration-color: var(--brass);
  text-underline-offset: 0.2em;
}
.nf-home {
  font-weight: 600;
}
</style>
