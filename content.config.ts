import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    notes: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        created: z.union([z.string(), z.date()]).optional(),
        category: z.string().optional(),
        tags: z.union([z.array(z.string()), z.string()]).optional()
      })
    })
  }
})
