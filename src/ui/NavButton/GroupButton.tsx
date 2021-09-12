import React, { useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { IGroup } from '../../models/IGroup'
import { NavButton } from './NavButton'

interface IGroupButtonProps {
  parent: string
  group: IGroup
  editItem: (group: IGroup) => void
}

export function GroupButton({ parent, group, editItem }: IGroupButtonProps): JSX.Element {
  const { dispatch } = useContext(ConfigContext)

  return (
    <NavButton
      icon={group.open ? 'ChevronUp' : 'ChevronDown'}
      onOpen={() => dispatch({ type: 'toggle', item: group })}
      onEdit={() => editItem(group)}
      onDelete={() => dispatch({ type: 'delete', item: group })}
      onCopy={() => dispatch({ type: 'copy', item: group, parent })}
    >
      {group?.name}
    </NavButton>
  )
}
