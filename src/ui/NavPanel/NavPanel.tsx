import { FontIcon, getTheme, IRawStyle, ITheme, mergeStyleSets, Stack } from '@fluentui/react'
import React, { useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { ConnectionsContext } from '../../contexts/ConnectionsContext'

const { palette, semanticColors, fonts }: ITheme = getTheme()

const hover: IRawStyle = { cursor: 'pointer', selectors: { '&:hover': { background: palette.neutralLight } } }

const classNames = mergeStyleSets({
  navigation: [{ width: 300, borderRight: `1px solid ${semanticColors.bodyDivider}` }],
  name: [
    fonts.medium,
    hover,
    { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0.8rem 1rem', flex: 1 },
  ],
  icon: [fonts.medium, hover, { padding: '0.8rem 0.6rem' }],
})

export function NavPanel(): JSX.Element {
  const { connections, getConnection, saveConnection, deleteConnection } = useContext(ConnectionsContext)
  const history = useHistory()

  const onDelete = useCallback((index: number) => deleteConnection(index), [deleteConnection])
  const onCopy = useCallback(
    (index: number) => {
      const connection = getConnection(index)
      if (connection) saveConnection(connection)
    },
    [getConnection, saveConnection]
  )

  return (
    <Stack className={classNames.navigation}>
      {connections.map((connection, index) => (
        <Stack horizontal key={index}>
          <div className={classNames.name} onClick={() => history.push(`/consumer/${index}`)}>
            {connection.name}
          </div>
          <FontIcon iconName="Edit" className={classNames.icon} onClick={() => history.push(`/connection/${index}`)} />
          <FontIcon iconName="Delete" className={classNames.icon} onClick={() => onDelete(index)} />
          <FontIcon iconName="Copy" className={classNames.icon} onClick={() => onCopy(index)} />
        </Stack>
      ))}
    </Stack>
  )
}
