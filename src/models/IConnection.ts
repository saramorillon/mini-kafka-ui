import { v4 } from 'uuid'
import { replaceAt } from '../utils/replaceAt'
import { IGroup } from './IGroup'

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

export function saveConnection(connections: IConnection[], item: IConnection): IConnection[] {
  const index = connections.findIndex((connection) => connection.key === item.key)
  const newConnection = { ...getDefaultConnection(), ...connections[index], ...item }
  return replaceAt(connections, index, newConnection)
}

export function deleteConnection(connections: IConnection[], item: IConnection): IConnection[] {
  return connections.filter((connection) => connection.key !== item.key)
}

export function copyConnection(connections: IConnection[], item: IConnection): IConnection[] {
  return saveConnection(connections, { ...item, key: v4() })
}
