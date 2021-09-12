import { IConfig } from '../models/IConfig'
import { copyConnection, deleteConnection, IConnection, isConnection, saveConnection } from '../models/IConnection'
import { copyGroup, deleteGroup, IGroup, saveGroup } from '../models/IGroup'
import { ITree } from '../models/ITree'

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
  if (isConnection(item)) return saveConnection(config, item, parent)
  return saveGroup(config, item, parent)
}

function deleteItem(config: IConfig, item: IGroup | IConnection, parent = 'root'): IConfig {
  if (isConnection(item)) return deleteConnection(config, item, parent)
  return deleteGroup(config, item, parent)
}

function copyItem(config: IConfig, item: IGroup | IConnection, parent = 'root'): IConfig {
  if (isConnection(item)) return copyConnection(config, item, parent)
  return copyGroup(config, item, parent)
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
