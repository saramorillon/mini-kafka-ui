import { IServer } from '../models/IServer'
import { ITopic } from '../models/ITopic'
import { query } from './query'

export function getTopics(key: string): Promise<ITopic[]> {
  if (!key) return Promise.resolve([])
  return query('GetTopics')
}

export function getFavoriteTopics(): Promise<{ name: string; server: IServer }[]> {
  return query('GetFavoriteTopics')
}

export function toggleTopicFavorite(key: string, topic: string): Promise<void> {
  return query('ToggleFavoriteTopic', key, topic)
}
