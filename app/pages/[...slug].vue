<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[] | undefined>>('navigation')

const { data: page } = await useAsyncData(route.path, () => queryCollection('notes').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Note introuvable', fatal: true })
}

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
      />

      <UPageBody>
        <ContentRenderer :value="page" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
