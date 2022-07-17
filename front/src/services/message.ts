import { IMessage } from '../models/IMessage'

export function getMessages(filters: Record<string, string>, page: number, limit: number): Promise<IMessage[]> {
  return pywebview.api.getMessages(filters, page, limit)
}

export function sendMessage(key: string, topic: string, value: string): Promise<void> {
  return pywebview.api.sendMessage(key, topic, value)
}
