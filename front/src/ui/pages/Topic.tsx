import { List } from '@styled-icons/feather'
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Messages } from '../components/Message'
import { SendMessageDialog } from '../components/SendMessageDIalog'

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
        <SendMessageDialog serverKey={key} topic={topic} />
      </header>
      <main>
        <Messages serverId={key} topic={topic} />
      </main>
    </>
  )
}
