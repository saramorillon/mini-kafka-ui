import { Divider, GlobalStyles, Stack, ThemeProvider } from '@mui/material'
import { ipcRenderer } from 'electron'
import React, { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ConfigProvider } from '../contexts/ConfigContext'
import { darkTheme, lightTheme } from '../theme'
import { Header } from './Header/Header'
import { NavPanel } from './NavPanel/NavPanel'
import { ActiveTabs } from './Tabs/Tabs'

export function App(): JSX.Element {
  const [useDarkTheme, setUseDarkTheme] = useState(false)

  useEffect(() => {
    ipcRenderer.on('theme', function (evt, { useDarkTheme }) {
      setUseDarkTheme(useDarkTheme)
    })
  }, [])

  return (
    <>
      <GlobalStyles styles={{ ':root': { colorScheme: useDarkTheme ? 'dark' : 'light' } }} />
      <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
        <ConfigProvider>
          <MemoryRouter>
            <Stack sx={{ height: '100vh' }}>
              <Header />
              <Stack direction="row" sx={{ flex: 1, maxWidth: '100vw', overflow: 'hidden' }}>
                <NavPanel />
                <Divider orientation="vertical" />
                <ActiveTabs />
              </Stack>
            </Stack>
          </MemoryRouter>
        </ConfigProvider>
      </ThemeProvider>
    </>
  )
}
