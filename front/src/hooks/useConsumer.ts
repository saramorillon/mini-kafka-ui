import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'

export function useConsumer(key: string, topic: string): boolean {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    void ipcRenderer.invoke('start-consumer', key, topic).finally(() => setLoading(false))
    return () => {
      void ipcRenderer.invoke('stop-consumer', key, topic)
    }
  }, [key, topic])

  return loading
}
