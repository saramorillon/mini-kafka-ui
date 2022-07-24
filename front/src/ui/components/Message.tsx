import { useFetch, usePagination } from '@saramorillon/hooks'
import { fromUnixTime } from 'date-fns'
import React, { useCallback, useMemo } from 'react'
import { IMessage } from '../../models/IMessage'
import { getMessages } from '../../services/message'
import { Pagination } from './Pagination'
import { IColumn, Table } from './Table'

const limit = 10

interface IMessagesProps {
  partition: number
}

export function Messages({ partition }: IMessagesProps) {
  const pagination = usePagination()
  const { page, goTo } = pagination

  // const [customColumns, onColumnAdd, onColumnDelete] = useCustomColumns()
  // const [filters, onFilter] = useFilters()

  const fetch = useCallback(() => getMessages(partition, {}, page, limit), [partition, page])
  const [messages, { loading, error }] = useFetch(fetch, [])
  // const [message, setMessage] = useState<IMessage>()

  // useEffect(() => {
  //   goTo(1)
  // }, [goTo, filters])

  const columns: IColumn<IMessage>[] = useMemo(
    () => [
      {
        header: 'Partition',
        cell: ({ partition }) => partition,
      },
      {
        header: 'Offset',
        cell: ({ offset }) => offset,
      },
      {
        header: 'Timestamp',
        cell: ({ timestamp }) => fromUnixTime(Number(timestamp) / 1000).toISOString(),
        props: { className: 'nowrap' },
      },
      {
        header: 'Key',
        cell: ({ key }) => key,
      },
      {
        header: 'Value',
        cell: ({ value }) => value,
        props: { className: 'truncate', style: { width: 500, maxWidth: 500 } },
      },
      // ...customColumns.map((column) => ({
      //   header: <DeletableColumn name={column} onClick={() => onColumnDelete(column)} />,
      //   cell: (message: IMessage) => JSON.stringify(get(JSON.parse(message.value), column)),
      //   props: { className: 'truncate', style: { maxWidth: 200 } },
      // })),
      // {
      //   header: '',
      //   cell: (message) => <ActionCell message={message} onClick={() => setMessage(message)} />,
      //   props: { className: 'nowrap' },
      // },
    ],
    []
  )

  return (
    <>
      {/* <AddColumnForm onColumnAdd={onColumnAdd} /> */}
      <Table columns={columns} rows={messages} loading={loading || !messages.length} error={error} />
      <Pagination pagination={pagination} />
      {/* <MessageDialog message={message} onClose={() => setMessage(undefined)} /> */}
    </>
  )
}

// interface IAddColumnFormProps {
//   onColumnAdd: (column: string) => void
// }

// function AddColumnForm({ onColumnAdd }: IAddColumnFormProps) {
//   const [column, setColumn] = useState('')

//   const onSubmit = useCallback(
//     (e: FormEvent) => {
//       e.preventDefault()
//       onColumnAdd(column)
//     },
//     [column, onColumnAdd]
//   )

//   return (
//     <form onSubmit={onSubmit} className="flex justify-end items-center mb2">
//       <input value={column} onChange={(e) => setColumn(e.target.value)} placeholder="Path" required />
//       <button>Add column</button>
//     </form>
//   )
// }

// interface IFilterProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
//   name: string
//   filters: Record<string, string>
//   onFilter: (name: string, value: string) => void
// }

// function Filter({ name, filters, onFilter, ...props }: IFilterProps) {
//   return <input value={filters[name] || ''} onChange={(e) => onFilter(name, e.target.value)} {...props} />
// }

// interface IDeletableColumnProps {
//   name: string
//   onClick: () => void
// }

// function DeletableColumn({ name, onClick }: IDeletableColumnProps) {
//   return (
//     <>
//       {name}
//       <button className="ml1 p0" onClick={onClick}>
//         <X />
//       </button>
//     </>
//   )
// }

// interface IActionCellProps {
//   message: IMessage
//   onClick: () => void
// }

// function ActionCell({ message, onClick }: IActionCellProps) {
//   const [authorized, , copy] = useCopy()

//   return (
//     <>
//       <button onClick={onClick}>
//         <Eye />
//       </button>
//       <button onClick={() => copy(message.value)} disabled={!authorized}>
//         <Clipboard />
//       </button>
//     </>
//   )
// }
