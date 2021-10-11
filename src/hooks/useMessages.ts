import { Consumer, EachMessagePayload, KafkaMessage } from 'kafkajs'
import { useCallback, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { IConnection } from '../models/IConnection'
import { connectConsumer, createConsumer, disconnectConsumer } from '../services/Consumer'

interface IConsumer {
  loading: boolean
  connected: boolean
  connect: () => void
  disconnect: () => void
}

export function useMessages(connection: IConnection): [KafkaMessage[], IConsumer] {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [consumer, setConsumer] = useState<Consumer>()
  const [messages, setMessages] = useState<KafkaMessage[]>([])

  useEffect(() => {
    setConsumer(createConsumer(connection.brokers, v4()))
  }, [connection])

  const onMessage = useCallback(async ({ message }: EachMessagePayload) => {
    setMessages((messages) => [...messages, message])
  }, [])

  const connect = useCallback(async () => {
    if (consumer) {
      setLoading(true)
      await connectConsumer(consumer, connection.topic, onMessage)
      setLoading(false)
      setConnected(true)
    }
  }, [consumer, onMessage])

  const disconnect = useCallback(async () => {
    if (consumer) {
      setLoading(true)
      await disconnectConsumer(consumer)
      setLoading(false)
      setConnected(false)
    }
  }, [consumer])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return [messages, { loading, connected, connect, disconnect }]
}
