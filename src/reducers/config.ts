import { IConfig } from '../models/IConfig'
import { IConnection, isConnection } from '../models/IConnection'
import { deleteServer, IServer, saveServer } from '../models/IServer'
import { replaceAt } from '../utils/replaceAt'

export type Action =
  | { type: 'save'; item: IServer }
  | { type: 'delete'; item: IServer }
  | { type: 'open'; item: IServer }
  | { type: 'open'; item: IConnection }
  | { type: 'close'; item: IServer }
  | { type: 'close'; item: IConnection }

export function configReducer(config: IConfig, action: Action): IConfig {
  switch (action.type) {
    case 'save':
      return saveItem(config, action.item)
    case 'delete':
      return deleteItem(config, action.item)
    case 'open':
      return openItem(config, action.item)
    case 'close':
      return closeItem(config, action.item)
  }
}

function saveItem(config: IConfig, item: IServer): IConfig {
  return openItem(saveServer(config, item), item)
}

function deleteItem(config: IConfig, item: IServer): IConfig {
  return closeItem(deleteServer(config, item), item)
}

function openItem(config: IConfig, item: IServer | IConnection): IConfig {
  const index = findIndex(config, item)
  return { ...config, openItems: replaceAt(config.openItems, index, item), activeItem: item.key }
}

function closeItem(config: IConfig, item: IServer | IConnection): IConfig {
  const index = findIndex(config, item)
  let activeItem = config.activeItem
  if (config.activeItem === item.key) {
    activeItem = (config.openItems[index - 1] || config.openItems[index + 1])?.key
  }
  return { ...config, openItems: replaceAt(config.openItems, index), activeItem }
}

function findIndex(config: IConfig, item: IServer | IConnection): number {
  return config.openItems.findIndex((openItem) => {
    return (isConnection(openItem) && isConnection(item) && openItem.topic === item.topic) || openItem.key === item.key
  })
}
