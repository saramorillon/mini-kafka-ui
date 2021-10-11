import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import React, { createContext, Dispatch, PropsWithChildren, useCallback, useEffect, useMemo, useReducer } from 'react'
import { IConfig } from '../models/IConfig'
import { IConnection } from '../models/IConnection'
import { IGroup } from '../models/IGroup'
import { Action, configReducer } from '../reducers/config'
import { settings } from '../settings'

const configFile = path.join(settings.configDir, 'config.json')
const emptyConfig = { connections: [], groups: [] }

function getConfig(): IConfig {
  if (!existsSync(settings.configDir)) mkdirSync(settings.configDir)
  if (!existsSync(configFile)) writeFileSync(configFile, JSON.stringify(emptyConfig), 'utf8')
  const content = readFileSync(configFile, 'utf8')
  return JSON.parse(content)
}

type ConnectionsContext = {
  config: IConfig
  connections: IConnection[]
  openConnections: IConnection[]
  activeConnection?: string
  getItem: (key?: string) => IGroup | undefined
  getChildren: (parent: string) => IGroup[]
  dispatch: Dispatch<Action>
}

export const ConfigContext = createContext<ConnectionsContext>({
  config: emptyConfig,
  connections: [],
  openConnections: [],
  activeConnection: undefined,
  getItem: () => undefined,
  getChildren: () => [],
  dispatch: () => undefined,
})

export function ConfigProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const [config, dispatch] = useReducer(configReducer, getConfig())
  const openConnections = useMemo(() => config.connections.filter((connection) => connection.open), [config])

  useEffect(() => {
    writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf8')
  }, [config])

  const getItem = useCallback(
    (key?: string) =>
      config.connections.find((connection) => connection.key === key) ||
      config.groups.find((group) => group.key === key),
    [config]
  )

  const getChildren = useCallback(
    (parent: string) => {
      return [...config.connections, ...config.groups].filter((connection) => connection.parent === parent)
    },
    [config]
  )

  return (
    <ConfigContext.Provider
      value={{
        config,
        connections: config.connections,
        openConnections,
        activeConnection: config.activeConnection,
        getItem,
        getChildren,
        dispatch,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
