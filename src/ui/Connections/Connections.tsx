import { Pivot, PivotItem } from '@fluentui/react'
import React, { useCallback, useContext } from 'react'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'
import { Messages } from '../Messages/Messages'

export function Connections(): JSX.Element {
  const { activeConnection, openConnections, dispatch } = useContext(ConnectionsContext)

  const onLinkClick = useCallback(
    (item?: PivotItem) => {
      if (item?.props.itemKey) dispatch({ type: 'open', key: item.props.itemKey })
    },
    [dispatch]
  )

  return (
    <Pivot
      overflowBehavior="menu"
      style={{ overflow: 'hidden', flex: 1 }}
      selectedKey={activeConnection}
      onLinkClick={onLinkClick}
    >
      {openConnections.map((connection) => (
        <PivotItem key={connection.key} headerText={connection.name} itemKey={connection.key}>
          <Messages connection={connection} />
        </PivotItem>
      ))}
    </Pivot>
  )
}
