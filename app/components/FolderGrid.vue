<script setup lang="ts">
import type { FolderCardData } from '~/utils/folder'

defineProps<{ folders: FolderCardData[] }>()
</script>

<template>
  <ul class="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
    <li
      v-for="folder in folders"
      :key="folder.path"
      class="border-b border-line"
    >
      <NuxtLink
        :to="folder.path"
        class="-mx-3 flex flex-col gap-1 rounded-md px-3 py-4 hover:bg-surface focus-visible:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      >
        <span class="flex min-w-0 items-center gap-3">
          <UIcon
            name="i-lucide-folder"
            class="size-5 shrink-0 text-muted"
          />
          <span class="truncate font-sans font-semibold text-ink">
            {{ folder.title }}
          </span>
        </span>

        <span class="flex flex-col gap-0.5 pl-8 text-sm text-muted sm:items-end sm:pl-0 sm:text-right">
          <span class="tabular-nums">{{ formatNoteCount(folder.count) }}</span>
          <span v-if="folder.latest">Mise à jour le {{ folder.latest }}</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
