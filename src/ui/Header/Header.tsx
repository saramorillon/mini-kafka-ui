import { CommandBar, ICommandBarItemProps } from '@fluentui/react'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

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

export function Header(): JSX.Element {
  const items = useItems()

  return <CommandBar items={items} styles={{ root: { borderBottom: '1px solid #eee' } }} />
}
