<script setup lang="ts">
import type { NoteCardData } from '~/utils/note'

const props = defineProps<{ notes: NoteCardData[] }>()

const posts = computed(() => props.notes.map(toBlogPost))
</script>

<template>
  <UBlogPosts :posts="posts" />
</template>
