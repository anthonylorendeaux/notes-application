<script setup lang="ts">
// Thin fixed reading-progress bar for note pages. SSR-safe: `window` and
// `document` are only touched inside `onMounted`. Updates are instant style
// writes driven by scrolling (no transition or animation), so there is
// nothing to disable under `prefers-reduced-motion`.
const progress = ref(0)

let frame = 0

function update() {
  frame = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    :class="progress > 0 ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
  >
    <div
      class="h-full origin-left bg-accent-500"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
