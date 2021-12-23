import { Kafka, Producer } from 'kafkajs'

export function createProducer(brokers: string[]): Producer {
  const client = new Kafka({ brokers })
  const producer = client.producer()
  return producer
}

export async function connectProducer(producer: Producer): Promise<void> {
  await producer.connect()
}

export async function disconnectProducer(producer: Producer): Promise<void> {
  await producer.disconnect()
}
