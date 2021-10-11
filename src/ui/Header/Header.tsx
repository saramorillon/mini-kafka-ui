import { CommandBar, ICommandBarItemProps } from '@fluentui/react'
import openBrowser from 'open'
import React, { useCallback, useMemo, useState } from 'react'
import { getDefaultConnection } from '../../models/IConnection'
import { getDefaultGroup } from '../../models/IGroup'
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
      <CommandBar items={items} farItems={farItems} styles={{ root: { borderBottom: '1px solid #eee' } }} />
      {modalOpen === 'connection' && <Connection connection={getDefaultConnection()} onDismiss={dismissModal} />}
      {modalOpen === 'group' && <Group group={getDefaultGroup()} onDismiss={dismissModal} />}
      <Info open={infoOpen} toggle={toggleInfo} />
    </>
  )
}
