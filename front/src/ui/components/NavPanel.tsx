import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { Icon } from './Icon'

export function NavPanel() {
  const { servers } = useContext(ServersContext)

  return (
    <aside>
      <ul>
        <li>
          <Icon name="list" /> Topics
        </li>
        {servers.map((server, key) => (
          <li key={key}>
            <Link to={`/server/${server.key}/topics`}>{server.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <Icon name="database" /> Servers
        </li>
        <li>
          <Link to="/server">
            <Icon name="plus" /> Create server
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
