<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[] | undefined>>('navigation')

const { data: page } = await useAsyncData(route.path, () => queryCollection('notes').path(route.path).first())

// No note at this path: fall back to a folder index built from the navigation tree, else 404.
function findFolderNode(nodes: ContentNavigationItem[], path: string): ContentNavigationItem | undefined {
  for (const node of nodes) {
    if (node.path === path) return node
    const child = node.children && findFolderNode(node.children, path)
    if (child) return child
  }
}

const folder = computed(() => page.value ? undefined : findFolderNode(navigation?.value ?? [], route.path))

if (!page.value && !folder.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
}

// Previous/next note within the same folder only (queryCollectionItemSurroundings
// cannot filter by folder: it flattens the whole collection).
const { data: surround } = await useAsyncData(`${route.path}-surround`, async () => {
  const dir = route.path.replace(/\/[^/]+$/, '')
  if (!dir) {
    return [null, null] as unknown as ContentNavigationItem[]
  }

  const notes = await queryCollection('notes')
    .where('path', 'LIKE', `${dir}/%`)
    .order('stem', 'ASC')
    .select('path', 'title', 'description')
    .all()

  // Immediate folder only: same depth, subfolders excluded.
  const depth = route.path.split('/').filter(Boolean).length
  const siblings = notes.filter(note => note.path.split('/').filter(Boolean).length === depth)
  const index = siblings.findIndex(note => note.path === route.path)
  if (index === -1) {
    return [null, null] as unknown as ContentNavigationItem[]
  }

  return [siblings[index - 1] ?? null, siblings[index + 1] ?? null] as unknown as ContentNavigationItem[]
})

useSeoMeta({
  title: (page.value ?? folder.value)?.title,
  description: page.value?.description
})

const folderLinks = computed(() => folder.value?.children?.map(child => ({
  label: child.title,
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
            :to="`/_studio?redirect=${encodeURIComponent(route.path)}`"
            external
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <ContentRenderer :value="page" />

        <USeparator v-if="surround?.some(Boolean)" />

        <UContentSurround :surround="surround" />
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
