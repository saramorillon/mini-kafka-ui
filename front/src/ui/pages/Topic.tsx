import { List } from '@styled-icons/feather'
import React, { FormEvent, useCallback, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { sendMessage } from '../../services/message'
import { Messages } from '../components/Message'

export function Topic() {
  const { key, topic } = useParams<{ key: string; topic: string }>()

  if (!key || !topic) {
    return <Navigate to="/topics" />
  }

  return (
    <>
      <header>
        <h1>
          <List /> {topic}
        </h1>
        <SendMessageForm serverKey={key} topic={topic} />
      </header>
      <main>
        <Messages serverKey={key} topic={topic} />
      </main>
    </>
  )
}

interface IMessagesProps {
  serverKey: string
  topic: string
}

function SendMessageForm({ serverKey, topic }: IMessagesProps) {
  const [value, setValue] = useState('')

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      void sendMessage(serverKey, topic, value).then(() => console.log('coucou'))
    },
    [serverKey, topic, value]
  )

  return (
    <form onSubmit={onSubmit}>
      <textarea value={value} onChange={(e) => setValue(e.target.value)}></textarea>
      <button>Send</button>
    </form>
  )
}
