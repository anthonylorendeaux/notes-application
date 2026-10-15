<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

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
  // The root has no folder node in the navigation tree: build its index
  // from the top-level navigation (auto-generated home page).
  if (path === '/') {
    return { title: 'Accueil', path: '/', children: navigation?.value }
  }
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
  if (path === '/') return 'Mes notes personnelles en Markdown.'
  if (folder.value) return `Notes et sous-dossiers du dossier « ${folder.value.title} ».`
  return undefined
})

useSeoMeta({
  title: (page.value ?? folder.value)?.title,
  description: description.value
})

const folderLinks = computed(() => folder.value?.children?.map(child => ({
  label: child.title,
  icon: child.page === false ? 'i-lucide-folder' : 'i-lucide-file-text',
  to: child.path
})) ?? [])
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

      <UPageHeader :title="folder.title" />

      <UPageBody>
        <UPageLinks :links="folderLinks" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
