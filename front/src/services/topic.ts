import { ipcRenderer } from 'electron'
import { ITopic } from '../models/ITopic'

export function getTopics(
  key: string,
  page: number,
  limit: number,
  filter: string
): Promise<{ topics: ITopic[]; total: number }> {
  if (!key) return Promise.resolve({ topics: [], total: 0 })
  return ipcRenderer.invoke('get-topics', key, page, limit, filter)
}
