import { Database, PenTool, Plus } from '@styled-icons/feather'
import React, { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'

export function Servers() {
  const [filter, setFilter] = useState('')
  const { servers: allServers } = useContext(ServersContext)

  const servers = useMemo(
    () => Object.values(allServers).filter((server) => server.name.toLowerCase().includes(filter.toLowerCase())),
    [allServers, filter]
  )

  return (
    <>
      <header>
        <h1>
          <Database /> Servers
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
            <Plus /> Add server
          </Link>
        </div>

        <div className="grid">
          {servers.map((server) => (
            <article key={server.key} className="mb0">
              <h3>{server.name}</h3>
              <small>
                <i>
                  {server.brokers.split(',').length} broker{server.brokers.length > 1 && 's'}
                </i>
              </small>
              <Link className="right" to={`/server/${server.key}`}>
                <PenTool />
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
