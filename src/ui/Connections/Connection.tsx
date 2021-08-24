import { PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'
import { useConnection } from '../../hooks/useConnection'

export function Connection(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const { saveConnection } = useContext(ConnectionsContext)
  const connection = useConnection(id)

  const [name, setName] = useState<string>()
  const [brokers, setBrokers] = useState<string>()
  const [topic, setTopic] = useState<string>()

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
