import { useEffect, useMemo, useState } from 'react'
import { IMessage, IMessageFilters } from '../models/IMessage'

export function useMessages(filters: IMessageFilters, page: number, limit: number): [IMessage[], number] {
  const [allMessages, setAllMessages] = useState<IMessage[]>([])

  const filteredMessages = useMemo(
    () =>
      allMessages.filter((message) =>
        Object.entries(filters).every(([key, value]) =>
          message[key as keyof IMessage]?.toString().toLowerCase().includes(value.toLowerCase())
        )
      ),
    [allMessages, filters]
  )

  const messages = useMemo(
    () => filteredMessages.slice((page - 1) * limit, page * limit),
    [filteredMessages, page, limit]
  )

  useEffect(() => {
    window.eventEmitter.addEventListener('messages', (event) => {
      if (isMessagesEvent(event)) {
        setAllMessages((messages) => [...messages, ...event.detail.messages])
      }
    })
  }, [])

  return useMemo(() => [messages, filteredMessages.length], [messages, filteredMessages.length])
}

function isMessagesEvent(event: Event): event is CustomEvent<{ messages: IMessage[] }> {
  return 'detail' in event
}
