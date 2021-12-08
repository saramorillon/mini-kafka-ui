import { List } from '@mui/material'
import React, { useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { NavButton } from '../NavButton/NavButton'

export function NavPanel(): JSX.Element {
  const { config } = useContext(ConfigContext)

  return (
    <List
      component="nav"
      sx={{ width: 300, overflowX: 'hidden', overflowY: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
    >
      {config.servers.map((server) => (
        <NavButton key={server.key} server={server} />
      ))}
    </List>
  )
}
