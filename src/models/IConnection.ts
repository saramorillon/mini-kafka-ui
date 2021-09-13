import { v4 } from 'uuid'
import { replaceAt } from '../utils/replaceAt'
import { IConfig } from './IConfig'
import { IGroup } from './IGroup'

export interface IConnection extends IGroup {
  brokers: string[]
  topic: string
}

export function getDefaultConnection(): IConnection {
  return {
    key: v4(),
    name: '',
    parent: 'root',
    open: false,
    brokers: [],
    topic: '',
  }
}

export function isConnection(item?: IGroup): item is IConnection {
  return item !== undefined && 'brokers' in item
}

export function saveConnection(config: IConfig, item: IConnection): IConfig {
  const index = config.connections.findIndex((connection) => connection.key === item.key)
  const newConnection = { ...getDefaultConnection(), ...config.connections[index], ...item }
  return { ...config, connections: replaceAt(config.connections, index, newConnection) }
}

export function deleteConnection(config: IConfig, item: IConnection): IConfig {
  return { ...config, connections: config.connections.filter((connection) => connection.key !== item.key) }
}

export function copyConnection(config: IConfig, item: IConnection): IConfig {
  return saveConnection(config, { ...item, name: item.name + ' Copy', key: v4() })
}
