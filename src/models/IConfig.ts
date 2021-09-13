import { IConnection } from './IConnection'
import { IGroup } from './IGroup'
import { ITree } from './ITree'

export interface IConfig {
  activeConnection?: string
  groups: IGroup[]
  connections: IConnection[]
  tree: ITree
}
