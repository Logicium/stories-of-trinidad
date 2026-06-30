<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <SiteHeader />
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import './assets/main.css';

#app {
  min-height: 100vh;
  width: 100%;
}

/* Page route transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 360ms var(--ease), transform 360ms var(--ease);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
