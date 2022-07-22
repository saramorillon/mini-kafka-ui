import { useCallback, useState } from 'react'
import { IMessageFilters } from '../models/IMessage'

export function useFilters(): [IMessageFilters, (name: string, value: string) => void] {
  const [filters, setFilters] = useState<IMessageFilters>({})

  const onFilter = useCallback((name: string, value: string) => {
    setFilters((filters) => ({ ...filters, [name]: value }))
  }, [])

  return [filters, onFilter]
}
