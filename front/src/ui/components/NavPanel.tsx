import { Database, List, Plus } from '@styled-icons/feather'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'

export function NavPanel() {
  const { servers } = useContext(ServersContext)

  return (
    <aside>
      <ul>
        <li>
          <List /> Topics
        </li>
        {servers.map((server, key) => (
          <li key={key}>
            <Link to={`/server/${server.key}/topics`}>{server.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <Database /> Servers
        </li>
        <li>
          <Link to="/server">
            <Plus /> Create server
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
