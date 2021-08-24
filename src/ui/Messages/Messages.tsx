import {
  DetailsListLayoutMode,
  IColumn,
  MessageBar,
  MessageBarType,
  SelectionMode,
  ShimmeredDetailsList,
  Spinner,
  SpinnerSize,
  Stack,
  StackItem,
  Text,
} from '@fluentui/react'
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
  const [messages, { loading }] = useMessages(connection)

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
      <ShimmeredDetailsList
        items={messages}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
      />
      {loading && <Spinner size={SpinnerSize.large} />}
      {!loading && !messages.length && (
        <StackItem tokens={{ padding: '0 1rem' }}>
          <MessageBar messageBarType={MessageBarType.info} isMultiline={false}>
            No messages for now
          </MessageBar>
        </StackItem>
      )}
    </Stack>
  )
}
