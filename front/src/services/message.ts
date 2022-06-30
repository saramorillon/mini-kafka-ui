import { ipcRenderer } from 'electron'
import { IMessage } from '../models/IMessage'

export function getMessages(filters: Record<string, string>, page: number, limit: number): Promise<IMessage[]> {
  return ipcRenderer.invoke('get-messages', filters, page, limit)
}

export async function sendMessage(key: string, topic: string, value: string): Promise<void> {
  await ipcRenderer.invoke('send-message', key, topic, value)
}
