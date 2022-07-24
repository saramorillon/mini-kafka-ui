import { useEffect, useState } from 'react'
import { startConsumer, stopConsumer } from '../services/consumer'

export function useConsumer(serverId: string, topic: string) {
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    void startConsumer(serverId, topic)
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      void stopConsumer()
    }
  }, [serverId, topic])

  return { loading, error }
}
