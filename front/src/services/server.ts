import { ipcRenderer } from 'electron'
import { IServer } from '../models/IServer'

export function getServers(): Promise<IServer[]> {
  return ipcRenderer.invoke('get-servers')
}

export function getServer(key?: string): Promise<IServer | undefined> {
  if (key) return ipcRenderer.invoke('get-server', key)
  return Promise.resolve(undefined)
}

export function saveServer(data: Partial<IServer>): Promise<void> {
  return ipcRenderer.invoke('save-server', data)
}

export function deleteServer(data: Partial<IServer>): Promise<void> {
  return ipcRenderer.invoke('delete-server', data)
}
