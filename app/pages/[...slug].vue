<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[] | undefined>>('navigation')

const { data: page } = await useAsyncData(route.path, () => queryCollection('notes').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Note introuvable', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('notes', route.path, { fields: ['description'] })
)

useSeoMeta({
  title: page.value.title,
  description: page.value.description
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
            :to="`/_studio?redirect=${encodeURIComponent(route.path)}`"
            external
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <ContentRenderer :value="page" />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="page.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="page.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
