import { IServer } from './IServer'

export interface IConnection extends IServer {
  topic: string
}
