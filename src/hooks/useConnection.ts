import { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../contexts/ConnectionsContext'
import { IConnection } from '../models/IConnection'

export function useConnection(key?: string): IConnection | undefined {
  const { getConnection } = useContext(ConnectionsContext)
  const [connection, setConnection] = useState<IConnection>()

  useEffect(() => {
    setConnection(getConnection(key))
  }, [key, getConnection])

  return connection
}
