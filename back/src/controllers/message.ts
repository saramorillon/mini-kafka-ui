import { IpcMainInvokeEvent } from 'electron'
import { KafkaService } from '../services/kafka'

export function getMessages(event: IpcMainInvokeEvent, filters: Record<string, string>, page: number, limit: number) {
  KafkaService.getMessages(filters, page, limit)
}

export async function sendMessage(event: IpcMainInvokeEvent, key: string, topic: string, value: string) {
  const client = await KafkaService.getClient(key)
  const producer = client.producer()
  await producer.connect()
  await producer.send({ topic, messages: [{ value }] })
}
