import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react'
import { Consumer, KafkaMessage } from 'kafkajs'
import React, { useEffect, useState } from 'react'
import ReactJson from 'react-json-view'

const columns: IColumn[] = [
  {
    key: 'key',
    name: 'Key',
    minWidth: 200,
    onRender: function Cell(message: KafkaMessage) {
      return <span>{message.key.toString()}</span>
    },
  },
  {
    key: 'name',
    name: 'Name',
    minWidth: 200,
    onRender: function Cell(message: KafkaMessage) {
      if (!message.value) return null
      return <ReactJson collapsed src={JSON.parse(message.value.toString())} />
    },
  },
]

interface IMessagesProps {
  consumer: Consumer
}

export function Messages({ consumer }: IMessagesProps): JSX.Element {
  const [messages, setMessages] = useState<KafkaMessage[]>([])

  useEffect(() => {
    consumer.run({ eachMessage: async ({ message }) => setMessages((messages) => [...messages, message]) })
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
