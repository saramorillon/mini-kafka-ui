import {
  DetailsListLayoutMode,
  IColumn,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SelectionMode,
  ShimmeredDetailsList,
  Spinner,
  SpinnerSize,
  Stack,
  StackItem,
} from '@fluentui/react'
import { EachMessagePayload } from 'kafkajs'
import React from 'react'
import ReactJson from 'react-json-view'
import { useMessages } from '../../hooks/useMessages'
import { IConnection } from '../../models/IConnection'

const columns: IColumn[] = [
  {
    key: 'partition',
    name: 'Partition',
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
    onRender: function Cell(payload: EachMessagePayload) {
      return <span>{payload.partition}</span>
    },
  },
  {
    key: 'offset',
    name: 'Offset',
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
    onRender: function Cell(payload: EachMessagePayload) {
      return <span>{payload.message.offset}</span>
    },
  },
  {
    key: 'key',
    name: 'Key',
    minWidth: 150,
    maxWidth: 150,
    isResizable: true,
    onRender: function Cell(payload: EachMessagePayload) {
      return <span>{payload.message.key?.toString()}</span>
    },
  },
  {
    key: 'value',
    name: 'Value',
    minWidth: 200,
    isResizable: true,
    onRender: function Cell(payload: EachMessagePayload) {
      if (!payload.message.value) return null
      return (
        <ReactJson
          src={JSON.parse(payload.message.value.toString())}
          collapsed
          displayDataTypes={false}
          displayObjectSize={false}
        />
      )
    },
  },
]

interface IMessagesProps {
  connection: IConnection
}

export function Messages({ connection }: IMessagesProps): JSX.Element {
  const [payloads, { loading, connected, connect, disconnect }] = useMessages(connection)

  return (
    <Stack>
      <StackItem align="end" tokens={{ padding: '0 1rem' }}>
        <PrimaryButton onClick={connected ? disconnect : connect}>{connected ? 'Disconnect' : 'Connect'}</PrimaryButton>
      </StackItem>
      <ShimmeredDetailsList
        items={payloads}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
      />
      <StackItem tokens={{ padding: '0 1rem' }}>
        <MessageBody loading={loading} connected={connected} total={payloads.length} />
      </StackItem>
    </Stack>
  )
}

interface IMessageBodyProps {
  loading: boolean
  connected: boolean
  total: number
}

function MessageBody({ loading, connected, total }: IMessageBodyProps) {
  if (loading) return <Spinner size={SpinnerSize.large} />
  if (!connected) {
    return (
      <MessageBar messageBarType={MessageBarType.info} isMultiline={false}>
        Consumer is not connected
      </MessageBar>
    )
  }
  if (!total) {
    return (
      <MessageBar messageBarType={MessageBarType.info} isMultiline={false}>
        No messages for now
      </MessageBar>
    )
  }
  return null
}
