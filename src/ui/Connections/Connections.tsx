import { Icon, Pivot, PivotItem } from '@fluentui/react'
import React, { useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { IConnection } from '../../models/IConnection'
import { Messages } from '../Messages/Messages'

export function Connections(): JSX.Element {
  const { activeConnection, openConnections } = useContext(ConfigContext)

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
  const { dispatch } = useContext(ConfigContext)

  return (
    <>
      <span onClick={() => dispatch({ type: 'open', item: connection })} style={{ paddingRight: '0.25rem' }}>
        {connection.name}
      </span>
      <Icon
        iconName="ChromeClose"
        title="Close"
        styles={{ root: { fontSize: '0.5rem', paddingLeft: '0.25rem' } }}
        onClick={() => dispatch({ type: 'close', item: connection })}
      />
    </>
  )
}
