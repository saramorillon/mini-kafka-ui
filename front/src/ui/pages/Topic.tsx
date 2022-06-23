import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Messages } from '../components/Message'

export function Topic() {
  const { key, topic } = useParams<{ key: string; topic: string }>()

  if (!key || !topic) {
    return <Navigate to="/topics" />
  }

  return <Messages serverKey={key} topic={topic} />
}
