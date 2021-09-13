import { getTheme, ITheme } from '@fluentui/style-utilities'
import React, { useContext, useEffect } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { useDnd } from '../../hooks/useDnd'
import { IGroup } from '../../models/IGroup'
import { NavButton } from './NavButton'

const { palette }: ITheme = getTheme()

interface IGroupButtonProps {
  parent: string
  group: IGroup
  editItem: (group: IGroup) => void
}

export function GroupButton({ parent, group, editItem }: IGroupButtonProps): JSX.Element {
  const { dispatch } = useContext(ConfigContext)
  const { drag, drop } = useDnd('group', group)

  const [{ isDragged }, dragRef] = drag
  const [{ isOver, isStayedOver }, dropRef] = drop

  useEffect(() => {
    if (isStayedOver && !group.open) {
      dispatch({ type: 'toggle', item: group })
    }
  }, [isStayedOver, group, dispatch])

  return (
    <div ref={dropRef} style={{ backgroundColor: isOver ? palette.themeLight : 'unset' }}>
      <div ref={dragRef} style={{ opacity: isDragged ? 0.5 : 1 }}>
        <NavButton
          icon={group.open ? 'ChevronUp' : 'ChevronDown'}
          onOpen={() => dispatch({ type: 'toggle', item: group })}
          onEdit={() => editItem(group)}
          onDelete={() => dispatch({ type: 'delete', item: group })}
          onCopy={() => dispatch({ type: 'copy', item: group, parent })}
        >
          {group?.name}
        </NavButton>
      </div>
    </div>
  )
}
