<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NoteRow } from '~/utils/note'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[] | undefined>>('navigation')

// Trailing slashes would break every path lookup below.
const path = route.path.replace(/\/+$/, '') || '/'

const { data: page } = await useAsyncData(path, () => queryCollection('notes').path(path).first())

// No note at this path: fall back to a folder index built from the navigation tree, else 404.
function findFolderNode(nodes: ContentNavigationItem[], path: string): ContentNavigationItem | undefined {
  for (const node of nodes) {
    if (node.path === path) return node
    const child = node.children && findFolderNode(node.children, path)
    if (child) return child
  }
}

const folder = computed(() => {
  if (page.value) return undefined
  return findFolderNode(navigation?.value ?? [], path)
})

if (!page.value && !folder.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
}

// Previous/next note within the immediate folder only (queryCollectionItemSurroundings
// cannot filter by folder: it flattens the whole collection).
const { data: surround } = await useAsyncData(`${path}-surround`, async (): Promise<[ContentNavigationItem | null, ContentNavigationItem | null]> => {
  // Folder index pages have no previous/next note.
  if (folder.value) {
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

// UContentSurround hides a missing side, but its prop type does not admit
// nulls: queryCollectionItemSurroundings makes the same compromise.
const surroundLinks = computed(() => surround.value as unknown as ContentNavigationItem[])

const description = computed(() => {
  if (page.value?.description) return page.value.description
  if (folder.value) return `Notes et sous-dossiers du dossier « ${folder.value.title} ».`
  return undefined
})

// Folder index cards need note metadata (date, category, excerpt) and the
// header shows stats computed over every descendant note.
const { data: folderData } = await useAsyncData(`${path}-index`, async () => {
  if (!folder.value) return null

  const prefix = `${folder.value.path}/`

  // LIKE is only a prefilter ('_' and '%' are wildcards in slugs):
  // the real folder check happens on exact path segments below.
  const rows = await queryCollection('notes')
    .where('path', 'LIKE', `${prefix}%`)
    .order('stem', 'ASC')
    .select('path', 'title', 'description', 'body', 'meta')
    .all() as NoteRow[]

  // Immediate children only: deeper rows belong to sub-folder indexes.
  const notes = rows.filter(row => !row.path.slice(prefix.length).includes('/'))

  const latestTimestamp = rows.reduce((max, row) => Math.max(max, noteTimestamp(row.meta?.created)), 0)

  return { notes: toNoteCards(notes), count: rows.length, latest: formatNoteDate(latestTimestamp) }
})

const subFolders = computed(() => toFolderCards(folder.value?.children))

const breadcrumbItems = computed(() => {
  if (!folder.value) return []

  const items: { label: string, to?: string }[] = [{ label: 'Accueil', to: '/' }]
  const segments = folder.value.path.split('/').filter(Boolean)
  let nodes = navigation?.value ?? []
  let current = ''

  segments.forEach((segment, index) => {
    current += `/${segment}`
    const node = findFolderNode(nodes, current)
    // The current page is the last crumb and is not a link.
    const isLast = index === segments.length - 1
    items.push({ label: node?.title ?? segment, to: isLast ? undefined : current })
    nodes = node?.children ?? []
  })

  return items
})

useSeoMeta({
  title: (page.value ?? folder.value)?.title,
  description: description.value
})
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <template #left>
        <UPageAside>
          <UContentNavigation
            :navigation="navigation"
            highlight
          />
        </UPageAside>
      </template>

      <UPageHeader
        :title="page.title"
        :description="page.description"
      >
        <template #links>
          <UButton
            label="Modifier"
            icon="i-lucide-pencil"
            color="neutral"
            variant="outline"
            :to="`/_studio?redirect=${encodeURIComponent(path)}`"
            external
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <ContentRenderer :value="page" />

        <USeparator v-if="surround?.some(Boolean)" />

        <UContentSurround :surround="surroundLinks" />
      </UPageBody>

      <template
        v-if="page.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="page.body.toc.links" />
      </template>
    </UPage>

    <UPage v-else-if="folder">
      <template #left>
        <UPageAside>
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

        <NoteGrid :notes="folderData?.notes ?? []" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
