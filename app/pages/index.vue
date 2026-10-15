<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NoteRow } from '~/utils/note'

const navigation = inject<Ref<ContentNavigationItem[] | undefined>>('navigation')

// Latest notes across every folder.
const { data: recentNotes } = await useAsyncData('home-notes', async () => {
  const rows = await queryCollection('notes')
    .select('path', 'title', 'description', 'body', 'meta')
    .all() as NoteRow[]

  return toNoteCards(rows)
    .sort((a, b) => noteTimestamp(b.created) - noteTimestamp(a.created))
    .slice(0, 9)
})

const folders = computed(() => toFolderCards(navigation?.value))

useSeoMeta({
  title: 'Mes notes',
  description: 'Mes notes personnelles en Markdown.'
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Mes notes"
        description="Mes notes personnelles en Markdown."
      >
        <template #links>
          <UContentSearchButton
            :collapsed="false"
            label="Rechercher une note"
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <section class="mb-12">
          <h2 class="mb-4 text-xl font-semibold text-highlighted">
            Dernières notes
          </h2>

          <NoteGrid :notes="recentNotes ?? []" />
        </section>

        <section>
          <h2 class="mb-4 text-xl font-semibold text-highlighted">
            Parcourir les dossiers
          </h2>

          <FolderGrid :folders="folders" />
        </section>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
