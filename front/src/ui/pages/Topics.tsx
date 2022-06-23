import { useFetch, usePagination } from '@saramorillon/hooks'
import { List, Star } from '@styled-icons/feather'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { getTopics, toggleTopicFavorite } from '../../services/topic'
import { LoadContainer } from '../components/LoadContainer'
import { Pagination } from '../components/Pagination'

const limit = 10

export function Topics() {
  const { servers } = useContext(ServersContext)
  const [server, setServer] = useState(servers[0]?.key || '')

  const pagination = usePagination()
  const { page, setMaxPage, goTo } = pagination

  const [filter, setFilter] = useState('')
  const fetch = useCallback(() => getTopics(server), [server])
  const [allTopics, { loading, error }, , replace] = useFetch(fetch, [])

  const filteredTopics = useMemo(
    () =>
      allTopics
        .filter((topic) => topic.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((t1, t2) => t1.name.localeCompare(t2.name)),
    [allTopics, filter]
  )

  const topics = useMemo(() => filteredTopics.slice((page - 1) * limit, page * limit), [filteredTopics, page])

  useEffect(() => {
    setMaxPage(Math.ceil(filteredTopics.length / limit))
  }, [filteredTopics, setMaxPage])

  useEffect(() => {
    goTo(1)
  }, [filter, goTo])

  const toggleFavorite = useCallback(
    (topic: string) =>
      toggleTopicFavorite(server, topic).then(() =>
        replace((topics) =>
          topics.map(({ name, partitions, favorite }) => ({
            name,
            partitions,
            favorite: name === topic ? !favorite : favorite,
          }))
        )
      ),
    [server, replace]
  )

  return (
    <>
      <header>
        <h1>
          <List /> Topics
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
              <option key={server.key} value={server.key}>
                {server.name}
              </option>
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
            <thead>
              <tr>
                <th>Topic</th>
                <th>Partitions</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr key={topic.name}>
                  <td className="truncate" style={{ maxWidth: 1 }}>
                    <Link to={`/topic/${server}/${topic.name}`}>{topic.name}</Link>
                  </td>
                  <td className="center" style={{ width: 1 }}>
                    {topic.partitions}
                  </td>
                  <td className="center" style={{ width: 1 }}>
                    <Star
                      fill={topic.favorite ? 'currentColor' : 'none'}
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleFavorite(topic.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination pagination={pagination} />
        </LoadContainer>
      </main>
    </>
  )
}
