import { Consumer, Kafka } from 'kafkajs'

export async function createConsumer(brokers: string[], topic: string, groupId: string): Promise<Consumer> {
  const client = new Kafka({ brokers })
  const consumer = client.consumer({ groupId, heartbeatInterval: 3000, sessionTimeout: 600000 })
  await consumer.connect()
  await consumer.subscribe({ topic })
  return consumer
}
