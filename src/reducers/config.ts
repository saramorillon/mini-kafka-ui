import { v4 } from 'uuid'
import { IConfig } from '../models/IConfig'
import { IConnection } from '../models/IConnection'
import { IGroup } from '../models/IGroup'

export type Action<T extends IGroup = IGroup> =
  | { type: 'save'; key?: string; connection: Partial<T> }
  | { type: 'delete'; key: string }
  | { type: 'copy'; key: string }
  | { type: 'open'; key: string }
  | { type: 'close'; key: string }

export function configReducer(config: IConfig, action: Action): IConfig {
  switch (action.type) {
    case 'save':
      return saveItem(config, action.connection, action.key)
    case 'delete':
      return deleteItem(config, action.key)
    case 'copy':
      return copyItem(config, action.key)
    case 'open':
      return openItem(config, action.key)
    case 'close':
      return closeItem(config, action.key)
  }
}

const defaultConnection: IConnection = {
  key: '',
  name: '',
  brokers: [],
  topic: '',
  open: false,
}

function replaceAt<T>(array: T[], index: number, item: T) {
  if (index === -1) return [...array, item]
  return [...array.slice(0, Number(index)), item, ...array.slice(Number(index) + 1)]
}

function saveItem(config: IConfig, connection: Partial<IConnection>, key: string = v4()): IConfig {
  const index = config.connections.findIndex((connection) => connection.key === key)
  const newConnection = { ...defaultConnection, ...config.connections[index], ...connection, key }
  const connections = replaceAt(config.connections, index, newConnection)
  if (index === -1) return openItem({ ...config, connections }, key)
  return { ...config, connections }
}

function deleteItem(config: IConfig, key: string): IConfig {
  const connections = config.connections.filter((connection) => connection.key !== key)
  return closeItem({ ...config, connections }, key)
}

function copyItem(config: IConfig, key: string): IConfig {
  const connection = config.connections.find((connection) => connection.key === key)
  if (!connection) return config
  return saveItem(config, { ...connection, key: undefined })
}

function openItem(config: IConfig, key: string): IConfig {
  const connection = config.connections.find((connection) => connection.key === key)
  if (!connection) return config
  return saveItem({ ...config, activeConnection: key }, { open: true }, key)
}

function closeItem(config: IConfig, key: string): IConfig {
  const connection = config.connections.find((connection) => connection.key === key)
  if (!connection) return { ...config, activeConnection: undefined }
  const activeConnection = config.activeConnection === key ? undefined : config.activeConnection
  return saveItem({ ...config, activeConnection }, { open: false }, key)
}
