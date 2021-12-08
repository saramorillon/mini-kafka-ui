import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from 'react'
import { IConfig } from '../models/IConfig'
import { Action, configReducer } from '../reducers/config'
import { settings } from '../settings'

const configFile = path.join(settings.configDir, 'config.json')
const emptyConfig = { servers: [], openItems: [] }

function getConfig(): IConfig {
  if (!existsSync(settings.configDir)) mkdirSync(settings.configDir)
  if (!existsSync(configFile)) writeFileSync(configFile, JSON.stringify(emptyConfig), 'utf8')
  const content = readFileSync(configFile, 'utf8')
  return JSON.parse(content)
}

type ConnectionsContext = {
  config: IConfig
  dispatch: Dispatch<Action>
}

export const ConfigContext = createContext<ConnectionsContext>({
  config: emptyConfig,
  dispatch: () => undefined,
})

export function ConfigProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const [config, dispatch] = useReducer(configReducer, getConfig())

  useEffect(() => {
    writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf8')
  }, [config])

  return <ConfigContext.Provider value={{ config, dispatch }}>{children}</ConfigContext.Provider>
}
