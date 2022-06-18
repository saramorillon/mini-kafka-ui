import { ipcRenderer } from 'electron'
import { ITopic } from '../models/ITopic'

export function getTopics(key: string): Promise<ITopic[]> {
  return ipcRenderer.invoke('get-topics', key)
}
