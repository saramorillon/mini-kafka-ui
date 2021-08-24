import { Consumer, KafkaMessage } from 'kafkajs'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { IConnection } from '../models/IConnection'
import { createConsumer } from '../services/Consumer'

export function useMessages(connection?: IConnection): KafkaMessage[] {
  const [consumer, setConsumer] = useState<Consumer>()
  const [messages, setMessages] = useState<KafkaMessage[]>([])

  useEffect(() => {
    if (connection) createConsumer(connection.brokers, connection.topic, v4()).then(setConsumer)
  }, [connection])

  useEffect(() => {
    consumer?.run({ eachMessage: async ({ message }) => setMessages((messages) => [...messages, message]) })
    return () => {
      consumer?.disconnect()
    }
  }, [consumer])

  return messages
}
