import { IpcMainInvokeEvent } from 'electron'
import { Kafka } from 'kafkajs'
import { ITopic } from '../models/ITopic'
import { settings } from '../settings'
import { getConfig } from './config'

export async function getTopics(event: IpcMainInvokeEvent, key: string) {
  const config = await getConfig()
  const { brokers } = config.servers[key] || { brokers: [] }
  const client = new Kafka({ brokers, clientId: settings.clientId })
  const admin = client.admin()
  await admin.connect()
  const result: ITopic[] = []
  const topics = await admin.listTopics()
  for (const topic of topics) {
    const offsets = await admin.fetchTopicOffsets(topic)
    result.push({ name: topic, offsets })
  }
  return result
}
