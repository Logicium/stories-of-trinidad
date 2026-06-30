<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLocationsStore } from '@/stores/locations'
import { Headphones, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const locationsStore = useLocationsStore()

const locations = computed(() => locationsStore.locations)
const stopCount = computed(() => locations.value.length)

const pad = (n: number) => String(n).padStart(2, '0')

const navigateToLocation = (locationId: number) => {
  router.push({ name: 'location', params: { id: locationId } })
}
</script>

<template>
  <div class="home">
    <!-- ============ HERO ============ -->
    <header class="hero">
      <div class="container hero-inner">
        <p class="eyebrow eyebrow--brass hero-kicker">Self-guided audio walking tour</p>

        <h1 class="hero-title">
          <span class="ht-line">Stories of</span>
          <span class="ht-line ht-emph">Trinidad</span>
        </h1>

        <p class="hero-lead">
          Stand where the history happened. Follow the brass markers through
          a Colorado coal-and-cattle town, and let each building tell its own story.
        </p>

        <div class="hero-meta">
          <span><b>{{ stopCount }}</b> Historic Stops</span>
          <span class="dot" aria-hidden="true"></span>
          <span><b>~15</b> Min Walk</span>
          <span class="dot" aria-hidden="true"></span>
          <span><b>Est.</b> 1862</span>
        </div>

        <button class="hero-cta" @click="navigateToLocation(locations[0].id)">
          <span class="hero-cta-ic"><Headphones :size="18" :stroke-width="1.6" /></span>
          <span>Begin the tour</span>
        </button>
      </div>

      <div class="scroll-cue" aria-hidden="true">
        <span class="eyebrow">The Collection</span>
        <span class="scroll-line"></span>
      </div>
    </header>

    <!-- ============ INDEX ============ -->
    <main class="index" id="stops">
      <div class="container">
        <div class="index-head" v-reveal>
          <span class="numeral index-count">{{ pad(stopCount) }}</span>
          <h2 class="index-title">The Stops</h2>
          <p class="index-sub">Each marker unlocks a short narrated story and the landmarks nearby.</p>
        </div>

        <ul class="stop-list">
          <li
            v-for="(location, i) in locations"
            :key="location.id"
            class="stop"
            v-reveal="i * 90"
            @click="navigateToLocation(location.id)"
          >
            <div class="stop-media">
              <span class="stop-num numeral">{{ pad(i + 1) }}</span>
              <div class="stop-frame">
                <img
                  :src="location.images[0]?.url || ''"
                  :alt="location.images[0]?.alt || location.name"
                  loading="lazy"
                />
              </div>
            </div>

            <div class="stop-body">
              <p class="eyebrow stop-kicker">
                <span v-if="location.era">{{ location.era }}</span>
                <span v-if="location.style" class="stop-style"> · {{ location.style }}</span>
              </p>
              <h3 class="stop-name">{{ location.name }}</h3>
              <p class="stop-addr">{{ location.description }}</p>
              <p class="stop-teaser">{{ location.teaser }}</p>

              <span class="stop-listen">
                <Headphones :size="15" :stroke-width="1.7" />
                <span>{{ location.duration || 'Audio tour' }}</span>
                <ArrowRight class="stop-arrow" :size="16" :stroke-width="1.7" />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </main>

    <!-- ============ FOOTER ============ -->
    <footer class="foot">
      <div class="container foot-inner">
        <div class="foot-brand">
          <span class="wm-line eyebrow">Stories of</span>
          <span class="wm-mark">Trinidad</span>
        </div>
        <p class="foot-note">
          A self-guided heritage tour of Trinidad, Colorado.<br />
          Scan a marker, press play, and walk into the past.
        </p>
        <p class="foot-credit eyebrow">Trinidad · Colorado · USA</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home { min-height: 100vh; background: var(--paper); }

/* ============ HERO ============ */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 6rem;
  padding-bottom: 5rem;
  background:
    radial-gradient(120% 90% at 50% -10%, var(--surface) 0%, transparent 60%),
    var(--paper);
  overflow: hidden;
}
.hero::after {
  /* faint architectural baseline rule */
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: var(--line);
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 56rem;
}

.hero-kicker {
  margin-bottom: 1.75rem;
  animation: rise 900ms var(--ease-out) both;
}

.hero-title {
  font-weight: 400;
  font-size: var(--fs-mega);
  line-height: 0.92;
  letter-spacing: -0.035em;
  margin-bottom: 1.75rem;
}
.ht-line { display: block; }
.ht-line { animation: rise 1000ms var(--ease-out) both; }
.ht-line:nth-child(1) { animation-delay: 60ms; color: var(--ink); }
.ht-emph {
  font-style: italic;
  font-weight: 300;
  color: var(--brass);
  animation-delay: 160ms;
  margin-left: 0.04em;
}

.hero-lead {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: var(--fs-lead);
  line-height: 1.5;
  color: var(--ink-2);
  max-width: 34rem;
  margin-bottom: 2.5rem;
  animation: rise 1000ms var(--ease-out) 280ms both;
}

