import { Global } from '@emotion/react'
import { Divider, Stack, ThemeProvider } from '@mui/material'
import { useTheme } from '@saramorillon/hooks'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ConfigProvider } from '../contexts/ConfigContext'
import { darkTheme, lightTheme } from '../theme'
import { Header } from './Header/Header'
import { NavPanel } from './NavPanel/NavPanel'
import { ActiveTabs } from './Tabs/Tabs'

export function App(): JSX.Element {
  const theme = useTheme()

  return (
    <>
      <Global styles={{ html: { backgroundColor: theme === 'dark' ? '#202020' : '#dfdfdf' } }} />
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
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
