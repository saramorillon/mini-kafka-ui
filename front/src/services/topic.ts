import { ipcRenderer } from 'electron'
import { IServer } from '../models/IServer'
import { ITopic } from '../models/ITopic'

export function getTopics(key: string): Promise<ITopic[]> {
  if (!key) return Promise.resolve([])
  return ipcRenderer.invoke('get-topics', key)
}

export function getFavoriteTopics(): Promise<{ name: string; server: IServer }[]> {
  return ipcRenderer.invoke('get-favorite-topics')
}

export function toggleTopicFavorite(key: string, topic: string): Promise<void> {
  return ipcRenderer.invoke('toggle-topic-favorite', key, topic)
}
