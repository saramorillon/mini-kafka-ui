import { IServer } from '../models/IServer'
import { query } from './query'

export function getServers(): Promise<IServer[]> {
  return query('GetServers')
}

export function getServer(key?: string): Promise<IServer | undefined> {
  if (key) return query('GetServer', key)
  return Promise.resolve(undefined)
}

export function saveServer(data: Partial<IServer>): Promise<void> {
  return query('SaveServer', data)
}

export function deleteServer(data: Partial<IServer>): Promise<void> {
  return query('DeleteServer', data)
}
