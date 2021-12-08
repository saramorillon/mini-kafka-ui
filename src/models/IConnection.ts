import { IServer } from './IServer'

export interface IConnection extends IServer {
  topic: string
}

export function isConnection(item: IServer | IConnection): item is IConnection {
  return 'topic' in item
}
