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

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('notes'))

// Search sections are loaded client-side only, never in the rendered HTML.
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('notes'), { server: false })

provide('navigation', navigation)
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
          :navigation="navigation"
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
