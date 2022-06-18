import { randomUUID } from 'crypto'
import { IpcMainInvokeEvent } from 'electron'
import { IServer } from '../models/IServer'
import { getConfig, updateConfig } from './config'

export async function getServers() {
  const config = await getConfig()
  return config.servers
}

export async function getServer(event: IpcMainInvokeEvent, key: string) {
  const config = await getConfig()
  return config.servers.find((server) => server.key === key)
}

export async function saveServer(event: IpcMainInvokeEvent, data: IServer) {
  if (!data.key) {
    data.key = randomUUID()
  }
  await updateConfig({ servers: [data] })
}
