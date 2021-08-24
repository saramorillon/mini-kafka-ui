import { Stack } from '@fluentui/react'
import React from 'react'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import { ConnectionsProvider } from '../contexts/ConnectionsContext'
import { Connection } from './Connections/Connection'
import { Header } from './Header/Header'
import { Messages } from './Messages/Messages'
import { NavPanel } from './NavPanel/NavPanel'

export function App(): JSX.Element {
  return (
    <ConnectionsProvider>
      <MemoryRouter>
        <Stack styles={{ root: { height: '100vh' } }}>
          <Header />
          <Stack horizontal styles={{ root: { flex: 1 } }}>
            <NavPanel />
            <div style={{ flex: 1 }}>
              <Switch>
                <Route exact path="/connection/:id?" component={Connection} />
                <Route exact path="/consumer/:id?" component={Messages} />
              </Switch>
            </div>
          </Stack>
        </Stack>
      </MemoryRouter>
    </ConnectionsProvider>
  )
}
