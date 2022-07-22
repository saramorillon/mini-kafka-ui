import { IServer } from '../models/IServer'
import { query } from './query'

export function getServers(): Promise<Record<string, IServer>> {
  return query('GetServers')
}

export function getServer(key?: string): Promise<IServer | undefined> {
  if (key) return query('GetServer', key)
  return Promise.resolve(undefined)
}

export function saveServer(server: Partial<IServer>): Promise<void> {
  return query('SaveServer', server)
}

export function deleteServer(server: Partial<IServer>): Promise<void> {
  return query('DeleteServer', server)
}
