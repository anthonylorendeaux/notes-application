<script setup lang="ts">
import type { NuxtError } from '#app'
import { fr } from '@nuxt/ui/locale'

const props = defineProps<{ error: NuxtError }>()

useHead({
  htmlAttrs: {
    lang: 'fr'
  }
})

useSeoMeta({
  title: () => props.error.statusCode === 404 ? 'Page introuvable' : 'Erreur'
})
</script>

<template>
  <UApp :locale="fr">
    <UHeader
      title="Mes notes"
      to="/"
      :toggle="false"
      :ui="{ title: 'font-sans' }"
    >
      <template #right>
        <UColorModeButton class="min-h-11 min-w-11" />
      </template>
    </UHeader>

    <UError
      :error="error"
      :clear="{ label: 'Retour à l\'accueil' }"
      class="px-4 text-center"
    />
  </UApp>
</template>
