import { FontIcon, getTheme, IRawStyle, ITheme, mergeStyleSets, NeutralColors, Stack } from '@fluentui/react'
import React, { useContext, useState } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { IConnection, isConnection } from '../../models/IConnection'
import { IGroup } from '../../models/IGroup'
import { Connection } from '../Connection/Connection'

const { palette, semanticColors, fonts }: ITheme = getTheme()

const hover: IRawStyle = { cursor: 'pointer', selectors: { '&:hover': { background: palette.neutralLight } } }

const classNames = mergeStyleSets({
  navigation: [
    {
      width: 300,
      borderRight: `1px solid ${semanticColors.bodyDivider}`,
      backgroundColor: NeutralColors.gray20,
      overflow: 'auto',
    },
  ],
  name: [
    fonts.medium,
    hover,
    { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0.8rem 1rem', flex: 1 },
  ],
  icon: [fonts.medium, hover, { padding: '0.8rem 0.6rem' }],
})

export function NavPanel(): JSX.Element {
  const [item, setItem] = useState<IGroup>()

  return (
    <Stack className={classNames.navigation}>
      <Tree root="root" onItemEdit={setItem} />
      {isConnection(item) && <Connection connection={item} onDismiss={() => setItem(undefined)} />}
    </Stack>
  )
}

interface INavItemProps {
  item: IGroup
  editConnection: (connection: IGroup) => void
}

function NavItem({ item: connection, editConnection }: INavItemProps) {
  const { dispatch } = useContext(ConfigContext)
  const { key, name } = connection

  return (
    <Stack horizontal key={key}>
      <div className={classNames.name} onClick={() => dispatch({ type: 'open', key })}>
        {name}
      </div>
      <FontIcon iconName="Edit" className={classNames.icon} onClick={() => editConnection(connection)} />
      <FontIcon iconName="Delete" className={classNames.icon} onClick={() => dispatch({ type: 'delete', key })} />
      <FontIcon iconName="Copy" className={classNames.icon} onClick={() => dispatch({ type: 'copy', key })} />
    </Stack>
  )
}

interface ITreeProps {
  root: string
  onItemEdit: (item: IGroup) => void
}

function Tree({ root, onItemEdit }: ITreeProps) {
  const { config, getItem } = useContext(ConfigContext)

  const item = getItem(root)
  const items = config.tree[root]

  return (
    <>
      {item && <NavItem key={root} item={item} editConnection={onItemEdit} />}
      {items?.length && (
        <Stack styles={{ root: { marginLeft: 5 } }}>
          {items.map((item) => (
            <Tree key={item} root={item} onItemEdit={onItemEdit} />
          ))}
        </Stack>
      )}
    </>
  )
}
