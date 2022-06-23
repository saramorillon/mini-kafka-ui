import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'
import { IMessage } from '../models/IMessage'

export function useConsumer(key: string, topic: string) {
  const [allMessages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    void ipcRenderer.invoke('start-consumer', key, topic)
    ipcRenderer.on('message', (event, message) => {
      setMessages((messages) => [...messages, message])
    })
    return () => {
      void ipcRenderer.invoke('stop-consumer', key, topic)
    }
  }, [key, topic])

  return allMessages
}
