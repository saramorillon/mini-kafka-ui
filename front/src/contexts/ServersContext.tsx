import { useFetch } from '@saramorillon/hooks'
import React, { createContext, PropsWithChildren, useCallback } from 'react'
import { IServer } from '../models/IServer'
import { getServers, saveServer } from '../services/server'
import { LoadContainer } from '../ui/components/LoadContainer'

interface IServersContext {
  servers: IServer[]
  saveServer: (server: IServer) => Promise<void>
}

export const ServersContext = createContext<IServersContext>({
  servers: [],
  saveServer: () => Promise.resolve(undefined),
})

export function ServersProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const [servers, { loading }, refresh] = useFetch(getServers, [])

  const save = useCallback((server: IServer) => saveServer(server).then(refresh), [refresh])

  return (
    <ServersContext.Provider value={{ servers, saveServer: save }}>
      <LoadContainer loading={loading}>{children}</LoadContainer>
    </ServersContext.Provider>
  )
}
