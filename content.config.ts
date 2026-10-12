import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    notes: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  }
})
