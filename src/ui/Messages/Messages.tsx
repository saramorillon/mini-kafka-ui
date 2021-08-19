import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react'
import { Consumer, KafkaMessage } from 'kafkajs'
import React, { useContext, useEffect, useState } from 'react'
import ReactJson from 'react-json-view'
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'
import { IConnection } from '../../models/IConnection'
import { createConsumer } from '../../services/Consumer'

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
      return <ReactJson collapsed src={JSON.parse(message.value.toString())} enableClipboard={false} />
    },
  },
]

export function Messages(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const { getConnection } = useContext(ConnectionsContext)
  const [connection, setConnection] = useState<IConnection>()
  const [consumer, setConsumer] = useState<Consumer>()
  const [messages, setMessages] = useState<KafkaMessage[]>([])

  useEffect(() => {
    setConnection(getConnection(id))
  }, [id])

  useEffect(() => {
    if (connection) createConsumer(connection.brokers, connection.topic, v4()).then(setConsumer)
  }, [connection])

  useEffect(() => {
    consumer?.run({ eachMessage: async ({ message }) => setMessages((messages) => [...messages, message]) })
    return () => {
      consumer?.disconnect()
    }
  }, [consumer])

  return (
    <DetailsList
      items={messages}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      selectionMode={SelectionMode.none}
    />
  )
}
