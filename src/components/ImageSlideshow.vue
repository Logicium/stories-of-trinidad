<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { LocationImage } from '@/stores/locations'

interface Props {
  images: LocationImage[]
  locationName: string
  address?: string
  era?: string
  stopLabel?: string
}

const props = defineProps<Props>()
const currentIndex = ref(0)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}
const previousImage = () => {
  currentIndex.value =
    currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
}
const goToImage = (index: number) => {
  currentIndex.value = index
}
</script>

<template>
  <section class="hero-slideshow">
    <!-- Full-bleed imagery -->
    <div class="stage">
      <transition-group name="kenburns" tag="div" class="stage-inner">
        <img
          v-for="(image, index) in images"
          v-show="index === currentIndex"
          :key="index"
          :src="image.url"
          :alt="image.alt"
          class="stage-img"
        />
      </transition-group>
      <div class="scrim"></div>
    </div>

    <!-- Overlay content -->
    <div class="hero-overlay">
      <div class="hero-overlay-inner">
        <span v-if="stopLabel" class="eyebrow stop-label">{{ stopLabel }}</span>
        <h1 class="hero-name">{{ locationName }}</h1>
        <p v-if="address || era" class="hero-sub">
          <span v-if="address">{{ address }}</span>
          <span v-if="address && era" class="sep" aria-hidden="true"></span>
          <span v-if="era">{{ era }}</span>
        </p>
      </div>
    </div>

    <!-- Controls -->
    <div v-if="images.length > 1" class="controls">
      <button class="nav-btn" @click="previousImage" aria-label="Previous image">
        <ChevronLeft :size="22" :stroke-width="1.5" />
      </button>

      <div class="ticks" role="tablist">
        <button
          v-for="(image, index) in images"
          :key="index"
          class="tick"
          :class="{ active: index === currentIndex }"
          @click="goToImage(index)"
          :aria-label="`View image ${index + 1}`"
          :aria-selected="index === currentIndex"
        ></button>
      </div>

      <button class="nav-btn" @click="nextImage" aria-label="Next image">
        <ChevronRight :size="22" :stroke-width="1.5" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero-slideshow {
  position: relative;
  width: 100%;
  height: 92svh;
  min-height: 540px;
  max-height: 920px;
  overflow: hidden;
  background: var(--surface-ink);
}

.stage, .stage-inner { position: absolute; inset: 0; }
.stage-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Subtle Ken Burns drift on the active slide */
.kenburns-enter-active { transition: opacity 900ms var(--ease); }
.kenburns-leave-active { transition: opacity 900ms var(--ease); }
.kenburns-enter-from, .kenburns-leave-to { opacity: 0; }
.stage-img { animation: kb 16s ease-out both; }
@keyframes kb {
  from { transform: scale(1.03); }
  to { transform: scale(1.1); }
}

.scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(20,16,12,0.45) 0%, rgba(20,16,12,0) 28%),
    linear-gradient(0deg, rgba(20,16,12,0.82) 0%, rgba(20,16,12,0.15) 42%, rgba(20,16,12,0) 70%);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  z-index: 2;
  padding: clamp(2rem, 6vw, 5rem) 0;
}
.hero-overlay-inner {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding-inline: clamp(1.25rem, 5vw, 4rem);
  padding-bottom: 2.5rem;
}
.stop-label {
  display: block;
  color: var(--brass-2);
  margin-bottom: 1.25rem;
  animation: rise 800ms var(--ease-out) both;
}
.hero-name {
  font-weight: 400;
  font-style: italic;
  font-size: clamp(2.6rem, 8vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: #fff;
  max-width: 18ch;
  margin-bottom: 1.25rem;
  text-shadow: 0 2px 40px rgba(0,0,0,0.35);
  animation: rise 900ms var(--ease-out) 80ms both;
}
.hero-sub {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.82);
  margin: 0;
  animation: rise 900ms var(--ease-out) 180ms both;
}
.hero-sub .sep {
  width: 18px; height: 1px;
  background: rgba(255,255,255,0.45);
}
@keyframes rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}

/* Controls */
.controls {
  position: absolute;
  z-index: 3;
  right: clamp(1.25rem, 5vw, 4rem);
  bottom: clamp(2rem, 6vw, 3.5rem);
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.nav-btn {
  width: 46px; height: 46px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.28);
  background: rgba(20,16,12,0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
}
.nav-btn:hover {
  background: #fff;
  color: var(--ink);
  border-color: #fff;
}
.nav-btn:active { transform: scale(0.94); }

.ticks { display: flex; gap: 0.55rem; align-items: center; }
.tick {
  width: 26px; height: 2px;
  border-radius: 2px;
  background: rgba(255,255,255,0.35);
  transition: background var(--t), width var(--t);
}
.tick.active { background: #fff; width: 38px; }

@media (max-width: 640px) {
  .hero-slideshow { height: 78svh; min-height: 460px; }
  .controls {
    left: 0; right: 0;
    justify-content: center;
    bottom: 1.5rem;
  }
  .nav-btn { width: 42px; height: 42px; }
}
</style>
