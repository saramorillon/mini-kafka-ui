import { useFetch } from '@saramorillon/hooks'
import React, { createContext, PropsWithChildren, useCallback } from 'react'
import { IServer } from '../models/IServer'
import { deleteServer, getServers, saveServer } from '../services/server'
import { LoadContainer } from '../ui/components/LoadContainer'

interface IServersContext {
  servers: Record<string, IServer>
  saveServer: (server: IServer) => Promise<void>
  deleteServer: (server: IServer) => Promise<void>
}

export const ServersContext = createContext<IServersContext>({
  servers: {},
  saveServer: () => Promise.resolve(undefined),
  deleteServer: () => Promise.resolve(undefined),
})

export function ServersProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const [servers, { loading }, refresh] = useFetch(getServers, {})

  const onSave = useCallback((server: IServer) => saveServer(server).then(refresh), [refresh])
  const onDelete = useCallback((server: IServer) => deleteServer(server).then(refresh), [refresh])

  return (
    <ServersContext.Provider value={{ servers, saveServer: onSave, deleteServer: onDelete }}>
      <LoadContainer loading={loading}>{children}</LoadContainer>
    </ServersContext.Provider>
  )
}
