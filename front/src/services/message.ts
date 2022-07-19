import { IMessage } from '../models/IMessage'
import { query } from './query'

export function getMessages(filters: Record<string, string>, page: number, limit: number): Promise<IMessage[]> {
  return query('GetMessages', filters, page, limit)
}

export async function sendMessage(key: string, topic: string, value: string): Promise<void> {
  await query('SendMessage', key, topic, value)
}
