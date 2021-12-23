import { useCallback, useEffect, useMemo, useState } from 'react'
import { IConnection } from '../models/IConnection'
import { connectProducer, createProducer, disconnectProducer } from '../services/Producer'

interface IProducer {
  loading: boolean
  sendMessage: (value: string, key?: string) => void
}

export function useProducer(connection: IConnection): IProducer {
  const [loading, setLoading] = useState(false)
  const producer = useMemo(() => createProducer(connection.brokers), [connection])

  useEffect(() => {
    connectProducer(producer)
    return () => {
      disconnectProducer(producer)
    }
  }, [producer])

  const sendMessage = useCallback(
    (value: string, key?: string) => {
      setLoading(true)
      producer.send({ topic: connection.topic, messages: [{ key, value }] }).then(() => {
        setLoading(false)
      })
    },
    [producer, connection]
  )

  return { loading, sendMessage }
}
