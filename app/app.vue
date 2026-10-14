<script setup lang="ts">
import { fr } from '@nuxt/ui/locale'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('notes'))

// Sidebar scoped to the current category; full tree on the home page.
const sectionNavigation = computed(() => {
  const [category] = route.path.split('/').filter(Boolean)
  return category
    ? navigation.value?.filter(item => item.path === `/${category}`)
    : navigation.value
})

// Search sections are loaded client-side only, never in the rendered HTML.
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('notes'), { server: false })

provide('navigation', sectionNavigation)
</script>

<template>
  <UApp :locale="fr">
    <UHeader
      title="Mes notes"
      to="/"
    >
      <template #right>
        <UContentSearchButton />

        <UColorModeButton />
      </template>

      <template #body>
        <UContentNavigation
          :navigation="sectionNavigation"
          highlight
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <ClientOnly>
      <UContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
