import { IConfig } from '../models/IConfig'
import { copyConnection, deleteConnection, IConnection, isConnection, saveConnection } from '../models/IConnection'
import { copyGroup, deleteGroup, IGroup, saveGroup } from '../models/IGroup'

export type Action =
  | { type: 'save'; item: IConnection }
  | { type: 'save'; item: IGroup }
  | { type: 'delete'; item: IConnection }
  | { type: 'delete'; item: IGroup }
  | { type: 'copy'; item: IConnection }
  | { type: 'copy'; item: IGroup }
  | { type: 'open'; item: IConnection }
  | { type: 'close'; item: IConnection }
  | { type: 'toggle'; item: IGroup }
  | { type: 'move'; item: IGroup; parent: string }

export function configReducer(config: IConfig, action: Action): IConfig {
  switch (action.type) {
    case 'save':
      return saveItem(config, action.item)
    case 'delete':
      return deleteItem(config, action.item)
    case 'copy':
      return copyItem(config, action.item)
    case 'open':
      return openItem(config, action.item)
    case 'close':
      return closeItem(config, action.item)
    case 'toggle':
      return toggleItem(config, action.item)
    case 'move':
      return saveItem(config, { ...action.item, parent: action.parent })
  }
}

function saveItem(config: IConfig, item: IGroup | IConnection): IConfig {
  if (isConnection(item)) return saveConnection(config, item)
  return saveGroup(config, item)
}

function deleteItem(config: IConfig, item: IGroup | IConnection): IConfig {
  if (isConnection(item)) return deleteConnection(config, item)
  return deleteGroup(config, item)
}

function copyItem(config: IConfig, item: IGroup | IConnection): IConfig {
  if (isConnection(item)) return copyConnection(config, item)
  return copyGroup(config, item)
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
