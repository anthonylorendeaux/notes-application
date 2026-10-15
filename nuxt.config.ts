// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // AI stays disabled: no AI_GATEWAY_API_KEY nor studio.ai.apiKey.
  studio: {
    repository: {
      provider: 'github',
      owner: 'anthonylorendeaux',
      repo: 'notes-application',
      branch: 'main'
    },
    i18n: {
      defaultLocale: 'fr'
    }
  }
})
