import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import React, { createContext, Dispatch, PropsWithChildren, useCallback, useEffect, useMemo, useReducer } from 'react'
import { IConnection } from '../models/IConnection'
import { Action, configReducer, IConfig } from '../reducers/config'
import { settings } from '../settings'

const configFile = path.join(settings.configDir, 'config.json')

function getConfig(): IConfig {
  if (!existsSync(settings.configDir)) mkdirSync(settings.configDir)
  if (!existsSync(configFile)) writeFileSync(configFile, '[]', 'utf8')
  const content = readFileSync(configFile, 'utf8')
  return JSON.parse(content)
}

type ConnectionsContext = {
  connections: IConnection[]
  openConnections: IConnection[]
  activeConnection?: string
  getConnection: (key?: string) => IConnection | undefined
  dispatch: Dispatch<Action>
}

export const ConnectionsContext = createContext<ConnectionsContext>({
  connections: [],
  openConnections: [],
  activeConnection: undefined,
  getConnection: () => undefined,
  dispatch: () => undefined,
})

export function ConnectionsProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const [config, dispatch] = useReducer(configReducer, getConfig())
  const openConnections = useMemo(() => config.connections.filter((connection) => connection.open), [config])

  useEffect(() => {
    writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf8')
  }, [config])

  const getConnection = useCallback(
    (key?: string) => config.connections.find((connection) => connection.key === key),
    [config]
  )

  return (
    <ConnectionsContext.Provider
      value={{
        connections: config.connections,
        openConnections,
        activeConnection: config.activeConnection,
        getConnection,
        dispatch,
      }}
    >
      {children}
    </ConnectionsContext.Provider>
  )
}
