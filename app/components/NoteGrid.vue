<script setup lang="ts">
import type { NoteCardData } from '~/utils/note'

defineProps<{ notes: NoteCardData[] }>()
</script>

<template>
  <ul>
    <li
      v-for="note in notes"
      :key="note.path"
      class="border-b border-line"
    >
      <NuxtLink
        :to="note.path"
        class="flex gap-4 py-4 hover:bg-surface focus-visible:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span
          v-if="formatNoteDate(note.created)"
          class="hidden w-28 shrink-0 text-muted tabular-nums sm:block"
        >
          {{ formatNoteDate(note.created) }}
        </span>

        <span class="min-w-0 flex-1">
          <span
            v-if="formatNoteDate(note.created)"
            class="mb-1 block text-sm text-muted sm:hidden"
          >
            {{ formatNoteDate(note.created) }}
          </span>

          <span class="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span class="font-sans text-lg font-semibold text-ink">
              {{ note.title }}
            </span>
            <UBadge
              v-if="note.category"
              color="neutral"
              variant="subtle"
              :label="note.category"
            />
          </span>

          <span
            v-if="note.description"
            class="mt-1 block line-clamp-1 text-muted"
          >
            {{ note.description }}
          </span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
