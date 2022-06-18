import { randomUUID } from 'crypto'
import { IpcMainInvokeEvent } from 'electron'
import { IServer } from '../models/IServer'
import { getConfig, updateConfig } from './config'

export async function getServers() {
  const config = await getConfig()
  return Object.values(config.servers)
}

export async function getServer(event: IpcMainInvokeEvent, key: string) {
  const config = await getConfig()
  return config.servers[key]
}

export async function saveServer(event: IpcMainInvokeEvent, server: IServer) {
  if (!server.key) server.key = randomUUID()
  const { window, servers } = await getConfig()
  servers[server.key] = server
  await updateConfig({ window, servers })
}

export async function deleteServer(event: IpcMainInvokeEvent, server: IServer) {
  const { window, servers } = await getConfig()
  delete servers[server.key]
  await updateConfig({ window, servers })
}
