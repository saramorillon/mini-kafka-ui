import { Stack } from '@fluentui/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ConnectionsProvider } from '../contexts/ConnectionsContext'
import { Connections } from './Connections/Connections'
import { Header } from './Header/Header'
import { NavPanel } from './NavPanel/NavPanel'

export function App(): JSX.Element {
  return (
    <ConnectionsProvider>
      <MemoryRouter>
        <Stack styles={{ root: { height: '100vh' } }}>
          <Header />
          <Stack horizontal styles={{ root: { flex: 1, overflow: 'hidden' } }}>
            <NavPanel />
            <Connections />
          </Stack>
        </Stack>
      </MemoryRouter>
    </ConnectionsProvider>
  )
}
