import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Stack, StackItem, Text } from '@fluentui/react'
import { KafkaMessage } from 'kafkajs'
import React from 'react'
import ReactJson from 'react-json-view'
import { useParams } from 'react-router-dom'
import { useConnection } from '../../hooks/useConnection'
import { useMessages } from '../../hooks/useMessages'

const columns: IColumn[] = [
  {
    key: 'key',
    name: 'Key',
    minWidth: 200,
    maxWidth: 400,
    isResizable: true,
    onRender: function Cell(message: KafkaMessage) {
      return <span>{message.key.toString()}</span>
    },
  },
  {
    key: 'name',
    name: 'Name',
    minWidth: 200,
    isResizable: true,
    onRender: function Cell(message: KafkaMessage) {
      if (!message.value) return null
      return (
        <ReactJson
          src={JSON.parse(message.value.toString())}
          collapsed
          displayDataTypes={false}
          displayObjectSize={false}
        />
      )
    },
  },
]

export function Messages(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const connection = useConnection(id)
  const messages = useMessages(connection)

  return (
    <Stack>
      <StackItem tokens={{ padding: '0 1rem' }}>
        <Text variant="xLarge">{connection?.name}</Text>
      </StackItem>
      <StackItem tokens={{ padding: '0 1rem' }}>
        <Text variant="small">
          <b>Brokers:</b> {connection?.brokers.join(', ')}
        </Text>
      </StackItem>
      <StackItem tokens={{ padding: '0 1rem' }}>
        <Text variant="small">
          <b>Topic:</b> {connection?.topic}
        </Text>
      </StackItem>
      <DetailsList
        items={messages}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
      />
    </Stack>
  )
}
