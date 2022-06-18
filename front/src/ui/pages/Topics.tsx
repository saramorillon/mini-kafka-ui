import { useFetch } from '@saramorillon/hooks'
import { IconList } from '@tabler/icons'
import React, { useCallback, useContext, useState } from 'react'
import { ServersContext } from '../../contexts/ServersContext'
import { getTopics } from '../../services/topic'
import { LoadContainer } from '../components/LoadContainer'

const limit = 10

export function Topics() {
  const { servers } = useContext(ServersContext)
  const [server, setServer] = useState(servers[0]?.key || '')

  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const fetch = useCallback(() => getTopics(server, page, limit, filter), [server, page, filter])
  const [{ topics, total }, { loading, error }] = useFetch(fetch, { topics: [], total: 0 })

  return (
    <>
      <header>
        <h1>
          <IconList size={36} /> Topics
        </h1>
      </header>
      <main>
        <div className="flex items-center mb2">
          <select
            className="flex-auto mr1"
            value={server}
            onChange={(e) => setServer(e.target.value)}
            placeholder="Server"
          >
            {servers.map((server) => (
              <option key={server.key}>{server.name}</option>
            ))}
          </select>

          <input
            className="flex-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter topics"
          />
        </div>

        <LoadContainer loading={loading} error={error}>
          <table>
            <tbody>
              {topics.map((topic) => (
                <tr key={topic.name}>
                  <td>{topic.name}</td>
                  {/* <td>{topic.offsets.map(offset => offset.)}</td> */}
                  {/* <td>{topic.name}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </LoadContainer>
      </main>
    </>
  )
}
