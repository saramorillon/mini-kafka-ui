import { PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { useState, useContext, FormEvent, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ConnectionsContext } from '../contexts/ConnectionsContext'

export function Connection(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const { getConnection, saveConnection } = useContext(ConnectionsContext)
  const connection = getConnection(id)

  const [name, setName] = useState(connection?.name)
  const [brokers, setBrokers] = useState(connection?.brokers?.join(','))
  const [topic, setTopic] = useState(connection?.topic)

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (name && brokers && topic) saveConnection({ name, brokers: brokers.split(/\s*,\s*/), topic }, id)
    },
    [saveConnection, id, name, brokers, topic]
  )

  return (
    <form onSubmit={onSubmit} style={{ flex: 1 }}>
      <Stack tokens={{ padding: '1rem', childrenGap: '1rem' }}>
        <TextField label="Connection name" required value={name} onChange={(e, value) => setName(value)} />
        <TextField label="Brokers" required value={brokers} onChange={(e, value) => setBrokers(value)} />
        <TextField label="Topic" required value={topic} onChange={(e, value) => setTopic(value)} />
        <Stack.Item align="end">
          <PrimaryButton text="Save" />
        </Stack.Item>
      </Stack>
    </form>
  )
}
