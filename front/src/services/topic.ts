import { IFavorite } from '../models/IFavorite'
import { ITopic } from '../models/ITopic'
import { query } from './query'

export function getTopics(key: string): Promise<ITopic[]> {
  if (!key) return Promise.resolve([])
  return query('GetTopics', key)
}

export function getFavoriteTopics(): Promise<IFavorite[]> {
  return query('GetFavoriteTopics')
}

export function toggleTopicFavorite(favorite: IFavorite): Promise<void> {
  return query('ToggleFavoriteTopic', favorite)
}
