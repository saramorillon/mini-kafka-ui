import {
  ComboBox,
  DefaultButton,
  Dialog,
  DialogType,
  IComboBox,
  IComboBoxOption,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react'
import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'
import { IConnection } from '../../models/IConnection'

interface IConnectionProps {
  connection?: IConnection
  onDismiss: () => void
}

export function Connection({ connection, onDismiss }: IConnectionProps): JSX.Element {
  const { dispatch } = useContext(ConnectionsContext)

  const [name, setName] = useState<string>()
  const [brokers, setBrokers] = useState<string[]>([])
  const [topic, setTopic] = useState<string>()

  useEffect(() => {
    setName(connection?.name)
    setBrokers(connection?.brokers || [])
    setTopic(connection?.topic)
  }, [connection])

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      dispatch({ type: 'save', key: connection?.key, connection: { name, brokers, topic } })
      onDismiss()
    },
    [onDismiss, dispatch, connection, name, brokers, topic]
  )

  const onChange = useCallback(
    (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
      if (!option && value) setBrokers((brokers) => [...brokers, value])
      else if (option && !value) setBrokers((brokers) => brokers.filter((broker) => broker !== option.key))
    },
    []
  )

  return (
    <Dialog
      hidden={false}
      dialogContentProps={{ type: DialogType.largeHeader, title: connection ? connection.name : 'New connection' }}
      minWidth="90%"
    >
      <form onSubmit={onSubmit}>
        <Stack tokens={{ padding: '1rem', childrenGap: '1rem' }}>
          <TextField label="Connection name" required value={name || ''} onChange={(e, value) => setName(value)} />
          <ComboBox
            multiSelect
            required
            label="Brokers"
            allowFreeform
            autoComplete="on"
            options={brokers.map((broker) => ({ key: broker, text: broker }))}
            selectedKey={brokers}
            onChange={onChange}
          />
          <TextField label="Topic" required value={topic || ''} onChange={(e, value) => setTopic(value)} />
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: '2rem' }}>
              <DefaultButton text="Cancel" type="button" onClick={onDismiss} />
              <PrimaryButton text="Save" type="submit" />
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    </Dialog>
  )
}
