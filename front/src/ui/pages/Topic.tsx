import { usePagination } from '@saramorillon/hooks'
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconList } from '@tabler/icons'
import { ipcRenderer } from 'electron'
import { EachMessagePayload } from 'kafkajs'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const limit = 10

export function Topic() {
  const { key, topic } = useParams<{ key: string; topic: string }>()

  if (!key || !topic) {
    return <Navigate to="/topics" />
  }

  return <Messages serverKey={key} topic={topic} />
}

interface IMessagesProps {
  serverKey: string
  topic: string
}

function Messages({ serverKey, topic }: IMessagesProps) {
  const { page, setMaxPage, maxPage, first, previous, next, last, canPrevious, canNext, goTo } = usePagination()
  const [messages, setMessages] = useState<EachMessagePayload[]>([])

  useEffect(() => {
    void ipcRenderer.invoke('start-consumer', serverKey, topic)
    ipcRenderer.on('message', (event, message) => {
      setMessages((messages) => [...messages, message])
    })
    return () => {
      void ipcRenderer.invoke('stop-consumer', serverKey, topic)
    }
  }, [serverKey, topic])

  useEffect(() => {
    setMaxPage(Math.ceil(messages.length / limit))
  }, [messages, setMaxPage])

  return (
    <>
      <header>
        <h1>
          <IconList size={36} /> {topic}
        </h1>
      </header>
      <main>
        {/* <div className="flex items-center mb2">
        <select
          className="flex-auto mr1"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          placeholder="Server"
        >
          {servers.map((server) => (
            <option key={server.key}>{server.name}</option>
          ))}
        </select>

        <input
          className="flex-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter topics"
        />
      </div> */}

        <table>
          <thead>
            <tr>
              <th>Partition</th>
              <th>Offset</th>
              <th>Timestamp</th>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((payload, key) => (
              <tr key={key}>
                <td>{payload.partition}</td>
                <td>{payload.message.offset}</td>
                <td>{payload.message.timestamp}</td>
                <td>{payload.message.key?.toString()}</td>
                <td>{payload.message.value?.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="center">
          <button disabled={!canPrevious} onClick={first} aria-label="First">
            <IconChevronsLeft />
          </button>
          <button disabled={!canPrevious} onClick={previous} aria-label="Previous">
            <IconChevronLeft />
          </button>
          <span className="mx1">
            Page {page} of {maxPage}
          </span>
          <button disabled={!canNext} onClick={next} aria-label="Next">
            <IconChevronRight />
          </button>
          <button disabled={!canNext} onClick={last} aria-label="Last">
            <IconChevronsRight />
          </button>
        </div>
      </main>
    </>
  )
}
