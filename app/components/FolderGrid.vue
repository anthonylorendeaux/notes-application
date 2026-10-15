<script setup lang="ts">
import type { FolderCardData } from '~/utils/folder'

defineProps<{ folders: FolderCardData[] }>()
</script>

<template>
  <UPageGrid>
    <UPageCard
      v-for="folder in folders"
      :key="folder.path"
      :to="folder.path"
      icon="i-lucide-folder"
      :title="folder.title"
      :description="folder.description"
      spotlight
    >
      <template #footer>
        <UBadge
          color="neutral"
          variant="subtle"
          icon="i-lucide-file-text"
          :label="formatNoteCount(folder.count)"
        />
      </template>
    </UPageCard>
  </UPageGrid>
</template>
