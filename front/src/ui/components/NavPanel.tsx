import { IconDatabase, IconList, IconPlus } from '@tabler/icons'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'

export function NavPanel() {
  const { servers } = useContext(ServersContext)

  return (
    <aside>
      <ul>
        <li>
          <IconList /> Topics
        </li>
        {servers.map((server, key) => (
          <li key={key}>
            <Link to={`/server/${server.key}/topics`}>{server.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <IconDatabase /> Servers
        </li>
        <li>
          <Link to="/server">
            <IconPlus /> Create server
          </Link>
        </li>
        {servers.map((server, key) => (
          <li key={key}>
            <Link to={`/server/${server.key}`}>{server.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
