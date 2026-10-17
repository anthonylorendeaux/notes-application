<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NoteRow } from '~/utils/note'
import { fullNavigationKey, navigationKey } from '~/utils/folder'

const route = useRoute()
const navigation = inject(navigationKey)
const fullNavigation = inject(fullNavigationKey)

// Trailing slashes would break every path lookup below.
const path = route.path.replace(/\/+$/, '') || '/'

const { data: page } = await useAsyncData(`note:${path}`, () => queryCollection('notes').path(path).first())

// No note at this path: fall back to a folder index built from the navigation tree, else 404.
const folder = computed(() => {
  if (page.value) return undefined
  return findFolderNode(fullNavigation?.value ?? navigation?.value ?? [], path)
})

if (!page.value && !folder.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
}

// Previous/next note within the immediate folder only (queryCollectionItemSurroundings
// cannot filter by folder: it flattens the whole collection).
const surroundPromise = useAsyncData(`surround:${path}`, async (): Promise<[ContentNavigationItem | null, ContentNavigationItem | null]> => {
  // Folder index pages have no previous/next note.
  if (!page.value) {
    return [null, null]
  }

  const dir = path.replace(/\/[^/]+$/, '')

  // LIKE is only a prefilter ('_' and '%' are wildcards in slugs):
  // the real folder check happens on exact path segments below.
  const notes = await queryCollection('notes')
    .where('path', 'LIKE', dir ? `${dir}/%` : '/%')
    .order('stem', 'ASC')
    .select('path', 'title', 'description')
    .all()

  // Immediate folder only, subfolders excluded; '' matches root-level notes.
  const prefix = dir ? `${dir}/` : '/'
  const siblings = notes.filter((note) => {
    const rest = note.path.slice(prefix.length)
    return rest !== '' && !rest.includes('/')
  })
  const index = siblings.findIndex(note => note.path === path)
  if (index === -1) {
    return [null, null]
  }

  return [siblings[index - 1] ?? null, siblings[index + 1] ?? null]
})

// Folder index cards need note metadata (date, category, excerpt) and the
// header shows stats computed over every descendant note.
const folderPromise = useAsyncData(`folder:${path}`, async () => {
  if (!folder.value) return null

  const prefix = `${folder.value.path}/`

  // LIKE is only a prefilter ('_' and '%' are wildcards in slugs):
  // the real folder check happens on exact path segments below.
  const rows = await queryCollection('notes')
    .where('path', 'LIKE', `${prefix}%`)
    .order('stem', 'ASC')
    .select('path', 'title', 'description', 'body', 'created', 'category', 'meta')
    .all() as NoteRow[]

  // Immediate children only: deeper rows belong to sub-folder indexes.
  const notes = rows.filter(row => !row.path.slice(prefix.length).includes('/'))

  const latestTimestamp = rows.reduce((max, row) => Math.max(max, noteTimestamp(rowCreated(row))), 0)

  // Latest note date per immediate sub-folder, for the folder cards below.
  // Rows hold every descendant: a row belongs to a child when it is the
  // child note itself or lives under its path.
  const latestByFolder: Record<string, string> = {}
  for (const child of folder.value.children ?? []) {
    if (!isFolderNode(child)) continue
    const childPrefix = `${child.path}/`
    const childLatest = rows.reduce((max, row) => row.path === child.path || row.path.startsWith(childPrefix)
      ? Math.max(max, noteTimestamp(rowCreated(row)))
      : max, 0)
    const formatted = formatNoteDate(childLatest)
    if (formatted) latestByFolder[child.path] = formatted
  }

  return { notes: toNoteCards(notes), count: rows.length, latest: formatNoteDate(latestTimestamp), latestByFolder }
})

const [{ data: surround }, { data: folderData }] = await Promise.all([surroundPromise, folderPromise])

// UContentSurround hides a missing side, but its prop type does not admit
// nulls: queryCollectionItemSurroundings makes the same compromise.
const surroundLinks = computed(() => surround.value as unknown as ContentNavigationItem[])

const description = computed(() => {
  if (page.value?.description) return page.value.description
  if (folder.value) return `Notes et sous-dossiers du dossier « ${folder.value.title} ».`
  return undefined
})

