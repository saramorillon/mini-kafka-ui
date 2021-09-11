export type ITree = Record<'root' | string, string[]>

export function saveTree(tree: ITree, key: string, parent: string): ITree {
  return { ...tree, [parent]: Array.from(new Set([...tree[parent], key])) }
}

export function deleteFromTree(tree: ITree, key: string, parent: string): ITree {
  return { ...tree, [parent]: tree[parent].filter((child) => child !== key) }
}
