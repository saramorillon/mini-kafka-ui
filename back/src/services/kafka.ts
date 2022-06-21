import { Kafka } from 'kafkajs'
import { getConfig } from '../controllers/config'
import { settings } from '../settings'

const { clientId } = settings

export async function getClient(key: string) {
  const config = await getConfig()
  const { brokers } = config.servers[key] || { brokers: [] }
  return new Kafka({ brokers, clientId })
}
