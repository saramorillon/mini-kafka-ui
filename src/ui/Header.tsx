import { CommandBar, ICommandBarItemProps } from '@fluentui/react'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

const items: ICommandBarItemProps[] = [
  { key: 'connection', text: 'Create connection', iconProps: { iconName: 'Add' }, href: '/connection' },
  {
    key: 'file',
    text: 'File',
    iconProps: { iconName: 'Page' },
    subMenuProps: {
      items: [
        { key: 'new', text: 'New', iconProps: { iconName: 'PageAdd' } },
        { key: 'open', text: 'Open', iconProps: { iconName: 'OpenFile' } },
        { key: 'save', text: 'Save', iconProps: { iconName: 'Save' } },
      ],
    },
  },
  { key: 'upload', text: 'Upload', iconProps: { iconName: 'Upload' } },
  { key: 'share', text: 'Share', iconProps: { iconName: 'Share' } },
  { key: 'download', text: 'Download', iconProps: { iconName: 'Download' } },
]

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