// The header repeats the description above the body: hide it when it only
// duplicates the start of the first paragraph (a simple normalized-prefix
// check; duplicated descriptions are cleaned up in the content itself).
const headerDescription = computed(() => {
  const raw = page.value?.description
  if (!raw) return undefined
  const excerpt = page.value?.body ? noteExcerpt(page.value.body) : undefined
  if (!excerpt) return raw
  const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, ' ').trim()
  const normalizedDescription = normalize(raw)
  const excerptStart = normalize(excerpt).replace(/…$/, '')
  if (!excerptStart) return raw
  if (excerptStart.startsWith(normalizedDescription) || normalizedDescription.startsWith(excerptStart)) {
    return undefined
  }
  return raw
})

const subFolders = computed(() => toFolderCards(folder.value?.children).map(card => ({
  ...card,
  latest: folderData.value?.latestByFolder[card.path]
})))

const breadcrumbItems = computed(() => buildBreadcrumbItems(fullNavigation?.value ?? navigation?.value ?? [], path))

const pageCreated = computed(() => page.value ? formatNoteDate(rowCreated(page.value as NoteRow)) : undefined)
const pageCategory = computed(() => page.value ? (page.value as NoteRow).category ?? (page.value as NoteRow).meta?.category : undefined)

useSeoMeta({
  title: () => (page.value ?? folder.value)?.title,
  description: () => description.value
})
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <ReadingProgress />

      <template #left>
        <UPageAside>
          <UButton
            to="/"
            icon="i-lucide-arrow-left"
            label="Tous les dossiers"
            color="neutral"
            variant="link"
            class="mb-2 px-0 font-sans"
          />

          <UContentNavigation
            :navigation="navigation"
            highlight
          />
        </UPageAside>
      </template>

      <UPageHeader
        :title="page.title"
        :description="headerDescription"
      >
        <template #headline>
          <UBreadcrumb :items="breadcrumbItems" />
        </template>

        <template #links>
          <UBadge
            v-if="pageCategory"
            color="neutral"
            variant="subtle"
            :label="pageCategory"
          />

          <UBadge
            v-if="pageCreated"
            color="neutral"
            variant="subtle"
            icon="i-lucide-calendar"
            :label="pageCreated"
          />

          <UButton
            icon="i-lucide-pencil"
            color="neutral"
            variant="outline"
            size="sm"
            aria-label="Modifier"
            :to="`/_studio?redirect=${encodeURIComponent(path)}`"
            external
          >
            <span class="hidden sm:inline">Modifier</span>
          </UButton>
        </template>
      </UPageHeader>

      <UContentToc
        v-if="page.body?.toc?.links?.length"
        :links="page.body.toc.links"
        title="Sommaire"
        class="lg:hidden"
      />

      <UPageBody>
        <!-- eslint-disable-next-line better-tailwindcss/no-unknown-classes -- Custom reading styles from main.css, not a Tailwind utility -->
        <div class="prose-note">
          <ContentRenderer :value="page" />
        </div>

        <USeparator v-if="surround?.some(Boolean)" />

        <UContentSurround :surround="surroundLinks" />
      </UPageBody>

      <template
        v-if="page.body?.toc?.links?.length"
        #right
      >
        <div class="hidden lg:block">
          <UContentToc :links="page.body.toc.links" />
        </div>
      </template>
    </UPage>

    <UPage v-else-if="folder">
      <template #left>
        <UPageAside>
          <UButton
            to="/"
            icon="i-lucide-arrow-left"
            label="Tous les dossiers"
            color="neutral"
            variant="link"
            class="mb-2 px-0 font-sans"
          />

          <UContentNavigation
            :navigation="navigation"
            highlight
          />
        </UPageAside>
      </template>

      <UPageHeader
        :title="folder.title"
        :description="description"
      >
        <template #headline>
          <UBreadcrumb :items="breadcrumbItems" />
        </template>

        <template #links>
          <UBadge
            color="neutral"
            variant="subtle"
            icon="i-lucide-file-text"
            :label="formatNoteCount(folderData?.count ?? 0)"
          />

          <UBadge
            v-if="folderData?.latest"
            color="neutral"
            variant="subtle"
            icon="i-lucide-clock"
            :label="`Mise à jour le ${folderData.latest}`"
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <FolderGrid
          v-if="subFolders.length"
          :folders="subFolders"
          class="mb-8"
        />

        <NoteGrid
          v-if="folderData?.notes?.length"
          :notes="folderData.notes"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
