import { useCallback, useState } from 'react'

export function useFilters(
  key: string,
  topic: string
): [Record<string, string>, (name: string, value: string) => void] {
  const [filters, setFilters] = useState<Record<string, string>>({ server: key, topic })

  const onFilter = useCallback((name: string, value: string) => {
    setFilters((filters) => ({ ...filters, [name]: value }))
  }, [])

  return [filters, onFilter]
}
