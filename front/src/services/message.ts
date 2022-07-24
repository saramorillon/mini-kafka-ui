import { IMessage } from '../models/IMessage'
import { query } from './query'

export function countMessages(filters: Record<string, string>, limit: number): Promise<number> {
  return query('CountMessages', { filters, limit })
}

export function getMessages(
  partition: number,
  filters: Record<string, string>,
  page: number,
  limit: number
): Promise<IMessage[]> {
  return query('GetMessages', { partition, filters, page, limit, direction: -1 })
}

export async function sendMessage(key: string, topic: string, value: string): Promise<void> {
  await query('SendMessage', { key, topic, value })
}
