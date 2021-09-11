import {
  ActionButton,
  ContextualMenu,
  getTheme,
  IContextualMenuItem,
  ITheme,
  mergeStyleSets,
  NeutralColors,
  Stack,
} from '@fluentui/react'
import React, { useContext, useMemo, useRef, useState } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { isConnection } from '../../models/IConnection'
import { IGroup } from '../../models/IGroup'
import { ITree } from '../../models/ITree'
import { Connection } from '../Connection/Connection'
import { Group } from '../Group/Group'

const { semanticColors }: ITheme = getTheme()

const classNames = mergeStyleSets({
  navigation: [
    {
      width: 300,
      borderRight: `1px solid ${semanticColors.bodyDivider}`,
      backgroundColor: NeutralColors.gray20,
      overflow: 'auto',
      paddingLeft: '0.5rem',
    },
  ],
  submenu: [
    {
      marginLeft: '1rem',
      paddingLeft: '1rem',
      borderLeft: `1px solid ${NeutralColors.gray40}`,
    },
  ],
})

export function NavPanel(): JSX.Element {
  const [item, setItem] = useState<IGroup>()

  return (
    <Stack className={classNames.navigation}>
      <Tree parent="root" onItemEdit={setItem} />
      {item &&
        (isConnection(item) ? (
          <Connection connection={item} onDismiss={() => setItem(undefined)} />
        ) : (
          <Group group={item} onDismiss={() => setItem(undefined)} />
        ))}
    </Stack>
  )
}

interface ITreeProps {
  parent: keyof ITree
  onItemEdit: (item: IGroup) => void
}

function Tree({ parent, onItemEdit }: ITreeProps) {
  const { config, getItem } = useContext(ConfigContext)

  const item = getItem(parent)
  const items = config.tree[parent]

  return (
    <>
      {item && <NavItem key={parent} item={item} editItem={onItemEdit} />}
      {items?.length && (item?.open || parent === 'root') && (
        <Stack className={parent !== 'root' ? classNames.submenu : undefined}>
          {items.map((item) => (
            <Tree key={item} parent={item} onItemEdit={onItemEdit} />
          ))}
        </Stack>
      )}
    </>
  )
}

interface INavItemProps {
  item: IGroup
  editItem: (item: IGroup) => void
}

function NavItem({ item, editItem }: INavItemProps) {
  const [open, setOpen] = useState(false)
  const { dispatch } = useContext(ConfigContext)
  const ref = useRef(null)

  const menuItems = useMemo<IContextualMenuItem[]>(
    () => [
      { key: 'edit', text: 'Edit', onClick: () => editItem(item) },
      { key: 'delete', text: 'Delete', onClick: () => dispatch({ type: 'delete', item }) },
      { key: 'copy', text: 'Copy', onClick: () => dispatch({ type: 'copy', item }) },
    ],
    [dispatch, item, editItem]
  )

  return (
    <>
      <ActionButton
        iconProps={{ iconName: isConnection(item) ? '' : item.open ? 'ChevronUp' : 'ChevronDown' }}
        onClick={() => (isConnection(item) ? dispatch({ type: 'open', item }) : dispatch({ type: 'toggle', item }))}
        onContextMenu={() => setOpen(true)}
      >
        <span ref={ref}>{item?.name}</span>
      </ActionButton>
      <ContextualMenu
        items={menuItems}
        hidden={!open}
        target={ref}
        onItemClick={() => setOpen(false)}
        onDismiss={() => setOpen(false)}
      />
    </>
  )
}
