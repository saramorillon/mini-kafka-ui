import { useFetch } from '@saramorillon/hooks'
import { useCallback, useEffect } from 'react'
import { startConsumer, stopConsumer } from '../services/consumer'

export function useConsumer(serverId: string, topic: string) {
  const fetch = useCallback(() => startConsumer(serverId, topic), [serverId, topic])

  useEffect(() => {
    return () => {
      void stopConsumer()
    }
  }, [serverId, topic])

  return useFetch(fetch, [])
}
