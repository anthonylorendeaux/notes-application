import type { ContentNavigationItem } from '@nuxt/content'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export const navigationKey: InjectionKey<ComputedRef<ContentNavigationItem[] | undefined>> = Symbol('navigation')
export const fullNavigationKey: InjectionKey<Ref<ContentNavigationItem[] | undefined>> = Symbol('full-navigation')

export interface FolderCardData {
  title: string
  path: string
  count: number
  description?: string
  // Already formatted date supplied by the caller (e.g. `formatNoteDate`).
  latest?: string
}

// A node is a folder when it only exists as a directory (`page: false`)
// or when it has descendants (a note doubling as a folder index).
export function isFolderNode(node: ContentNavigationItem): boolean {
  return node.page === false || (node.children?.length ?? 0) > 0
}

export function countNotes(node: ContentNavigationItem): number {
  const own = node.page === false ? 0 : 1
  return own + (node.children ?? []).reduce((total, child) => total + countNotes(child), 0)
}

// Folder cards carry a note count; the caller adds `latest` when it
// knows descendant note dates (the navigation tree has none).
export function toFolderCards(nodes: ContentNavigationItem[] = []): FolderCardData[] {
  return nodes
    .filter(isFolderNode)
    .map(node => ({
      title: node.title,
      path: node.path,
      count: countNotes(node)
    }))
}

export function findFolderNode(nodes: ContentNavigationItem[], path: string): ContentNavigationItem | undefined {
  for (const node of nodes) {
    if (node.path === path) return node
    const child = node.children && findFolderNode(node.children, path)
    if (child) return child
  }
}

export function buildBreadcrumbItems(nodes: ContentNavigationItem[] = [], path: string): { label: string, to?: string }[] {
  const items: { label: string, to?: string }[] = [{ label: 'Accueil', to: '/' }]
  const segments = path.split('/').filter(Boolean)
  let currentNodes = nodes
  let current = ''

  segments.forEach((segment, index) => {
    current += `/${segment}`
    const node = findFolderNode(currentNodes, current)
    // The current page is the last crumb and is not a link.
    const isLast = index === segments.length - 1
    items.push({ label: node?.title ?? segment, to: isLast ? undefined : current })
    currentNodes = node?.children ?? []
  })

  return items
}
