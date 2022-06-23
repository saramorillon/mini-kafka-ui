import { useCallback, useState } from 'react'

export function useFilters(): [Record<string, string>, (name: string, value: string) => void] {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const onFilter = useCallback((name: string, value: string) => {
    setFilters((filters) => ({ ...filters, [name]: value }))
  }, [])

  return [filters, onFilter]
}
