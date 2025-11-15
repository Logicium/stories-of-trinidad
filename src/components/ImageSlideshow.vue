<template>
  <div class="slideshow-container">
    <!-- Blurred background -->
    <div 
      class="slideshow-background"
      :style="{ backgroundImage: `url(${images[currentIndex].url})` }"
    ></div>
    
    <div class="slideshow-content">
      <!-- Location name overlay at top -->
      <div class="location-header">
        <h1 class="location-name">{{ locationName }}</h1>
      </div>
      
      <!-- Main image - full width -->
      <div class="image-container">
        <transition name="fade" mode="out-in">
          <img 
            :key="currentIndex"
            :src="images[currentIndex].url" 
            :alt="images[currentIndex].alt"
            class="main-image"
          />
        </transition>
      </div>
      
      <!-- Controls in blurred area -->
      <div class="slideshow-controls">
        <button 
          @click="previousImage"
          class="control-btn"
          :disabled="images.length <= 1"
          aria-label="Previous image"
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div class="image-thumbnails">
          <button
            v-for="(image, index) in images"
            :key="index"
            @click="goToImage(index)"
            class="thumbnail"
            :class="{ active: index === currentIndex }"
            :aria-label="`Go to image ${index + 1}`"
          >
            <img :src="image.url" :alt="image.alt" />
          </button>
        </div>
        
        <button 
          @click="nextImage"
          class="control-btn"
          :disabled="images.length <= 1"
          aria-label="Next image"
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { LocationImage } from '@/stores/locations'

interface Props {
  images: LocationImage[]
  locationName: string
}

const props = defineProps<Props>()
const currentIndex = ref(0)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const previousImage = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1
}

const goToImage = (index: number) => {
  currentIndex.value = index
}
</script>

<style scoped>
.slideshow-container {
  position: relative;
  width: 100%;
  height: 75vh;
  min-height: 550px;
  max-height: 800px;
  overflow: hidden;
}

.slideshow-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(30px);
  transform: scale(1.1);
  opacity: 0.8;
}

.slideshow-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.location-header {
  padding: var(--spacing-2xl) var(--spacing-lg);
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
  flex-shrink: 0;
}

.location-name {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 400;
  color: white;
  text-align: center;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slideshow-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl) var(--spacing-lg);
  background: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%);
  gap: var(--spacing-lg);
  flex-shrink: 0;
}

.control-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  flex-shrink: 0;
  padding: 0;
  height: 56px;
  cursor: pointer;
}

.control-btn:hover:not(:disabled) {
  color: white;
  transform: scale(1.1);
}

.control-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.control-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.image-thumbnails {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 600px;
}

.thumbnail {
  width: 56px;
  height: 56px;
  border-radius: 4px;
  overflow: hidden;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.6;
  transition: all var(--transition-base);
}

.thumbnail:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.thumbnail:hover img {
  opacity: 0.9;
}

.thumbnail.active {
  box-shadow: 0 4px 16px rgba(0,0,0,0.5);
  transform: scale(1.08);
}

.thumbnail.active img {
  opacity: 1;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity var(--transition-base);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .slideshow-container {
    height: 65vh;
    min-height: 450px;
  }
  
  .location-name {
    font-size: 2.25rem;
  }
  
  .location-header {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .slideshow-controls {
    padding: var(--spacing-xl) var(--spacing-md);
    gap: var(--spacing-md);
  }
  
  .control-btn {
    height: 44px;
  }
  
  .control-btn svg {
    width: 36px;
    height: 44px;
  }
  
  .thumbnail {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 480px) {
  .location-name {
    font-size: 1.85rem;
  }
  
  .slideshow-controls {
    gap: var(--spacing-sm);
  }
  
  .control-btn {
    height: 40px;
  }
  
  .control-btn svg {
    width: 32px;
    height: 40px;
  }
  
  .thumbnail {
    width: 40px;
    height: 40px;
  }
  
  .image-thumbnails {
    gap: 6px;
  }
}
</style>
