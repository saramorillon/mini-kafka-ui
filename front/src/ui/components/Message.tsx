import { useCopy, usePagination } from '@saramorillon/hooks'
import { Clipboard, Eye, List, X } from '@styled-icons/feather'
import { fromUnixTime, parseISO } from 'date-fns'
import get from 'lodash.get'
import React, { FormEvent, InputHTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react'
import { useConsumer } from '../../hooks/useConsumer'
import { useCustomColumns } from '../../hooks/useCustomColumns'
import { useFilters } from '../../hooks/useFilters'
import { IMessage } from '../../models/IMessage'
import { MessageDialog } from './MessageDialog'
import { Pagination } from './Pagination'
import { IColumn, Table } from './Table'

const limit = 10

interface IMessagesProps {
  serverKey: string
  topic: string
}

export function Messages({ serverKey, topic }: IMessagesProps) {
  const pagination = usePagination()
  const { page, setMaxPage, goTo } = pagination

  const [customColumns, onColumnAdd, onColumnDelete] = useCustomColumns()
  const [filters, onFilter] = useFilters()
  const [message, setMessage] = useState<IMessage>()

  const allMessages = useConsumer(serverKey, topic)

  const filteredMessages = useMemo(
    () =>
      allMessages.filter(
        (message) =>
          (!filters.partition || message.partition.toString() === filters.partition) &&
          (!filters.offset || message.offset === filters.offset) &&
          (!filters.date || message.timestamp > parseISO(filters.date).getTime()) &&
          (!filters.key || message.key?.toLowerCase().includes(filters.key.toLowerCase())) &&
          (!filters.value || message.value.toLowerCase().includes(filters.value?.toLowerCase()))
      ),
    [allMessages, filters]
  )

  useEffect(() => {
    goTo(1)
  }, [goTo, filters])

  useEffect(() => {
    setMaxPage(Math.ceil(filteredMessages.length / limit))
  }, [filteredMessages, setMaxPage])

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
        cell: ({ timestamp }) => fromUnixTime(timestamp / 1000).toISOString(),
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
        props: { className: 'truncate', style: { maxWidth: 500 } },
      },
      ...customColumns.map((column) => ({
        header: <DeletableColumn name={column} onClick={() => onColumnDelete(column)} />,
        cell: (message: IMessage) => JSON.stringify(get(JSON.parse(message.value), column)),
        props: { className: 'truncate', style: { maxWidth: 500 } },
      })),
      {
        header: '',
        cell: (message) => <ActionCell message={message} onClick={() => setMessage(message)} />,
        props: { className: 'nowrap' },
      },
    ],
    [customColumns, onColumnDelete, filters, onFilter]
  )
  const rows = useMemo(() => filteredMessages.slice((page - 1) * limit, page * limit), [filteredMessages, page])

  return (
    <>
      <header>
        <h1>
          <List /> {topic}
        </h1>
      </header>
      <main>
        <AddColumnForm onColumnAdd={onColumnAdd} />
        <Table columns={columns} rows={rows} loading={!allMessages.length} />
        <Pagination pagination={pagination} />
        <MessageDialog message={message} onClose={() => setMessage(undefined)} />
      </main>
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
