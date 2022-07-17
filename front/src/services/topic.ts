import { IServer } from '../models/IServer'
import { ITopic } from '../models/ITopic'

export function getTopics(key: string): Promise<ITopic[]> {
  return pywebview.api.getTopics(key)
}

export function getFavoriteTopics(): Promise<{ name: string; server: IServer }[]> {
  return pywebview.api.getFavoriteTopics()
}

export function toggleTopicFavorite(key: string, topic: string): Promise<void> {
  return pywebview.api.toggleTopicFavorite(key, topic)
}
