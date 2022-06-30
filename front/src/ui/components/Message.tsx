import { useCopy, usePagination } from '@saramorillon/hooks'
import { Clipboard, Eye, X } from '@styled-icons/feather'
import { fromUnixTime } from 'date-fns'
import { ipcRenderer } from 'electron'
import get from 'lodash.get'
import React, { FormEvent, InputHTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react'
import { useConsumer } from '../../hooks/useConsumer'
import { useCustomColumns } from '../../hooks/useCustomColumns'
import { useFilters } from '../../hooks/useFilters'
import { IMessage } from '../../models/IMessage'
import { getMessages } from '../../services/message'
import { MessageDialog } from './MessageDialog'
import { Pagination } from './Pagination'
import { IColumn, Table } from './Table'

const limit = 10

interface IMessagesProps {
  serverKey: string
  topic: string
}

export function Messages({ serverKey, topic }: IMessagesProps) {
  const { loading, error } = useConsumer(serverKey, topic)

  const pagination = usePagination()
  const { page, setMaxPage, goTo } = pagination

  const [customColumns, onColumnAdd, onColumnDelete] = useCustomColumns()
  const [filters, onFilter] = useFilters()

  const [messages, setMessages] = useState<IMessage[]>([])
  const [message, setMessage] = useState<IMessage>()

  useEffect(() => {
    goTo(1)
  }, [goTo, filters])

  useEffect(() => {
    void getMessages(filters, page, limit)
  }, [filters, page])

  useEffect(() => {
    ipcRenderer.on('total', (event, total) => setMaxPage(Math.ceil(total / limit)))
  }, [setMaxPage])

  useEffect(() => {
    ipcRenderer.on('messages', (event, messages) => setMessages(messages))
  }, [])

  const columns: IColumn<IMessage>[] = useMemo(
    () => [
      {
        header: 'Partition',
        filter: <Filter type="number" name="partition" filters={filters} onFilter={onFilter} style={{ width: 100 }} />,
        cell: ({ partition }) => partition,
      },
      {
        header: 'Offset',
        filter: <Filter name="offset" filters={filters} onFilter={onFilter} style={{ width: 100 }} />,
        cell: ({ offset }) => offset,
      },
      {
        header: 'Timestamp',
        filter: <Filter type="date" name="timestamp" filters={filters} onFilter={onFilter} />,
        cell: ({ timestamp }) => fromUnixTime(Number(timestamp) / 1000).toISOString(),
        props: { className: 'nowrap' },
      },
      {
        header: 'Key',
        filter: <Filter name="key" filters={filters} onFilter={onFilter} style={{ width: 120 }} />,
        cell: ({ key }) => key,
      },
      {
        header: 'Value',
        filter: <Filter name="value" filters={filters} onFilter={onFilter} />,
        cell: ({ value }) => value,
        props: { className: 'truncate', style: { width: 500, maxWidth: 500 } },
      },
      ...customColumns.map((column) => ({
        header: <DeletableColumn name={column} onClick={() => onColumnDelete(column)} />,
        cell: (message: IMessage) => JSON.stringify(get(JSON.parse(message.value), column)),
        props: { className: 'truncate', style: { maxWidth: 200 } },
      })),
      {
        header: '',
        cell: (message) => <ActionCell message={message} onClick={() => setMessage(message)} />,
        props: { className: 'nowrap' },
      },
    ],
    [customColumns, onColumnDelete, filters, onFilter]
  )

  return (
    <>
      <AddColumnForm onColumnAdd={onColumnAdd} />
      <Table columns={columns} rows={messages} loading={loading} error={error} />
      <Pagination pagination={pagination} />
      <MessageDialog message={message} onClose={() => setMessage(undefined)} />
    </>
  )
}

interface IAddColumnFormProps {
  onColumnAdd: (column: string) => void
}

function AddColumnForm({ onColumnAdd }: IAddColumnFormProps) {
  const [column, setColumn] = useState('')

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onColumnAdd(column)
    },
    [column, onColumnAdd]
  )

  return (
    <form onSubmit={onSubmit} className="flex justify-end items-center mb2">
      <input value={column} onChange={(e) => setColumn(e.target.value)} placeholder="Path" required />
      <button>Add column</button>
    </form>
  )
}

interface IFilterProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string
  filters: Record<string, string>
  onFilter: (name: string, value: string) => void
}

function Filter({ name, filters, onFilter, ...props }: IFilterProps) {
  return <input value={filters[name] || ''} onChange={(e) => onFilter(name, e.target.value)} {...props} />
}

interface IDeletableColumnProps {
  name: string
  onClick: () => void
}

function DeletableColumn({ name, onClick }: IDeletableColumnProps) {
  return (
    <>
      {name}
      <button className="ml1 p0" onClick={onClick}>
        <X />
      </button>
    </>
  )
}

interface IActionCellProps {
  message: IMessage
  onClick: () => void
}

function ActionCell({ message, onClick }: IActionCellProps) {
  const [authorized, , copy] = useCopy()

  return (
    <>
      <button onClick={onClick}>
        <Eye />
      </button>
      <button onClick={() => copy(message.value)} disabled={!authorized}>
        <Clipboard />
      </button>
    </>
  )
}
