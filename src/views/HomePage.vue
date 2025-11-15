<template>
  <div class="home-page">
    <header class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Stories of Trinidad</h1>
        <p class="hero-subtitle">Discover the rich history of Trinidad through interactive audio tours</p>
      </div>
    </header>
    
    <main class="locations-grid-container">
      <div class="locations-grid">
        <h2 class="grid-title">Explore Locations</h2>
        
        <div class="grid">
          <div 
            v-for="location in locations"
            :key="location.id"
            class="location-card"
            @click="navigateToLocation(location.id)"
          >
            <div class="card-image">
              <img 
                :src="location.images[0]?.url || ''" 
                :alt="location.images[0]?.alt || ''"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ location.name }}</h3>
              <p class="card-description">{{ location.description }}</p>
              <div class="card-cta">
                <span>Start Audio Tour</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLocationsStore } from '@/stores/locations'

const router = useRouter()
const locationsStore = useLocationsStore()

const locations = computed(() => locationsStore.locations)

const navigateToLocation = (locationId: string) => {
  router.push({ name: 'location', params: { id: locationId } })
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--color-background);
}

.hero {
  background: linear-gradient(135deg, var(--color-rust) 0%, var(--color-terracotta) 100%);
  padding: var(--spacing-2xl) var(--spacing-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.hero-subtitle {
  font-family: var(--font-accent);
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
}

.locations-grid-container {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.locations-grid {
  max-width: 1200px;
  margin: 0 auto;
}

.grid-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  text-align: center;
  color: var(--color-deep-brown);
  margin-bottom: var(--spacing-2xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);
}

.location-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border);
}

.location-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-clay);
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-sand);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.location-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: var(--spacing-lg);
}

.card-title {
  font-family: var(--font-accent);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-deep-brown);
  margin-bottom: var(--spacing-sm);
}

.card-description {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.card-cta {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-rust);
  font-weight: 600;
  font-size: 0.95rem;
  transition: gap var(--transition-base);
}

.location-card:hover .card-cta {
  gap: var(--spacing-sm);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .hero {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .locations-grid-container {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .grid-title {
    font-size: 2rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>
