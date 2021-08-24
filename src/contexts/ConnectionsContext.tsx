import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { IConnection } from '../models/IConnection'
import { settings } from '../settings'

const config = path.join(settings.configDir, 'config.json')

function getConnections(): IConnection[] {
  if (!existsSync(settings.configDir)) mkdirSync(settings.configDir)
  if (!existsSync(config)) writeFileSync(config, '[]', 'utf8')
  const content = readFileSync(config, 'utf8')
  return JSON.parse(content)
}

type ConnectionsContext = {
  connections: IConnection[]
  getConnection: (index?: number | string) => IConnection | undefined
  saveConnection: (connection: IConnection, index?: number | string) => void
  deleteConnection: (index: number) => void
}

export const ConnectionsContext = createContext<ConnectionsContext>({
  connections: [],
  getConnection: () => undefined,
  saveConnection: () => undefined,
  deleteConnection: () => undefined,
})

export function ConnectionsProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const [connections, setConnections] = useState<IConnection[]>(getConnections())

  useEffect(() => {
    writeFileSync(config, JSON.stringify(connections), 'utf8')
  }, [connections])

  const getConnection = useCallback(
    (index?: number | string) => (index === undefined ? undefined : connections[Number(index)]),
    [connections]
  )

  const saveConnection = useCallback((connection: IConnection, index?: number | string) => {
    if (index === undefined) setConnections((connections) => [...connections, connection])
    else
      setConnections((connections) => [
        ...connections.slice(0, Number(index)),
        connection,
        ...connections.slice(Number(index) + 1),
      ])
  }, [])

  const deleteConnection = useCallback((index: number) => {
    setConnections((connections) => [...connections.slice(0, index), ...connections.slice(index + 1)])
  }, [])

  return (
    <ConnectionsContext.Provider value={{ connections, getConnection, saveConnection, deleteConnection }}>
      {children}
    </ConnectionsContext.Provider>
  )
}
