import { ipcRenderer } from 'electron'
import { IApp } from '../models/IApp'

export function getApp(): Promise<IApp | null> {
  return ipcRenderer.invoke('get-app')
}
