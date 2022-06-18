import { IconDatabase, IconPencil, IconPlus } from '@tabler/icons'
import React, { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'

export function Servers() {
  const [filter, setFilter] = useState('')
  const { servers: allServers } = useContext(ServersContext)

  const servers = useMemo(
    () => allServers.filter((server) => server.name.toLowerCase().includes(filter.toLowerCase())),
    [allServers, filter]
  )

  return (
    <>
      <header>
        <h1>
          <IconDatabase size={36} /> Servers
        </h1>
      </header>
      <main>
        <div className="flex items-center mb2">
          <input
            className="flex-auto mr1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter servers"
          />

          <Link to="/server">
            <IconPlus /> Create server
          </Link>
        </div>

        <div className="grid">
          {servers.map((server) => (
            <article key={server.key} className="mb0">
              <h3>{server.name}</h3>
              <small>
                <i>
                  {server.brokers.length} broker{server.brokers.length > 1 && 's'}
                </i>
              </small>
              <Link className="right" to={`/server/${server.key}`}>
                <IconPencil />
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
