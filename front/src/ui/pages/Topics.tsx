import { useFetch } from '@saramorillon/hooks'
import { IconList } from '@tabler/icons'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { ServersContext } from '../../contexts/ServersContext'
import { getTopics } from '../../services/topic'
import { LoadContainer } from '../components/LoadContainer'

export function Topics() {
  const { servers } = useContext(ServersContext)
  const [server, setServer] = useState(servers[0].key)
  const fetch = useCallback(() => getTopics(server), [server])
  const [allTopics, { loading, error }] = useFetch(fetch, [])

  const [filter, setFilter] = useState('')
  const topics = useMemo(
    () => allTopics.filter((topic) => topic.name.toLowerCase().includes(filter.toLowerCase())),
    [allTopics, filter]
  )

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
          <ul>
            {topics.map((topic) => (
              <li key={topic.name}>{topic.name}</li>
            ))}
          </ul>
        </LoadContainer>
      </main>
    </>
  )
}
