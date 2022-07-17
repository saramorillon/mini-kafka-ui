import { useEffect, useState } from 'react'
import { startConsumer, stopConsumer } from '../services/consumer'

export function useConsumer(key: string, topic: string) {
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    void startConsumer(key, topic)
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      void stopConsumer(key, topic)
    }
  }, [key, topic])

  return { loading, error }
}
