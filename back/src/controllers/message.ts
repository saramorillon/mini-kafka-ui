import { IpcMainInvokeEvent } from 'electron'
import { getClient } from '../services/kafka'

export async function sendMessage(event: IpcMainInvokeEvent, key: string, topic: string, value: string) {
  const client = await getClient(key)
  const producer = client.producer()
  await producer.connect()
  await producer.send({ topic, messages: [{ value }] })
}
