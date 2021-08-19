import { CommandBar, ICommandBarItemProps } from '@fluentui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Info } from '../Info/Info'

function useItems(): ICommandBarItemProps[] {
  const history = useHistory()

  return useMemo(() => {
    return [
      {
        key: 'connection',
        text: 'Create connection',
        iconProps: { iconName: 'Add' },
        onClick: () => history.push('/connection'),
      },
    ]
  }, [history])
}

function useFarItems(): [ICommandBarItemProps[], boolean, () => void] {
  const [open, setOpen] = useState(false)

  const items = useMemo(
    () => [
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
  const items = useItems()
  const [farItems, open, toggle] = useFarItems()

  return (
    <>
      <CommandBar items={items} farItems={farItems} styles={{ root: { borderBottom: '1px solid #eee' } }} />
      <Info open={open} toggle={toggle} />
    </>
  )
}
