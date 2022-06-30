import { IpcMainInvokeEvent } from 'electron'
import { KafkaService } from '../services/kafka'

export async function startConsumer(event: IpcMainInvokeEvent, key: string, topic: string) {
  await KafkaService.create(key, topic)
}

export async function stopConsumer() {
  await KafkaService.destroy()
}
