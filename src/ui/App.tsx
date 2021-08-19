import { Global } from '@emotion/react'
import { Stack } from '@fluentui/react'
import { Consumer } from 'kafkajs'
import React, { useState } from 'react'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import { ConnectionsProvider } from '../contexts/ConnectionsContext'
import { Connection } from './Connection'
import { Header } from './Header'
import { Messages } from './Messages'
import { NavPanel } from './NavPanel'

export function App(): JSX.Element {
  const [consumer, setConsumer] = useState<Consumer>()

  // const onSubmit = useCallback(
  //   (e) => {
  //     e.preventDefault()
  //     if (consumer) {
  //       consumer.disconnect()
  //       setConsumer(undefined)
  //     } else if (topic) {
  //       createConsumer(brokers[env], topic, v4()).then(setConsumer)
  //     }
  //   },
  //   [consumer, env, topic]
  // )

  return (
    <ConnectionsProvider>
      <MemoryRouter>
        <Global styles={{ body: { margin: 0 } }} />
        <Stack styles={{ root: { height: '100vh' } }}>
          <Header />
          <Stack horizontal styles={{ root: { flex: 1 } }}>
            <NavPanel />
            <Switch>
              <Route exact path="/connection/:id?" component={Connection} />
            </Switch>
            {consumer && <Messages consumer={consumer} />}
          </Stack>
        </Stack>
      </MemoryRouter>
    </ConnectionsProvider>
  )
}
