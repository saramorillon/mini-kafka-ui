import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'

export function useConsumer(key: string, topic: string) {
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    void ipcRenderer
      .invoke('start-consumer', key, topic)
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      void ipcRenderer.invoke('stop-consumer', key, topic)
    }
  }, [key, topic])

  return { loading, error }
}
