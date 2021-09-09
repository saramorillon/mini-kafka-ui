import { v4 } from 'uuid'
import { IConnection } from '../models/IConnection'

export interface IConfig {
  activeConnection?: string
  connections: IConnection[]
}

export type Action =
  | { type: 'save'; key?: string; connection: Partial<IConnection> }
  | { type: 'delete'; key: string }
  | { type: 'copy'; key: string }
  | { type: 'open'; key: string }
  | { type: 'close'; key: string }

export function configReducer(config: IConfig, action: Action): IConfig {
  switch (action.type) {
    case 'save':
      return saveConnection(config, action.connection, action.key)
    case 'delete':
      return deleteConnection(config, action.key)
    case 'copy':
      return copyConnection(config, action.key)
    case 'open':
      return openConnection(config, action.key)
    case 'close':
      return closeConnection(config, action.key)
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

function saveConnection(config: IConfig, connection: Partial<IConnection>, key: string = v4()): IConfig {
  const index = config.connections.findIndex((connection) => connection.key === key)
  const newConnection = { ...defaultConnection, ...config.connections[index], ...connection, key }
  const connections = replaceAt(config.connections, index, newConnection)
  if (index === -1) return openConnection({ ...config, connections }, key)
  return { ...config, connections }
}

function deleteConnection(config: IConfig, key: string): IConfig {
  const connections = config.connections.filter((connection) => connection.key !== key)
  return closeConnection({ ...config, connections }, key)
}

function copyConnection(config: IConfig, key: string): IConfig {
  const connection = config.connections.find((connection) => connection.key === key)
  if (!connection) return config
  return saveConnection(config, { ...connection, key: undefined })
}

function openConnection(config: IConfig, key: string): IConfig {
  const connection = config.connections.find((connection) => connection.key === key)
  if (!connection) return config
  return saveConnection({ ...config, activeConnection: key }, { open: true }, key)
}

function closeConnection(config: IConfig, key: string): IConfig {
  const connection = config.connections.find((connection) => connection.key === key)
  if (!connection) return { ...config, activeConnection: undefined }
  const activeConnection = config.activeConnection === key ? undefined : config.activeConnection
  return saveConnection({ ...config, activeConnection }, { open: false }, key)
}
