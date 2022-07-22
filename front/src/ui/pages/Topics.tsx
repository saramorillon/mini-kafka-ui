import { useFetch, usePagination } from '@saramorillon/hooks'
import { List, Star } from '@styled-icons/feather'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { ITopic } from '../../models/ITopic'
import { getTopics, toggleTopicFavorite } from '../../services/topic'
import { Pagination } from '../components/Pagination'
import { IColumn, Table } from '../components/Table'

const limit = 10

export function Topics() {
  const { servers } = useContext(ServersContext)
  const [server, setServer] = useState('')

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

  const columns: IColumn<ITopic>[] = useMemo(
    () => [
      {
        header: 'Topic',
        cell: ({ name }) => <Link to={`/topic/${server}/${name}`}>{name}</Link>,
        style: { width: 1 },
      },
      {
        header: 'Topic',
        cell: ({ partitions }) => partitions,
        style: { width: 1 },
      },
      {
        header: 'Topic',
        cell: ({ name, favorite }) => (
          <Star
            fill={favorite ? 'currentColor' : 'none'}
            style={{ cursor: 'pointer' }}
            onClick={() => toggleFavorite(name)}
          />
        ),
        style: { width: 1 },
      },
    ],
    [server, toggleFavorite]
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
            {!server && <option value="">Select a server</option>}
            {Object.values(servers).map((server) => (
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

        <Table columns={columns} rows={topics} loading={loading} error={error} />
        <Pagination pagination={pagination} />
      </main>
    </>
  )
}
