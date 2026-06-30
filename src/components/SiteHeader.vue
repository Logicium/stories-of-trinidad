<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QrCode, ArrowLeft, X } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const scanOpen = ref(false)
const scrolled = ref(false)

const isDetail = computed(() => route.name === 'location')

const onScroll = () => { scrolled.value = window.scrollY > 24 }
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const goBack = () => router.push({ name: 'home' })
</script>

<template>
  <header class="site-header" :class="{ scrolled, detail: isDetail }">
    <div class="bar">
      <!-- Left: back on detail, else a quiet locale tag -->
      <div class="bar-left">
        <button v-if="isDetail" class="back" @click="goBack" aria-label="Back to all stops">
          <ArrowLeft :size="17" :stroke-width="1.6" />
          <span>All Stops</span>
        </button>
        <span v-else class="locale eyebrow">Trinidad · Colorado</span>
      </div>

      <!-- Center wordmark -->
      <RouterLink to="/" class="wordmark" aria-label="Stories of Trinidad — home">
        <span class="wm-line">Stories of</span>
        <span class="wm-mark">Trinidad</span>
      </RouterLink>

      <!-- Right: scan affordance -->
      <div class="bar-right">
        <button class="scan" @click="scanOpen = true">
          <QrCode :size="16" :stroke-width="1.6" />
          <span>Scan</span>
        </button>
      </div>
    </div>
  </header>

  <!-- QR scan / how-it-works overlay -->
  <transition name="overlay">
    <div v-if="scanOpen" class="scan-overlay" @click.self="scanOpen = false">
      <div class="scan-card" role="dialog" aria-modal="true" aria-label="How the tour works">
        <button class="scan-close" @click="scanOpen = false" aria-label="Close">
          <X :size="20" :stroke-width="1.5" />
        </button>
        <span class="eyebrow eyebrow--brass">Self-guided</span>
        <h2 class="scan-title">Follow the markers</h2>
        <div class="scan-glyph">
          <QrCode :size="58" :stroke-width="1" />
        </div>
        <p class="scan-copy">
          Look for the brass plaques on Trinidad's historic buildings. Point your
          phone camera at the QR code to open that stop and begin its audio story —
          no app, no sign-up.
        </p>
        <button class="btn btn--solid scan-cta" @click="scanOpen = false">
          Explore the stops
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background var(--t), backdrop-filter var(--t), border-color var(--t);
  border-bottom: 1px solid transparent;
}
.site-header.scrolled {
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: saturate(1.1) blur(14px);
  -webkit-backdrop-filter: saturate(1.1) blur(14px);
  border-bottom-color: var(--line);
}

.bar {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0.95rem clamp(1.25rem, 5vw, 4rem);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.bar-left { justify-self: start; }
.bar-right { justify-self: end; }

.locale {
  letter-spacing: 0.28em;
}

.wordmark {
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 0.96;
  text-align: center;
}
.wm-line {
  font-family: var(--font-sans);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--text-mute);
  margin-bottom: 2px;
}
.wm-mark {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.32rem;
  letter-spacing: 0.01em;
  color: var(--ink);
}

.back,
.scan {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-2);
  padding: 0.55em 0.2em;
  transition: color var(--t-fast);
}
.back:hover, .scan:hover { color: var(--ink); }

.scan {
  border: 1px solid var(--line-2);
  border-radius: 100px;
  padding: 0.6em 1.1em;
  transition: border-color var(--t-fast), color var(--t-fast), background var(--t-fast);
}
.scan:hover {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
}

/* ---- Scan overlay ---- */
.scan-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(20, 16, 12, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.scan-card {
  position: relative;
  width: 100%;
  max-width: 28rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: clamp(2rem, 6vw, 3.25rem);
  text-align: center;
  box-shadow: var(--shadow-lg);
}
.scan-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px; height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--ink-3);
  transition: background var(--t-fast), color var(--t-fast);
}
.scan-close:hover { background: var(--paper-2); color: var(--ink); }

.scan-title {
  font-size: var(--fs-h2);
  margin: 0.5rem 0 1.5rem;
}
.scan-glyph {
  display: grid;
  place-items: center;
  width: 108px; height: 108px;
  margin: 0 auto 1.5rem;
  border: 1px solid var(--line-2);
  border-radius: var(--radius-lg);
  color: var(--brass);
  background:
    linear-gradient(var(--line) 1px, transparent 1px) 0 0 / 100% 14px,
    var(--paper);
}
.scan-copy {
  color: var(--text-soft);
  font-size: 0.98rem;
  line-height: 1.7;
  max-width: 24rem;
  margin: 0 auto 1.75rem;
}
.scan-cta { width: 100%; justify-content: center; }

.overlay-enter-active, .overlay-leave-active { transition: opacity var(--t); }
.overlay-enter-active .scan-card,
.overlay-leave-active .scan-card { transition: transform var(--t), opacity var(--t); }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
.overlay-enter-from .scan-card { transform: translateY(16px) scale(0.97); opacity: 0; }
.overlay-leave-to .scan-card { transform: translateY(8px); opacity: 0; }

@media (max-width: 560px) {
  .back span, .scan span { display: none; }
  .scan { padding: 0.6em; }
  .wm-line { font-size: 0.55rem; letter-spacing: 0.28em; }
  .wm-mark { font-size: 1.12rem; }
}
</style>
