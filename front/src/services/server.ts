import { ipcRenderer } from 'electron'
import { IServer } from '../models/IServer'

export function getServers(): Promise<IServer[]> {
  return ipcRenderer.invoke('get-servers')
}

export async function getServer(key?: string): Promise<IServer | undefined> {
  if (key) {
    return ipcRenderer.invoke('get-server', key)
  }
}

export async function saveServer(data: Partial<IServer>): Promise<void> {
  return ipcRenderer.invoke('save-server', data)
}
