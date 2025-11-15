<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&family=Cormorant+Garamond:wght@400;600;700&display=swap');
@import './assets/main.css';

#app {
  min-height: 100vh;
  width: 100%;
}
</style>
