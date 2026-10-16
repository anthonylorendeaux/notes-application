<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NoteRow } from '~/utils/note'

const navigation = inject<Ref<ContentNavigationItem[] | undefined>>('navigation')

// Same shared state as UContentSearchButton: setting `open` shows the
// search modal defined in app.vue (Meta+K toggles the same ref).
const { open } = useContentSearch()

// Every note row, fetched once: the latest notes, the total count and the
// per-folder dates below all derive from it.
const { data: allNotes } = await useAsyncData('home-notes', async () => {
  const rows = await queryCollection('notes')
    .select('path', 'title', 'description', 'body', 'meta')
    .all() as NoteRow[]

  return toNoteCards(rows)
})

const notes = computed(() => allNotes.value ?? [])

const recentNotes = computed(() =>
  [...notes.value]
    .sort((a, b) => noteTimestamp(b.created) - noteTimestamp(a.created))
    .slice(0, 3)
)

const folders = computed(() => {
  const latestByFolder = new Map<string, number>()
  for (const note of notes.value) {
    const [segment] = note.path.split('/').filter(Boolean)
    if (!segment) continue
    const key = `/${segment}`
    const timestamp = noteTimestamp(note.created)
    if (timestamp > (latestByFolder.get(key) ?? 0)) latestByFolder.set(key, timestamp)
  }

  return toFolderCards(navigation?.value).map(folder => ({
    ...folder,
    latest: formatNoteDate(latestByFolder.get(folder.path) ?? 0)
  }))
})

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
        {{ formatNoteCount(notes.length) }}
      </p>

      <button
        type="button"
        aria-keyshortcuts="meta+k"
        class="mt-8 flex w-full max-w-[640px] items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3.5 text-left transition-colors hover:border-muted"
        @click="open = true"
      >
        <UIcon
          name="i-lucide-search"
          class="size-5 shrink-0 text-muted"
        />
        <span class="flex-1 truncate text-muted">
          Rechercher une note…
        </span>
        <span
          class="hidden items-center gap-1 sm:flex"
          aria-hidden="true"
        >
          <UKbd>⌘</UKbd>
          <UKbd>K</UKbd>
        </span>
      </button>
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
