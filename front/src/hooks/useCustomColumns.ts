import { useCallback, useMemo, useState } from 'react'

export function useCustomColumns(): [string[], (column: string) => void, (column: string) => void] {
  const [columns, setColumns] = useState<string[]>([])

  const onColumnAdd = useCallback((column: string) => {
    setColumns((columns) => (columns.includes(column) ? columns : [...columns, column]))
  }, [])

  const onColumnDelete = useCallback((column: string) => {
    setColumns((columns) => columns.filter((c) => c !== column))
  }, [])

  return useMemo(() => [columns, onColumnAdd, onColumnDelete], [columns, onColumnAdd, onColumnDelete])
}
