import { v4 } from 'uuid'
import { replaceAt } from '../utils/replaceAt'

export interface IGroup {
  key: string
  name: string
  open: boolean
}

export function getDefaultGroup(): IGroup {
  return {
    key: v4(),
    name: '',
    open: false,
  }
}

export function saveGroup(groups: IGroup[], item: IGroup): IGroup[] {
  const index = groups.findIndex((connection) => connection.key === item.key)
  const newConnection = { ...getDefaultGroup(), ...groups[index], ...item }
  return replaceAt(groups, index, newConnection)
}

export function deleteGroup(groups: IGroup[], item: IGroup): IGroup[] {
  return groups.filter((connection) => connection.key !== item.key)
}

export function copyGroup(groups: IGroup[], item: IGroup): IGroup[] {
  return saveGroup(groups, { ...item, key: v4() })
}
