<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Plus } from 'lucide-vue-next'

interface Props {
  text: string
  autoExpand?: boolean
}
const props = defineProps<Props>()

const isExpanded = ref(false)
const contentElement = ref<HTMLElement | null>(null)

const paragraphs = computed(() => props.text.split('\n\n').filter((p) => p.trim()))

// The first line of each transcript is the building name + address (shown in the
// hero already) — surface it as a quiet lead, and read the rest as the story.
const lead = computed(() => paragraphs.value[0] ?? '')
const body = computed(() => paragraphs.value.slice(1))

watch(
  () => props.autoExpand,
  (v) => {
    if (v !== undefined) isExpanded.value = v
  },
)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  if (!isExpanded.value && contentElement.value) {
    setTimeout(() => {
      contentElement.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }
}
</script>

<template>
  <div class="transcript" ref="contentElement">
    <div class="t-head" v-reveal>
      <span class="eyebrow eyebrow--brass">The Story</span>
      <p class="t-lead">{{ lead }}</p>
    </div>

    <div class="t-body" :class="{ collapsed: !isExpanded }">
      <p
        v-for="(paragraph, index) in body"
        :key="index"
        class="t-para"
        :class="{ 'has-dropcap': index === 0 }"
      >
        {{ paragraph }}
      </p>
      <div v-if="!isExpanded" class="t-fade"></div>
    </div>

    <button class="t-toggle" @click="toggleExpanded" :aria-expanded="isExpanded">
      <span class="t-toggle-ic" :class="{ open: isExpanded }">
        <Plus :size="16" :stroke-width="2" />
      </span>
      <span>{{ isExpanded ? 'Show less' : 'Read the full story' }}</span>
    </button>
  </div>
</template>

<style scoped>
.transcript { scroll-margin-top: 5rem; }

.t-head { margin-bottom: 2.25rem; }
.t-head .eyebrow { display: block; margin-bottom: 1rem; }
.t-lead {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  line-height: 1.35;
  color: var(--ink);
  margin: 0;
}

.t-body {
  position: relative;
  overflow: hidden;
  transition: max-height var(--t-slow);
}
.t-body.collapsed { max-height: 19rem; }
.t-body:not(.collapsed) { max-height: 1000rem; }

.t-para {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: 1.075rem;
  line-height: 1.85;
  color: var(--ink-2);
  margin-bottom: 1.5rem;
}
.t-para:last-of-type { margin-bottom: 0; }

/* Editorial drop cap on the opening paragraph */
.has-dropcap::first-letter {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 4.4rem;
  line-height: 0.78;
  float: left;
  margin: 0.34rem 0.7rem 0 0;
  color: var(--brass);
}

.t-fade {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 7rem;
  background: linear-gradient(to bottom, rgba(242, 236, 225, 0), var(--paper) 92%);
  pointer-events: none;
}

.t-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 2.25rem;
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  transition: color var(--t-fast);
}
.t-toggle:hover { color: var(--brass); }
.t-toggle-ic {
  display: grid;
  place-items: center;
  width: 34px; height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line-2);
  transition: transform var(--t), border-color var(--t-fast), background var(--t-fast), color var(--t-fast);
}
.t-toggle:hover .t-toggle-ic { border-color: var(--brass); background: var(--brass); color: #fff; }
.t-toggle-ic.open { transform: rotate(45deg); }

@media (max-width: 560px) {
  .t-para { font-size: 1.02rem; line-height: 1.8; }
  .has-dropcap::first-letter { font-size: 3.6rem; }
}
</style>
