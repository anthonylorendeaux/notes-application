<script setup lang="ts">
import type { NoteRow } from '~/utils/note'
import { navigationKey } from '~/utils/folder'

const navigation = inject(navigationKey)

// Every note row, fetched once: only the 3 latest notes parse their body AST,
// while the total count and per-folder dates are computed before dropping rows.
const { data: homeData } = await useAsyncData('home-notes', async () => {
  const rows = await queryCollection('notes')
    .select('path', 'title', 'description', 'body', 'created', 'category', 'meta')
    .all() as NoteRow[]

  const latestByFolder: Record<string, string> = {}
  const maxByFolder = new Map<string, number>()
  for (const row of rows) {
    const [segment] = row.path.split('/').filter(Boolean)
    if (!segment) continue
    const key = `/${segment}`
    const timestamp = noteTimestamp(rowCreated(row))
    if (timestamp > (maxByFolder.get(key) ?? 0)) maxByFolder.set(key, timestamp)
  }
  for (const [key, timestamp] of maxByFolder) {
    const formatted = formatNoteDate(timestamp)
    if (formatted) latestByFolder[key] = formatted
  }

  const latestRows = [...rows]
    .sort((a, b) => noteTimestamp(rowCreated(b)) - noteTimestamp(rowCreated(a)))
    .slice(0, 3)

  return {
    recentNotes: toNoteCards(latestRows),
    totalCount: rows.length,
    latestByFolder
  }
})

const recentNotes = computed(() => homeData.value?.recentNotes ?? [])
const totalCount = computed(() => homeData.value?.totalCount ?? 0)

const folders = computed(() =>
  toFolderCards(navigation?.value).map(folder => ({
    ...folder,
    latest: homeData.value?.latestByFolder[folder.path]
  }))
)

useSeoMeta({
  title: 'Mes notes',
  description: 'Notes techniques, classées par dossier.'
})
</script>

<template>
  <UContainer class="max-w-5xl">
    <header class="mb-12 md:mb-16">
      <h1 class="font-sans text-[39px] font-bold leading-[1.1] text-ink md:text-5xl">
        Mes notes
      </h1>

      <p class="mt-3 text-lg text-muted md:text-xl">
        Notes techniques, classées par dossier.
      </p>

      <p class="mt-2 text-sm text-muted">
        {{ formatNoteCount(totalCount) }}
      </p>
    </header>

    <section
      aria-labelledby="latest-notes"
      class="mb-12 md:mb-16"
    >
      <h2
        id="latest-notes"
        class="mb-4 font-sans text-[25px] font-semibold text-ink"
      >
        Dernières notes
      </h2>

      <NoteGrid
        v-if="recentNotes.length"
        :notes="recentNotes"
      />
      <p
        v-else
        class="text-muted"
      >
        Aucune note pour le moment. Créez-en une depuis Studio.
      </p>
    </section>

    <section aria-labelledby="folders">
      <h2
        id="folders"
        class="mb-4 font-sans text-[25px] font-semibold text-ink"
      >
        Dossiers
      </h2>

      <FolderGrid
        v-if="folders.length"
        :folders="folders"
      />
      <p
        v-else
        class="text-muted"
      >
        Aucun dossier pour le moment.
      </p>
    </section>
  </UContainer>
</template>
