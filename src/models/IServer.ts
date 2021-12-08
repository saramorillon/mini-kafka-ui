import { v4 } from 'uuid'
import { replaceAt } from '../utils/replaceAt'
import { IConfig } from './IConfig'

export interface IServer {
  key: string
  name: string
  brokers: string[]
}

export function getDefaultServer(): IServer {
  return { key: v4(), name: '', brokers: [] }
}

export function saveServer(config: IConfig, item: IServer): IConfig {
  const index = config.servers.findIndex((server) => server.key === item.key)
  const newServer = { ...getDefaultServer(), ...config.servers[index], ...item }
  return { ...config, servers: replaceAt(config.servers, index, newServer) }
}

export function deleteServer(config: IConfig, item: IServer): IConfig {
  return { ...config, servers: config.servers.filter((server) => server.key !== item.key) }
}
