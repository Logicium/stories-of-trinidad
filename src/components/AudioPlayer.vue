<template>
  <div class="audio-player">
    <audio 
      ref="audioElement"
      :src="audioUrl"
      @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
    
    <div class="player-container">
      <div class="player-header">
        <h3 class="player-title">Audio Tour</h3>
        <div class="duration-display">
          <span class="current-time">{{ formatTime(currentTime) }}</span>
          <span class="separator">/</span>
          <span class="total-time">{{ formatTime(duration) }}</span>
        </div>
      </div>
      
      <div class="progress-container" @click="seek">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${progress}%` }"
          ></div>
          <div 
            class="progress-handle"
            :style="{ left: `${progress}%` }"
          ></div>
        </div>
      </div>
      
      <div class="player-controls">
        <button 
          @click="toggleMute"
          class="control-button secondary"
          aria-label="Toggle mute"
        >
          <Volume2 v-if="!isMuted" :size="20" />
          <VolumeX v-else :size="20" />
        </button>
        
        <button 
          @click="skipBackward"
          class="control-button secondary"
          aria-label="Skip backward 15 seconds"
        >
          <RotateCcw :size="20" />
        </button>
        
        <button 
          @click="togglePlay"
          class="control-button primary"
          aria-label="Play/Pause"
        >
          <Play v-if="!isPlaying" :size="28" />
          <Pause v-else :size="28" />
        </button>
        
        <button 
          @click="skipForward"
          class="control-button secondary"
          aria-label="Skip forward 15 seconds"
        >
          <RotateCw :size="20" />
        </button>
        
        <button 
          @click="toggleCaptions"
          class="control-button secondary cc-button"
          :class="{ active: captionsEnabled }"
          aria-label="Toggle captions"
        >
          <span class="cc-text">CC</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Play, Pause, RotateCw, RotateCcw, Volume2, VolumeX } from 'lucide-vue-next'

interface Props {
  audioUrl: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggleCaptions', enabled: boolean): void
}>()

const audioElement = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const captionsEnabled = ref(false)
const isMuted = ref(false)

const togglePlay = () => {
  if (!audioElement.value) return
  
  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (!audioElement.value) return
  currentTime.value = audioElement.value.currentTime
  progress.value = (currentTime.value / duration.value) * 100
}

const onLoadedMetadata = () => {
  if (!audioElement.value) return
  duration.value = audioElement.value.duration
}

const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  progress.value = 0
}

const seek = (event: MouseEvent) => {
  if (!audioElement.value) return
  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = x / rect.width
  audioElement.value.currentTime = percentage * duration.value
}

const skipForward = () => {
  if (!audioElement.value) return
  audioElement.value.currentTime = Math.min(
    audioElement.value.currentTime + 15,
    duration.value
  )
}

const skipBackward = () => {
  if (!audioElement.value) return
  audioElement.value.currentTime = Math.max(
    audioElement.value.currentTime - 15,
    0
  )
}

const toggleCaptions = () => {
  captionsEnabled.value = !captionsEnabled.value
  emit('toggleCaptions', captionsEnabled.value)
}

const toggleMute = () => {
  if (!audioElement.value) return
  isMuted.value = !isMuted.value
  audioElement.value.muted = isMuted.value
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause()
  }
})
</script>

<style scoped>
.audio-player {
  width: 100%;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.player-container {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.player-title {
  font-family: var(--font-accent);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-deep-brown);
  margin: 0;
}

.duration-display {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
}

.progress-container {
  margin-bottom: var(--spacing-xl);
  cursor: pointer;
  padding: var(--spacing-sm) 0;
}

.progress-bar {
  position: relative;
  height: 4px;
  background: var(--color-sand);
  border-radius: 2px;
  overflow: visible;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--color-rust);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.progress-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: var(--color-rust);
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: left 0.1s linear;
}

.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: 0;
}

.control-button {
  border: none;
  background: none;
  color: var(--color-deep-brown);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  padding: 0;
  border-radius: 50%;
}

.control-button.primary {
  width: 64px;
  height: 64px;
  background: var(--color-rust);
  color: white;
  box-shadow: var(--shadow-md);
}

.control-button.primary:hover {
  background: var(--color-terracotta);
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

.control-button.primary:active {
  transform: scale(0.95);
}

.control-button.secondary {
  width: 44px;
  height: 44px;
  background: transparent;
  color: var(--color-text-secondary);
  border: 2px solid var(--color-border);
}

.control-button.secondary:hover {
  color: var(--color-rust);
  border-color: var(--color-rust);
  transform: scale(1.05);
}

.control-button.secondary:active {
  transform: scale(0.95);
}

.control-button.secondary.active {
  background: var(--color-rust);
  border-color: var(--color-rust);
  color: white;
}

.cc-button .cc-text {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .player-container {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .player-title {
    font-size: 1.1rem;
  }
  
  .control-button.primary {
    width: 56px;
    height: 56px;
  }
  
  .control-button.secondary {
    width: 40px;
    height: 40px;
  }
  
  .player-controls {
    gap: var(--spacing-md);
  }
}
</style>
