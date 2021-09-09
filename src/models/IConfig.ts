import { IConnection } from './IConnection'
import { IGroup } from './IGroup'

export interface IConfig {
  activeConnection?: string
  groups: IGroup[]
  connections: IConnection[]
  tree: Record<'root' | string, string[]>
}
