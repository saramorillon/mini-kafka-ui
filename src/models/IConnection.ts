import { IGroup } from './IGroup'

export interface IConnection extends IGroup {
  brokers: string[]
  topic: string
}

export function isConnection(item?: IGroup): item is IConnection {
  return item !== undefined && 'brokers' in item
}
