import { EachMessagePayload } from 'kafkajs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'
import { IConnection } from '../models/IConnection'
import { connectConsumer, createConsumer, disconnectConsumer } from '../services/Consumer'

interface IConsumer {
  loading: boolean
  connected: boolean
  connect: () => void
  disconnect: () => void
}

export function useConsumer(connection: IConnection): [EachMessagePayload[], IConsumer] {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const consumer = useMemo(() => createConsumer(connection.brokers, v4()), [connection])
  const [payloads, setPayloads] = useState<EachMessagePayload[]>([])

  const onMessage = useCallback(async (payload: EachMessagePayload) => {
    setPayloads((messages) => [...messages, payload])
  }, [])

  const connect = useCallback(async () => {
    setLoading(true)
    await connectConsumer(consumer, connection.topic, onMessage)
    setLoading(false)
    setConnected(true)
  }, [consumer, connection, onMessage])

  const disconnect = useCallback(async () => {
    setLoading(true)
    await disconnectConsumer(consumer)
    setLoading(false)
    setConnected(false)
  }, [consumer])

  useEffect(() => {
    return () => {
      if (connected) {
        disconnectConsumer(consumer)
      }
    }
  }, [connected, consumer])

  return [payloads, { loading, connected, connect, disconnect }]
}
