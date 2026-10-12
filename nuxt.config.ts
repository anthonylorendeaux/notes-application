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

  hooks: {
    // Notes without frontmatter: title from the leading H1 (removed from the body),
    // otherwise the file name as is; no automatic description.
    'content:file:afterParse'({ file, content }) {
      const frontmatter = file.body.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''

      if (!/^title:/m.test(frontmatter)) {
        const body = content.body as { value: unknown[][] }
        if (body.value[0]?.[0] === 'h1') {
          body.value.shift()
        } else {
          content.title = String(content.stem).split('/').pop()
        }
      }

      if (!/^description:/m.test(frontmatter)) {
        content.description = ''
      }
    }
  },

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
