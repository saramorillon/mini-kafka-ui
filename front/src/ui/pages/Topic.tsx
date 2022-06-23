import { useCopy, usePagination } from '@saramorillon/hooks'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconClipboard,
  IconEye,
  IconList,
} from '@tabler/icons'
import { fromUnixTime, parseISO } from 'date-fns'
import { ipcRenderer } from 'electron'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactJson from 'react-json-view'
import { Navigate, useParams } from 'react-router-dom'
import { IMessage } from '../../models/IMessage'
import { Loader } from '../components/Helpers'

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
  const [allMessages, setMessages] = useState<IMessage[]>([])
  const [authorized, , copy] = useCopy()

  const [partition, setPartition] = useState('')
  const [offset, setOffset] = useState('')
  const [date, setDate] = useState('')
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const ref = useRef<HTMLDialogElement>(null)
  const [message, setMessage] = useState<IMessage>()

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
    const shouldOpen = Boolean(message)
    if (shouldOpen !== ref.current?.open) {
      if (shouldOpen) ref.current?.showModal()
      else ref.current?.close()
    }
  }, [message])

  const filteredMessages = useMemo(
    () =>
      allMessages.filter(
        (message) =>
          (!partition || message.partition.toString() === partition) &&
          (!offset || message.offset === offset) &&
          (!date || message.timestamp > parseISO(date).getTime()) &&
          (!key || message.key?.toLowerCase().includes(key.toLowerCase())) &&
          (!value || message.value.toLowerCase().includes(value?.toLowerCase()))
      ),
    [allMessages, partition, offset, date, key, value]
  )

  useEffect(() => {
    goTo(1)
  }, [goTo, partition, offset, date, key, value])

  useEffect(() => {
    setMaxPage(Math.ceil(filteredMessages.length / limit))
  }, [filteredMessages, setMaxPage])

  const messages = useMemo(() => filteredMessages.slice((page - 1) * limit, page * limit), [filteredMessages, page])

  return (
    <>
      <header>
        <h1>
          <IconList size={36} /> {topic}
        </h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Partition</th>
              <th>Offset</th>
              <th>Timestamp</th>
              <th>Key</th>
              <th>Value</th>
              <th></th>
            </tr>
            <tr>
              <th>
                <input type="number" value={partition} onChange={(e) => setPartition(e.target.value)} />
              </th>
              <th>
                <input value={offset} onChange={(e) => setOffset(e.target.value)} />
              </th>
              <th>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </th>
              <th>
                <input value={key} onChange={(e) => setKey(e.target.value)} />
              </th>
              <th>
                <input value={value} onChange={(e) => setValue(e.target.value)} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!messages.length ? (
              <tr>
                <td colSpan={6}>
                  <Loader />
                </td>
              </tr>
            ) : (
              messages.map((message, key) => (
                <tr key={key}>
                  <td>{message.partition}</td>
                  <td>{message.offset}</td>
                  <td>{fromUnixTime(message.timestamp / 1000).toISOString()}</td>
                  <td>{message.key}</td>
                  <td className="truncate" style={{ maxWidth: 500 }}>
                    {message.value}
                  </td>
                  <td className="nowrap">
                    <button onClick={() => setMessage(message)}>
                      <IconEye />
                    </button>
                    <button onClick={() => copy(message.value)} disabled={!authorized}>
                      <IconClipboard />
                    </button>
                  </td>
                </tr>
              ))
            )}
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
        <dialog ref={ref}>
          <header>
            <h1>Dialog header</h1>
            <button onClick={() => setMessage(undefined)}>✖</button>
          </header>
          <section style={{ width: '70vw', height: '70vh', overflow: 'auto' }}>
            {message && (
              <ReactJson
                style={{ padding: '1rem 2rem' }}
                src={JSON.parse(message.value)}
                theme="ashes"
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
                name={null}
              />
            )}
          </section>
          <footer>
            <button onClick={() => setMessage(undefined)}>Close</button>
          </footer>
        </dialog>
      </main>
    </>
  )
}
