import { Consumer, EachMessagePayload } from 'kafkajs'
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

export function useMessages(connection: IConnection): [EachMessagePayload[], IConsumer] {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [consumer, setConsumer] = useState<Consumer>()
  const [payloads, setPayloads] = useState<EachMessagePayload[]>([])

  useEffect(() => {
    setConsumer(createConsumer(connection.brokers, v4()))
  }, [connection])

  const onMessage = useCallback(async (payload: EachMessagePayload) => {
    setPayloads((messages) => [...messages, payload])
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
      if (connected) {
        disconnect()
      }
    }
  }, [disconnect])

  return [payloads, { loading, connected, connect, disconnect }]
}
