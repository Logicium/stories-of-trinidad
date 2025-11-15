<template>
  <div class="transcript-section">
    <div class="transcript-container">
      <button 
        @click="toggleExpanded"
        class="transcript-header"
        aria-expanded="isExpanded"
      >
        <h3 class="transcript-title">Transcript</h3>
        <div class="expand-icon" :class="{ expanded: isExpanded }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      
      <div 
        class="transcript-content"
        :class="{ expanded: isExpanded }"
        ref="contentElement"
      >
        <div class="transcript-text">
          <p v-for="(paragraph, index) in paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
        
        <div v-if="!isExpanded" class="fade-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  text: string
  autoExpand?: boolean
}

const props = defineProps<Props>()

const isExpanded = ref(false)
const contentElement = ref<HTMLElement | null>(null)

const paragraphs = computed(() => {
  return props.text.split('\n\n').filter(p => p.trim())
})

watch(() => props.autoExpand, (newVal) => {
  if (newVal !== undefined) {
    isExpanded.value = newVal
  }
})

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  
  // Smooth scroll to top of transcript when collapsing
  if (!isExpanded.value && contentElement.value) {
    setTimeout(() => {
      contentElement.value?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      })
    }, 100)
  }
}
</script>

<style scoped>
.transcript-section {
  width: 100%;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.transcript-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.transcript-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl) 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.transcript-header:hover .transcript-title {
  color: var(--color-rust);
}

.transcript-title {
  font-family: var(--font-accent);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-deep-brown);
  margin: 0;
  transition: color var(--transition-base);
}

.expand-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: transform var(--transition-base);
  flex-shrink: 0;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.transcript-content {
  position: relative;
  max-height: 200px;
  overflow: hidden;
  transition: max-height var(--transition-slow);
}

.transcript-content.expanded {
  max-height: 5000px;
  overflow: visible;
}

.transcript-text {
  padding-bottom: var(--spacing-xl);
}

.transcript-text p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: justify;
}

.transcript-text p:last-child {
  margin-bottom: 0;
}

.fade-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(
    to bottom,
    rgba(249, 246, 241, 0) 0%,
    rgba(249, 246, 241, 0.8) 50%,
    rgba(249, 246, 241, 1) 100%
  );
  pointer-events: none;
}

.transcript-content.expanded .fade-overlay {
  display: none;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .transcript-container {
    padding: 0 var(--spacing-md);
  }
  
  .transcript-header {
    padding: var(--spacing-lg) 0;
  }
  
  .transcript-title {
    font-size: 1.25rem;
  }
  
  .transcript-content {
    max-height: 150px;
  }
  
  .transcript-text p {
    font-size: 0.95rem;
    line-height: 1.7;
    text-align: left;
  }
}
</style>
