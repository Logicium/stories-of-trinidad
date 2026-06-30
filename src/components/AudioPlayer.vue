<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { Play, Pause, RotateCw, RotateCcw, Captions } from 'lucide-vue-next'

interface Props {
  audioUrl: string
  title?: string
  subtitle?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggleCaptions', enabled: boolean): void
}>()

const audioElement = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const captionsEnabled = ref(false)
const hasStarted = ref(false)

const progress = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0,
)

const togglePlay = () => {
  if (!audioElement.value) return
  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
    hasStarted.value = true
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (!audioElement.value) return
  currentTime.value = audioElement.value.currentTime
}
const onLoadedMetadata = () => {
  if (!audioElement.value) return
  duration.value = audioElement.value.duration
}
const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

const seek = (event: MouseEvent) => {
  if (!audioElement.value) return
  const bar = event.currentTarget as HTMLElement
  const rect = bar.getBoundingClientRect()
  const percentage = (event.clientX - rect.left) / rect.width
  audioElement.value.currentTime = percentage * duration.value
}

const skipForward = () => {
  if (!audioElement.value) return
  audioElement.value.currentTime = Math.min(audioElement.value.currentTime + 15, duration.value)
}
const skipBackward = () => {
  if (!audioElement.value) return
  audioElement.value.currentTime = Math.max(audioElement.value.currentTime - 15, 0)
}
const toggleCaptions = () => {
  captionsEnabled.value = !captionsEnabled.value
  emit('toggleCaptions', captionsEnabled.value)
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (audioElement.value) audioElement.value.pause()
})
</script>

<template>
  <div class="dock" :class="{ playing: isPlaying }">
    <audio
      ref="audioElement"
      :src="audioUrl"
      @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>

    <!-- Seekable progress along the very top edge -->
    <div class="seek" @click="seek">
      <div class="seek-fill" :style="{ width: `${progress}%` }"></div>
      <div class="seek-knob" :style="{ left: `${progress}%` }"></div>
    </div>

    <div class="dock-inner">
      <!-- Now playing -->
      <div class="now">
        <span class="eyebrow now-kicker">{{ isPlaying ? 'Now Playing' : 'Audio Tour' }}</span>
        <span class="now-title">{{ title }}</span>
        <span v-if="subtitle" class="now-sub">{{ subtitle }}</span>
      </div>

      <!-- Transport -->
      <div class="transport">
        <button class="ctrl" @click="skipBackward" aria-label="Back 15 seconds">
          <RotateCcw :size="19" :stroke-width="1.7" />
          <span class="ctrl-sec">15</span>
        </button>

        <button class="ctrl ctrl--play" @click="togglePlay" aria-label="Play or pause">
          <Play v-if="!isPlaying" :size="22" :stroke-width="1.8" class="play-ic" />
          <Pause v-else :size="22" :stroke-width="1.8" />
        </button>

        <button class="ctrl" @click="skipForward" aria-label="Forward 15 seconds">
          <RotateCw :size="19" :stroke-width="1.7" />
          <span class="ctrl-sec">15</span>
        </button>
      </div>

      <!-- Time + captions -->
      <div class="aux">
        <span class="time">
          <span class="t-now">{{ formatTime(currentTime) }}</span>
          <span class="t-sep">/</span>
          <span class="t-dur">{{ formatTime(duration) }}</span>
        </span>
        <button
          class="cc"
          :class="{ active: captionsEnabled }"
          @click="toggleCaptions"
          aria-label="Toggle transcript captions"
        >
          <Captions :size="18" :stroke-width="1.7" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dock {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 90;
  background: color-mix(in srgb, var(--surface-ink) 92%, transparent);
  backdrop-filter: saturate(1.2) blur(18px);
  -webkit-backdrop-filter: saturate(1.2) blur(18px);
  border-top: 1px solid var(--line-on-dark);
  color: var(--paper);
  box-shadow: 0 -20px 50px -30px rgba(0,0,0,0.7);
}

/* Seek bar on the top edge */
.seek {
  position: relative;
  height: 3px;
  background: rgba(245,238,226,0.12);
  cursor: pointer;
}
.seek::before {
  content: '';
  position: absolute;
  inset: -8px 0;            /* generous click target */
}
.seek-fill {
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
  background: var(--ember);
  transition: width 0.1s linear;
}
.seek-knob {
  position: absolute;
  top: 50%;
  width: 11px; height: 11px;
  border-radius: 50%;
  background: var(--ember);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ember) 35%, transparent);
  transform: translate(-50%, -50%) scale(0);
  transition: transform var(--t-fast), left 0.1s linear;
}
.dock:hover .seek-knob, .dock.playing .seek-knob { transform: translate(-50%, -50%) scale(1); }

.dock-inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0.85rem clamp(1rem, 5vw, 4rem);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

/* Now playing */
.now {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.now-kicker { color: var(--brass-2); margin-bottom: 0.25rem; }
.now-title {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.15rem;
  line-height: 1.15;
  color: var(--paper);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.now-sub {
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: rgba(245,238,226,0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.15rem;
}

/* Transport */
.transport {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.ctrl {
  position: relative;
  width: 46px; height: 46px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: rgba(245,238,226,0.8);
  transition: color var(--t-fast), background var(--t-fast), transform var(--t-fast);
}
.ctrl:hover { color: #fff; background: rgba(245,238,226,0.08); }
.ctrl:active { transform: scale(0.92); }
.ctrl-sec {
  position: absolute;
  bottom: 6px;
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgba(245,238,226,0.55);
}
.ctrl--play {
  width: 58px; height: 58px;
  background: var(--paper);
  color: var(--ink);
}
.ctrl--play:hover {
  background: #fff;
  color: var(--ink);
  transform: scale(1.05);
}
.ctrl--play:active { transform: scale(0.96); }
.play-ic { margin-left: 2px; } /* optically center the triangle */

/* Aux */
.aux {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}
.time {
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  color: rgba(245,238,226,0.65);
}
.t-sep { margin: 0 0.35em; opacity: 0.5; }
.t-now { color: var(--paper); }
.cc {
  width: 42px; height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: rgba(245,238,226,0.7);
  border: 1px solid var(--line-on-dark);
  transition: all var(--t-fast);
}
.cc:hover { color: #fff; border-color: rgba(245,238,226,0.4); }
.cc.active {
  background: var(--brass);
  border-color: var(--brass);
  color: #fff;
}

@media (max-width: 720px) {
  .dock-inner {
    grid-template-columns: 1fr auto;
    grid-template-areas: 'now transport';
    gap: 0.5rem 1rem;
    padding: 0.7rem 1.1rem;
  }
  .now { grid-area: now; }
  .transport { grid-area: transport; gap: 0.25rem; }
  .aux { display: none; }       /* time/cc fold away on small screens */
  .now-sub { display: none; }
  .ctrl { width: 42px; height: 42px; }
  .ctrl--play { width: 52px; height: 52px; }
}
</style>
