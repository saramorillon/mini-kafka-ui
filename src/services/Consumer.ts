import { Consumer, EachMessagePayload, Kafka } from 'kafkajs'

export function createConsumer(brokers: string[], groupId: string): Consumer {
  const client = new Kafka({ brokers })
  const consumer = client.consumer({ groupId, heartbeatInterval: 3000, sessionTimeout: 600000 })
  return consumer
}

export async function connectConsumer(
  consumer: Consumer,
  topic: string,
  onMessage: (message: EachMessagePayload) => Promise<void>
): Promise<void> {
  await consumer.connect()
  await consumer.subscribe({ topic })
  consumer.run({ autoCommit: false, eachMessage: onMessage })
  return new Promise((resolve) => {
    consumer.on('consumer.group_join', resolve)
  })
}

export async function disconnectConsumer(consumer: Consumer): Promise<void> {
  await consumer.stop()
  await consumer.disconnect()
}
