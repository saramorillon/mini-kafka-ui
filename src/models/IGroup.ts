import { v4 } from 'uuid'
import { replaceAt } from '../utils/replaceAt'
import { IConfig } from './IConfig'
import { isConnection } from './IConnection'

export interface IGroup {
  key: string
  parent: 'root' | string
  name: string
  open: boolean
}

export function getDefaultGroup(): IGroup {
  return {
    key: v4(),
    parent: 'root',
    name: '',
    open: false,
  }
}

export function isGroup(item?: IGroup): item is IGroup {
  return item !== undefined && !isConnection(item)
}

export function saveGroup(config: IConfig, item: IGroup): IConfig {
  const index = config.groups.findIndex((group) => group.key === item.key)
  const newGroup = { ...getDefaultGroup(), ...config.groups[index], ...item }
  return { ...config, groups: replaceAt(config.groups, index, newGroup) }
}

export function deleteGroup(config: IConfig, item: IGroup): IConfig {
  return { ...config, groups: config.groups.filter((group) => group.key !== item.key) }
}

export function copyGroup(config: IConfig, item: IGroup): IConfig {
  return saveGroup(config, { ...item, name: item.name + ' Copy', key: v4() })
}
