<script setup lang="ts">
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

const title = 'Mes notes'
const description = 'Mes notes personnelles en Markdown.'

useSeoMeta({
  titleTemplate: `%s · ${title}`,
  description,
  ogTitle: title,
  ogDescription: description
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('notes'))

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <UHeader title="Mes notes">
      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/anthonylorendeaux/notes-application"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
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

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Mes notes • © {{ new Date().getFullYear() }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
