import { ipcRenderer } from 'electron'
import type { EachMessagePayload } from 'kafkajs'

export function getMessages(key: string, topic: string): Promise<EachMessagePayload[]> {
  return ipcRenderer.invoke('get-messages', key, topic)
}
