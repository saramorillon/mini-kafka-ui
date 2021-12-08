import { IConnection } from './IConnection'
import { IServer } from './IServer'

export interface IConfig {
  servers: IServer[]
  openItems: (IServer | IConnection)[]
  activeItem?: string
}
