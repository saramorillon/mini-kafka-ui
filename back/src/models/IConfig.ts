import { IServer } from './IServer'

export interface IConfig {
  window?: {
    x?: number
    y?: number
    width?: number
    height?: number
    maximized?: boolean
  }
  servers: Record<string, IServer>
}
