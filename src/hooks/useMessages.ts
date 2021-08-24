import { Consumer, KafkaMessage } from 'kafkajs'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { IConnection } from '../models/IConnection'
import { createConsumer } from '../services/Consumer'

export function useMessages(connection?: IConnection): [KafkaMessage[], { loading: boolean }] {
  const [loading, setLoading] = useState(true)
  const [consumer, setConsumer] = useState<Consumer>()
  const [messages, setMessages] = useState<KafkaMessage[]>([])

  useEffect(() => {
    if (connection) createConsumer(connection.brokers, connection.topic, v4()).then(setConsumer)
  }, [connection])

  useEffect(() => {
    setLoading(true)
    consumer?.on('consumer.group_join', () => setLoading(false))
    consumer?.run({ eachMessage: async ({ message }) => setMessages((messages) => [...messages, message]) })
    return () => {
      consumer?.disconnect()
    }
  }, [consumer])

  return [messages, { loading }]
}
