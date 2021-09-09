import { FontIcon, getTheme, IRawStyle, ITheme, mergeStyleSets, NeutralColors, Stack } from '@fluentui/react'
import React, { useContext, useState } from 'react'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'
import { IConnection } from '../../models/IConnection'
import { Connection } from '../Connection/Connection'

const { palette, semanticColors, fonts }: ITheme = getTheme()

const hover: IRawStyle = { cursor: 'pointer', selectors: { '&:hover': { background: palette.neutralLight } } }

const classNames = mergeStyleSets({
  navigation: [
    {
      width: 300,
      borderRight: `1px solid ${semanticColors.bodyDivider}`,
      backgroundColor: NeutralColors.gray20,
      overflow: 'auto',
    },
  ],
  name: [
    fonts.medium,
    hover,
    { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0.8rem 1rem', flex: 1 },
  ],
  icon: [fonts.medium, hover, { padding: '0.8rem 0.6rem' }],
})

export function NavPanel(): JSX.Element {
  const [connection, setConnection] = useState<IConnection>()
  const { connections } = useContext(ConnectionsContext)

  return (
    <Stack className={classNames.navigation}>
      {Object.values(connections).map((connection) => (
        <NavItem key={connection.key} connection={connection} editConnection={setConnection} />
      ))}
      {connection && <Connection connection={connection} onDismiss={() => setConnection(undefined)} />}
    </Stack>
  )
}

interface INavItemProps {
  connection: IConnection
  editConnection: (connection: IConnection) => void
}

function NavItem({ connection, editConnection }: INavItemProps) {
  const { dispatch } = useContext(ConnectionsContext)
  const { key, name } = connection

  return (
    <Stack horizontal key={key}>
      <div className={classNames.name} onClick={() => dispatch({ type: 'open', key })}>
        {name}
      </div>
      <FontIcon iconName="Edit" className={classNames.icon} onClick={() => editConnection(connection)} />
      <FontIcon iconName="Delete" className={classNames.icon} onClick={() => dispatch({ type: 'delete', key })} />
      <FontIcon iconName="Copy" className={classNames.icon} onClick={() => dispatch({ type: 'copy', key })} />
    </Stack>
  )
}
