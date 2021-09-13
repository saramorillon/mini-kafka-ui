import { mergeStyleSets, Stack, useTheme } from '@fluentui/react'
import React, { Fragment, useContext, useMemo } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { isConnection } from '../../models/IConnection'
import { IGroup } from '../../models/IGroup'
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
  parent: string
  onItemEdit: (item: IGroup) => void
}

export function Tree({ parent, onItemEdit }: ITreeProps): JSX.Element {
  const { getChildren } = useContext(ConfigContext)
  const classNames = useClassnames()

  const items = getChildren(parent)

  return (
    <>
      {items.map((item) => (
        <Fragment key={item.key}>
          {isConnection(item) ? (
            <ConnectionButton parent={parent} connection={item} editItem={onItemEdit} />
          ) : (
            <GroupButton parent={parent} group={item} editItem={onItemEdit} />
          )}
          {item.open && (
            <Stack className={classNames.submenu}>
              <Tree key={item.key} parent={item.key} onItemEdit={onItemEdit} />
            </Stack>
          )}
        </Fragment>
      ))}
    </>
  )
}
