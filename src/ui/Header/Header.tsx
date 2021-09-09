import { CommandBar, ICommandBarItemProps, ThemeProvider } from '@fluentui/react'
import { createTheme } from '@fluentui/style-utilities'
import openBrowser from 'open'
import React, { useCallback, useMemo, useState } from 'react'
import { settings } from '../../settings'
import { Connection } from '../Connection/Connection'
import { Group } from '../Group/Group'
import { Info } from '../Info/Info'

function useItems(): [ICommandBarItemProps[], 'connection' | 'group' | undefined, () => void] {
  const [open, setOpen] = useState<'connection' | 'group'>()

  const items = useMemo(() => {
    return [
      {
        key: 'connection',
        text: 'Create connection',
        iconProps: { iconName: 'Add' },
        onClick: () => setOpen('connection'),
      },
      {
        key: 'group',
        text: 'Create group',
        iconProps: { iconName: 'Add' },
        onClick: () => setOpen('group'),
      },
    ]
  }, [])

  return [items, open, () => setOpen(undefined)]
}

function useFarItems(): [ICommandBarItemProps[], boolean, () => void] {
  const [open, setOpen] = useState(false)

  const items = useMemo(
    () => [
      {
        key: 'config',
        text: 'Config',
        ariaLabel: 'Config',
        iconProps: { iconName: 'ConfigurationSolid' },
        iconOnly: true,
        onClick: () => openBrowser(settings.configDir),
      },
      {
        key: 'info',
        text: 'Info',
        ariaLabel: 'Info',
        iconProps: { iconName: 'Info' },
        iconOnly: true,
        onClick: () => setOpen(true),
      },
    ],
    []
  )

  const toggle = useCallback(() => setOpen((open) => !open), [])

  return [items, open, toggle]
}

export function Header(): JSX.Element {
  const [items, modalOpen, dismissModal] = useItems()
  const [farItems, infoOpen, toggleInfo] = useFarItems()

  return (
    <>
      <ThemeProvider theme={commandBarTheme}>
        <CommandBar items={items} farItems={farItems} styles={{ root: { borderBottom: '1px solid #eee' } }} />
      </ThemeProvider>
      {modalOpen === 'connection' && <Connection onDismiss={dismissModal} />}
      {modalOpen === 'group' && <Group onDismiss={dismissModal} />}
      <Info open={infoOpen} toggle={toggleInfo} />
    </>
  )
}

const commandBarTheme = createTheme({
  palette: {
    themePrimary: '#303030',
    themeLighterAlt: '#060606',
    themeLighter: '#0b0b0b',
    themeLight: '#101010',
    themeTertiary: '#161616',
    themeSecondary: '#1b1b1b',
    themeDarkAlt: '#202020',
    themeDark: '#262626',
    themeDarker: '#2b2b2b',
    neutralLighterAlt: '#09d3b5',
    neutralLighter: '#11d5b8',
    neutralLight: '#1fd8bc',
    neutralQuaternaryAlt: '#28dabf',
    neutralQuaternary: '#2fdbc1',
    neutralTertiaryAlt: '#4fe1cb',
    neutralTertiary: '#101010',
    neutralSecondary: '#161616',
    neutralPrimaryAlt: '#1b1b1b',
    neutralPrimary: '#303030',
    neutralDark: '#262626',
    black: '#2b2b2b',
    white: '#00D1B2',
  },
})
