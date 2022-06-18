import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { Icon } from '../components/Icon'

export function Servers() {
  const { servers } = useContext(ServersContext)

  return (
    <>
      <header className="right-align">
        <Link to="/server">
          <Icon name="plus" /> Create server
        </Link>
      </header>
      <div className="flex">
        {servers.map((server) => (
          <Link key={server.key} to={`/server/${server.key}/topics`}>
            <button type="button" className="p3 m2">
              {server.name} <br />
              <small>
                <i>{server.brokers.length} brokers</i>
              </small>
            </button>
          </Link>
        ))}
      </div>
    </>
  )
}
