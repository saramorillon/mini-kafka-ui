import { IServer } from '../models/IServer'

export function getServers(): Promise<IServer[]> {
  return pywebview.api.getServers()
}

export function getServer(key?: string): Promise<IServer | undefined> {
  return pywebview.api.getServer(key)
}

export function saveServer(server: IServer): Promise<void> {
  return pywebview.api.saveServer(server)
}

export function deleteServer(server: IServer): Promise<void> {
  return pywebview.api.deleteServer(server)
}
