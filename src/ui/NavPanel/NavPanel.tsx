import { getTheme, ITheme, mergeStyleSets, NeutralColors, Stack } from '@fluentui/react'
import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { isConnection } from '../../models/IConnection'
import { IGroup } from '../../models/IGroup'
import { Connection } from '../Connection/Connection'
import { Group } from '../Group/Group'
import { Tree } from '../Tree/Tree'

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
    <DndProvider backend={HTML5Backend}>
      <Stack className={classNames.navigation}>
        <Tree identifier="root" onItemEdit={setItem} />
        {item &&
          (isConnection(item) ? (
            <Connection connection={item} onDismiss={() => setItem(undefined)} />
          ) : (
            <Group group={item} onDismiss={() => setItem(undefined)} />
          ))}
      </Stack>
    </DndProvider>
  )
}
