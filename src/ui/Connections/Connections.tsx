import { IconButton, Pivot, PivotItem } from '@fluentui/react'
import React, { useContext } from 'react'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'
import { IConnection } from '../../models/IConnection'
import { Messages } from '../Messages/Messages'

export function Connections(): JSX.Element {
  const { activeConnection, openConnections } = useContext(ConnectionsContext)

  return (
    <Pivot overflowBehavior="menu" style={{ overflow: 'hidden', flex: 1 }} selectedKey={activeConnection}>
      {openConnections.map((connection) => (
        <PivotItem
          key={connection.key}
          itemKey={connection.key}
          onRenderItemLink={() => <CustomPivotItem connection={connection} />}
          alwaysRender
        >
          <Messages connection={connection} />
        </PivotItem>
      ))}
    </Pivot>
  )
}

interface ICustomPivotItemProps {
  connection: IConnection
}

function CustomPivotItem({ connection }: ICustomPivotItemProps) {
  const { dispatch } = useContext(ConnectionsContext)

  const { key, name } = connection

  return (
    <>
      <span onClick={() => dispatch({ type: 'open', key })}>{name}</span>
      <IconButton
        iconProps={{ iconName: 'ChromeClose' }}
        title="Close"
        styles={{ icon: { fontSize: '0.5rem' } }}
        onClick={() => dispatch({ type: 'close', key })}
      />
    </>
  )
}
