import { mergeStyleSets, NeutralColors, Stack } from '@fluentui/react'
import React, { useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { isConnection } from '../../models/IConnection'
import { IGroup, isGroup } from '../../models/IGroup'
import { ITree } from '../../models/ITree'
import { ConnectionButton } from '../NavButton/ConnectionButton'
import { GroupButton } from '../NavButton/GroupButton'

const classNames = mergeStyleSets({
  submenu: [
    {
      marginLeft: '1rem',
      paddingLeft: '1rem',
      borderLeft: `1px solid ${NeutralColors.gray40}`,
    },
  ],
})

interface ITreeProps {
  identifier: keyof ITree
  parent?: keyof ITree
  onItemEdit: (item: IGroup) => void
}

export function Tree({ identifier, parent, onItemEdit }: ITreeProps): JSX.Element {
  const { config, getItem } = useContext(ConfigContext)

  const item = getItem(identifier)
  const items = config.tree[identifier]

  return (
    <>
      {parent && (
        <>
          {isConnection(item) && <ConnectionButton parent={parent} connection={item} editItem={onItemEdit} />}
          {isGroup(item) && <GroupButton parent={parent} group={item} editItem={onItemEdit} />}
        </>
      )}
      {items?.length && (item?.open || !parent) && (
        <Stack className={parent ? classNames.submenu : undefined}>
          {items.map((item) => (
            <Tree key={item} identifier={item} parent={identifier} onItemEdit={onItemEdit} />
          ))}
        </Stack>
      )}
    </>
  )
}
