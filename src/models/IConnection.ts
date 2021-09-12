import { v4 } from 'uuid'
import { replaceAt } from '../utils/replaceAt'
import { IConfig } from './IConfig'
import { IGroup } from './IGroup'
import { deleteFromTree, saveTree } from './ITree'

export interface IConnection extends IGroup {
  brokers: string[]
  topic: string
}

export function getDefaultConnection(): IConnection {
  return {
    key: v4(),
    name: '',
    open: false,
    brokers: [],
    topic: '',
  }
}

export function isConnection(item?: IGroup): item is IConnection {
  return item !== undefined && 'brokers' in item
}

export function saveConnection(config: IConfig, item: IConnection, parent = 'root'): IConfig {
  const index = config.connections.findIndex((connection) => connection.key === item.key)
  const newConnection = { ...getDefaultConnection(), ...config.connections[index], ...item }
  const tree = saveTree(config.tree, newConnection.key, parent)
  return { ...config, tree, connections: replaceAt(config.connections, index, newConnection) }
}

export function deleteConnection(config: IConfig, item: IConnection, parent = 'root'): IConfig {
  const tree = deleteFromTree(config.tree, item.key, parent)
  return { ...config, tree, connections: config.connections.filter((connection) => connection.key !== item.key) }
}

export function copyConnection(config: IConfig, item: IConnection, parent = 'root'): IConfig {
  return saveConnection(config, { ...item, name: item.name + ' Copy', key: v4() }, parent)
}
