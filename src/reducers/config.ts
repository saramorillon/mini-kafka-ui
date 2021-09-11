import { IConfig } from '../models/IConfig'
import { copyConnection, deleteConnection, IConnection, isConnection, saveConnection } from '../models/IConnection'
import { copyGroup, deleteGroup, IGroup, saveGroup } from '../models/IGroup'
import { deleteFromTree, ITree, saveTree } from '../models/ITree'

export type Action =
  | { type: 'save'; item: IConnection; parent?: string }
  | { type: 'save'; item: IGroup; parent?: string }
  | { type: 'tree'; tree: ITree }
  | { type: 'delete'; item: IConnection; parent?: string }
  | { type: 'delete'; item: IGroup; parent?: string }
  | { type: 'copy'; item: IConnection; parent?: string }
  | { type: 'copy'; item: IGroup; parent?: string }
  | { type: 'open'; item: IConnection }
  | { type: 'close'; item: IConnection }
  | { type: 'toggle'; item: IGroup }

export function configReducer(config: IConfig, action: Action): IConfig {
  switch (action.type) {
    case 'save':
      return saveItem(config, action.item, action.parent)
    case 'tree':
      return { ...config, tree: action.tree }
    case 'delete':
      return deleteItem(config, action.item, action.parent)
    case 'copy':
      return copyItem(config, action.item, action.parent)
    case 'open':
      return openItem(config, action.item)
    case 'close':
      return closeItem(config, action.item)
    case 'toggle':
      return toggleItem(config, action.item)
  }
}

function saveItem(config: IConfig, item: IGroup | IConnection, parent = 'root'): IConfig {
  const connections = isConnection(item) ? saveConnection(config.connections, item) : config.connections
  const groups = !isConnection(item) ? saveGroup(config.groups, item) : config.groups
  const tree = saveTree(config.tree, item.key, parent)
  return { ...config, connections, groups, tree }
}

function deleteItem(config: IConfig, item: IGroup | IConnection, parent = 'root'): IConfig {
  const connections = isConnection(item) ? deleteConnection(config.connections, item) : config.connections
  const groups = !isConnection(item) ? deleteGroup(config.groups, item) : config.groups
  const tree = deleteFromTree(config.tree, item.key, parent)
  return closeItem({ ...config, connections, groups, tree }, item)
}

function copyItem(config: IConfig, item: IGroup | IConnection, parent = 'root'): IConfig {
  const connections = isConnection(item) ? copyConnection(config.connections, item) : config.connections
  const groups = !isConnection(item) ? copyGroup(config.groups, item) : config.groups
  const tree = saveTree(config.tree, item.key, parent)
  return { ...config, connections, groups, tree }
}

function openItem(config: IConfig, item: IGroup | IConnection): IConfig {
  return saveItem({ ...config, activeConnection: item.key }, { ...item, open: true })
}

function closeItem(config: IConfig, item: IGroup | IConnection): IConfig {
  return saveItem({ ...config, activeConnection: undefined }, { ...item, open: false })
}

function toggleItem(config: IConfig, item: IGroup): IConfig {
  return item.open ? closeItem(config, item) : openItem(config, item)
}