.hero-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--ink-3);
  text-transform: uppercase;
  margin-bottom: 2.75rem;
  animation: rise 1000ms var(--ease-out) 360ms both;
}
.hero-meta b { color: var(--ink); font-weight: 600; }
.hero-meta .dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--brass);
  opacity: 0.7;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  padding: 1.05rem 1.9rem 1.05rem 1.05rem;
  border-radius: 100px;
  transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t);
  box-shadow: var(--shadow);
  animation: rise 1000ms var(--ease-out) 440ms both;
}
.hero-cta:hover { background: var(--brass); transform: translateY(-2px); }
.hero-cta:active { transform: translateY(0); }
.hero-cta-ic {
  display: grid;
  place-items: center;
  width: 38px; height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
}

.scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 2;
}
.scroll-line {
  width: 1px; height: 46px;
  background: linear-gradient(var(--brass), transparent);
  animation: drip 2.4s var(--ease) infinite;
}
@keyframes drip {
  0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
  40% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
}
@keyframes rise {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: none; }
}

/* ============ INDEX ============ */
.index {
  padding-top: var(--sp-8);
  padding-bottom: var(--sp-8);
}

.index-head {
  position: relative;
  max-width: var(--measure);
  margin-bottom: var(--sp-7);
}
.index-count {
  display: block;
  font-size: 1rem;
  letter-spacing: 0.3em;
  margin-bottom: 1rem;
}
.index-title {
  font-size: var(--fs-display);
  font-style: italic;
  font-weight: 300;
  margin-bottom: 1rem;
}
.index-sub {
  font-size: 1.05rem;
  color: var(--ink-3);
  max-width: 30rem;
}

.stop-list { list-style: none; }

.stop {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(1.5rem, 5vw, 4.5rem);
  align-items: center;
  padding: var(--sp-7) 0;
  border-top: 1px solid var(--line);
  cursor: pointer;
}
.stop:last-child { border-bottom: 1px solid var(--line); }

/* alternate the image side for editorial rhythm */
.stop:nth-child(even) .stop-media { order: 2; }

.stop-media {
  position: relative;
}
.stop-num {
  position: absolute;
  top: -1.4rem;
  left: -0.5rem;
  z-index: 3;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1;
  color: var(--paper);
  text-shadow: 0 1px 18px rgba(33,28,23,0.35);
  pointer-events: none;
}
.stop-frame {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow);
}
.stop-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
  border-radius: inherit;
}
.stop-frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform var(--t-slow), filter var(--t);
  filter: saturate(0.92);
}
.stop:hover .stop-frame img {
  transform: scale(1.05);
  filter: saturate(1.02);
}

.stop-body { max-width: 32rem; }
.stop-kicker { margin-bottom: 1rem; color: var(--brass); }
.stop-style { color: var(--ink-3); }
.stop-name {
  font-size: var(--fs-h1);
  line-height: 1.0;
  margin-bottom: 0.65rem;
  transition: color var(--t-fast);
}
.stop:hover .stop-name { color: var(--brass); }
.stop-addr {
  font-family: var(--font-sans);
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 1.25rem;
}
.stop-teaser {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  line-height: 1.45;
  color: var(--ink-2);
  margin-bottom: 1.75rem;
}
.stop-listen {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--ink);
  transition: gap var(--t-fast), color var(--t-fast), border-color var(--t-fast);
}
.stop:hover .stop-listen { color: var(--brass); border-color: var(--brass); }
.stop-arrow { transition: transform var(--t); }
.stop:hover .stop-arrow { transform: translateX(5px); }

/* ============ FOOTER ============ */
.foot {
  background: var(--surface-ink);
  color: var(--paper);
  padding: var(--sp-8) 0 var(--sp-6);
}
.foot-inner { text-align: center; }
.foot-brand { margin-bottom: 1.5rem; }
.foot-brand .wm-line { color: rgba(245,238,226,0.5); display: block; margin-bottom: 0.4rem; }
.foot-brand .wm-mark {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(2.5rem, 7vw, 4rem);
  color: var(--paper);
}
.foot-note {
  color: rgba(245,238,226,0.65);
  line-height: 1.8;
  max-width: 28rem;
  margin: 0 auto 2.5rem;
}
.foot-credit {
  color: rgba(245,238,226,0.4);
  letter-spacing: 0.3em;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 820px) {
  .stop {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding: var(--sp-6) 0;
  }
  .stop:nth-child(even) .stop-media { order: 0; }
  .stop-num { top: -1rem; left: -0.25rem; }
  .stop-frame { aspect-ratio: 16 / 10; }
}

@media (max-width: 560px) {
  .hero { padding-top: 7rem; min-height: 92svh; }
  .hero-meta { gap: 0.7rem; font-size: 0.72rem; }
  .scroll-cue { display: none; }
}
</style>
