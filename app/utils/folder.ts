import type { ContentNavigationItem } from '@nuxt/content'

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
