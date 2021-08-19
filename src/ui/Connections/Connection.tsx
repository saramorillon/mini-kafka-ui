import { PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { useState, useContext, FormEvent, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'
import { IConnection } from '../../models/IConnection'

export function Connection(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const { getConnection, saveConnection } = useContext(ConnectionsContext)
  const [connection, setConnection] = useState<IConnection>()

  const [name, setName] = useState<string>()
  const [brokers, setBrokers] = useState<string>()
  const [topic, setTopic] = useState<string>()

  useEffect(() => {
    setConnection(getConnection(id))
  }, [id, getConnection])

  useEffect(() => {
    setName(connection?.name)
    setBrokers(connection?.brokers?.join(','))
    setTopic(connection?.topic)
  }, [connection])

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (name && brokers && topic) saveConnection({ name, brokers: brokers.split(/\s*,\s*/), topic }, id)
    },
    [saveConnection, id, name, brokers, topic]
  )

  return (
    <form onSubmit={onSubmit}>
      <Stack tokens={{ padding: '1rem', childrenGap: '1rem' }}>
        <TextField label="Connection name" required value={name || ''} onChange={(e, value) => setName(value)} />
        <TextField label="Brokers" required value={brokers || ''} onChange={(e, value) => setBrokers(value)} />
        <TextField label="Topic" required value={topic || ''} onChange={(e, value) => setTopic(value)} />
        <Stack.Item align="end">
          <PrimaryButton text="Save" type="submit" />
        </Stack.Item>
      </Stack>
    </form>
  )
}
