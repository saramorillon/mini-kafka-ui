import React, { useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { useDnd } from '../../hooks/useDnd'
import { IConnection } from '../../models/IConnection'
import { NavButton } from './NavButton'

interface IConnectionButtonProps {
  parent: string
  connection: IConnection
  editItem: (connection: IConnection) => void
}

export function ConnectionButton({ parent, connection, editItem }: IConnectionButtonProps): JSX.Element {
  const { dispatch } = useContext(ConfigContext)
  const { drag } = useDnd('connection', connection, parent)

  const [{ isDragged }, dragRef] = drag

  return (
    <div ref={dragRef} style={{ opacity: isDragged ? 0.5 : 1 }}>
      <NavButton
        onOpen={() => dispatch({ type: 'open', item: connection })}
        onEdit={() => editItem(connection)}
        onDelete={() => dispatch({ type: 'delete', item: connection })}
        onCopy={() => dispatch({ type: 'copy', item: connection, parent })}
      >
        {connection?.name}
      </NavButton>
    </div>
  )
}
