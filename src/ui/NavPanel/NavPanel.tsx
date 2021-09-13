import { mergeStyleSets, Stack, useTheme } from '@fluentui/react'
import React, { useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { isConnection } from '../../models/IConnection'
import { IGroup } from '../../models/IGroup'
import { Connection } from '../Connection/Connection'
import { Group } from '../Group/Group'
import { Tree } from '../Tree/Tree'

function useClassnames() {
  const { palette } = useTheme()

  return useMemo(
    () =>
      mergeStyleSets({
        navigation: [
          {
            width: 300,
            borderRight: `1px solid ${palette.neutralLight}`,
            overflow: 'auto',
            paddingLeft: '0.5rem',
          },
        ],
      }),
    [palette]
  )
}

export function NavPanel(): JSX.Element {
  const [item, setItem] = useState<IGroup>()
  const classNames = useClassnames()

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
