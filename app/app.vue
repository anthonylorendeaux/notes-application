<script setup lang="ts">
import { fr } from '@nuxt/ui/locale'
import { fullNavigationKey, navigationKey } from '~/utils/folder'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'noindex, nofollow' }
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
  const [category] = route.path.replace(/\/+$/, '').split('/').filter(Boolean)
  return category
    ? navigation.value?.filter(item => item.path === `/${category}`)
    : navigation.value
})

// Search sections are loaded client-side only, never in the rendered HTML.
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('notes'), { server: false })

provide(navigationKey, sectionNavigation)
provide(fullNavigationKey, navigation)
</script>

<template>
  <UApp :locale="fr">
    <NuxtLoadingIndicator />

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-surface focus:px-4 focus:py-3 focus:font-sans focus:text-accent"
    >
      Aller au contenu
    </a>

    <UHeader
      title="Mes notes"
      to="/"
      :toggle="{ class: 'min-h-11 min-w-11' }"
      :ui="{ title: 'font-sans' }"
    >
      <UContentSearchButton
        label="Rechercher"
        :collapsed="false"
        class="min-h-11"
      />

      <template #right>
        <UContentSearchButton
          label="Rechercher"
          class="min-h-11 min-w-11 lg:hidden"
        />

        <UColorModeButton class="min-h-11 min-w-11" />
      </template>

      <template #body>
        <UButton
          v-if="sectionNavigation !== navigation"
          to="/"
          icon="i-lucide-arrow-left"
          label="Tous les dossiers"
          color="neutral"
          variant="link"
          class="mb-2 px-0 font-sans"
        />

        <UContentNavigation
          :navigation="sectionNavigation"
          highlight
          aria-label="Navigation des notes"
          class="font-sans"
          :ui="{ link: 'min-h-11' }"
        />
      </template>
    </UHeader>

    <UMain id="main-content">
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
