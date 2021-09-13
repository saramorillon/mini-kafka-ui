import { mergeStyleSets, Stack, useTheme } from '@fluentui/react'
import React, { useContext, useMemo } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { isConnection } from '../../models/IConnection'
import { IGroup, isGroup } from '../../models/IGroup'
import { ITree } from '../../models/ITree'
import { ConnectionButton } from '../NavButton/ConnectionButton'
import { GroupButton } from '../NavButton/GroupButton'

function useClassnames() {
  const { palette } = useTheme()

  return useMemo(
    () =>
      mergeStyleSets({
        submenu: [
          {
            marginLeft: '1rem',
            paddingLeft: '1rem',
            borderLeft: `1px solid ${palette.neutralLight}`,
          },
        ],
      }),
    [palette]
  )
}

interface ITreeProps {
  identifier: keyof ITree
  parent?: keyof ITree
  onItemEdit: (item: IGroup) => void
}

export function Tree({ identifier, parent, onItemEdit }: ITreeProps): JSX.Element {
  const { config, getItem } = useContext(ConfigContext)
  const classNames = useClassnames()

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
      {Boolean(items?.length) && (item?.open || !parent) && (
        <Stack className={parent ? classNames.submenu : undefined}>
          {items.map((item) => (
            <Tree key={item} identifier={item} parent={identifier} onItemEdit={onItemEdit} />
          ))}
        </Stack>
      )}
    </>
  )
}
