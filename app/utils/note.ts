import type { BlogPostProps } from '@nuxt/ui'

// Raw query rows: the collection has no schema, custom frontmatter
// fields live in the `meta` JSON column.
export interface NoteRow {
  path: string
  title: string
  description?: string | null
  body?: unknown
  meta?: {
    created?: string | Date
    category?: string
    [key: string]: unknown
  } | null
}

// Normalized note used by listing cards.
export interface NoteCardData {
  path: string
  title: string
  description?: string
  created?: string | Date
  category?: string
}

// Minimark node: `[tag, props, ...children]`, children being strings or nodes.
function minimarkText(node: unknown): string {
  if (typeof node === 'string') return node
  if (!Array.isArray(node)) return ''
  return node
    .slice(1)
    .filter(child => typeof child === 'string' || Array.isArray(child))
    .map(minimarkText)
    .join('')
}

// Plain-text excerpt built from the first text blocks of the note body.
export function noteExcerpt(body: unknown, maxLength = 160): string | undefined {
  const root = body as { type?: string, value?: unknown[] } | undefined
  if (!root || root.type !== 'minimark' || !Array.isArray(root.value)) return undefined

  const text = root.value
    .filter(node => Array.isArray(node) && ['p', 'ul', 'ol', 'blockquote'].includes(node[0] as string))
    .map(minimarkText)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!text) return undefined
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}…`
}

// `created` formats vary across notes: accept anything Date can parse.
// Timestamps without a timezone are treated as UTC so that every visitor
// (and the server) sees the same calendar day.
export function noteTimestamp(date: string | Date | number | null | undefined): number {
  if (!date) return 0
  if (typeof date === 'number') return date
  const value = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(date) && !/(Z|[+-]\d{2}:?\d{2})$/.test(date)
    ? `${date}Z`
    : date
  return new Date(value).getTime() || 0
}

export function formatNoteDate(date: string | Date | number | null | undefined): string | undefined {
  const timestamp = noteTimestamp(date)
  if (!timestamp) return undefined
  // UTC keeps the same calendar day on the server and the client.
  return new Date(timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function formatNoteCount(count: number): string {
  return `${count} note${count > 1 ? 's' : ''}`
}

// Normalize rows: frontmatter `description` wins over the auto-excerpt,
// and the body AST is dropped from the SSR payload.
export function toNoteCards(rows: NoteRow[]): NoteCardData[] {
  return rows.map(row => ({
    path: row.path,
    title: row.title,
    description: row.description || noteExcerpt(row.body),
    created: row.meta?.created,
    category: row.meta?.category
  }))
}

export function toBlogPost(note: NoteCardData): BlogPostProps {
  const timestamp = noteTimestamp(note.created)
  return {
    title: note.title,
    to: note.path,
    // A Date keeps the instant stable; UBlogPost formats it (medium date, UTC).
    date: timestamp ? new Date(timestamp) : undefined,
    badge: note.category ?? undefined,
    description: note.description
  }
}
