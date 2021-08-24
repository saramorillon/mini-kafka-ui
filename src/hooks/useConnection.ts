import { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../contexts/ConnectionsContext'
import { IConnection } from '../models/IConnection'

export function useConnection(id: string | number): IConnection | undefined {
  const { getConnection } = useContext(ConnectionsContext)
  const [connection, setConnection] = useState<IConnection>()

  useEffect(() => {
    setConnection(getConnection(id))
  }, [id, getConnection])

  return connection
}
