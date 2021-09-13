import { Stack, ThemeProvider } from '@fluentui/react'
import { ipcRenderer } from 'electron'
import React, { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ConfigProvider } from '../contexts/ConfigContext'
import { darkTheme, lightTheme } from '../theme'
import { Connections } from './Connections/Connections'
import { Header } from './Header/Header'
import { NavPanel } from './NavPanel/NavPanel'

export function App(): JSX.Element {
  const [useDarkTheme, setUseDarkTheme] = useState(false)

  useEffect(() => {
    ipcRenderer.on('theme', function (evt, { useDarkTheme }) {
      setUseDarkTheme(useDarkTheme)
    })
  }, [])

  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
      <ConfigProvider>
        <MemoryRouter>
          <Stack styles={{ root: { height: '100vh' } }}>
            <Header />
            <Stack horizontal styles={{ root: { flex: 1, overflow: 'hidden' } }}>
              <NavPanel />
              <Connections />
            </Stack>
          </Stack>
        </MemoryRouter>
      </ConfigProvider>
    </ThemeProvider>
  )
}
