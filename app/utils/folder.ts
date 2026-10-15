import type { ContentNavigationItem } from '@nuxt/content'

export interface FolderCardData {
  title: string
  path: string
  count: number
  description?: string
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

// Folder cards carry a note count and a short preview of their content.
export function toFolderCards(nodes: ContentNavigationItem[] = []): FolderCardData[] {
  return nodes
    .filter(isFolderNode)
    .map((node) => {
      const titles = (node.children ?? []).map(child => child.title)
      return {
        title: node.title,
        path: node.path,
        count: countNotes(node),
        description: titles.length > 3
          ? `${titles.slice(0, 3).join(' · ')}…`
          : titles.join(' · ')
      }
    })
}
