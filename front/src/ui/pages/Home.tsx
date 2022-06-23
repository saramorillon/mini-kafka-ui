import { useFetch } from '@saramorillon/hooks'
import { Star } from '@styled-icons/feather'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getFavoriteTopics, toggleTopicFavorite } from '../../services/topic'
import { LoadContainer } from '../components/LoadContainer'

export function Home() {
  const [topics, { loading, error }, , replace] = useFetch(getFavoriteTopics, [])

  const toggleFavorite = useCallback(
    (server: string, topic: string) =>
      toggleTopicFavorite(server, topic).then(() => replace((topics) => topics.filter(({ name }) => name !== topic))),
    [replace]
  )

  return (
    <>
      <header>
        <h1>
          <img src="/favicon.svg" /> Mini Kafka UI
        </h1>
      </header>
      <main>
        <h1>Favorite topics</h1>
        <LoadContainer loading={loading} error={error}>
          {topics.map((topic, key) => (
            <article key={key}>
              <Star
                className="right"
                fill="currentColor"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFavorite(topic.server.key, topic.name)}
              />
              <Link to={`/topic/${topic.server.key}/${topic.name}`}>{topic.name}</Link>
              <br />
              <small>{topic.server.name}</small>
            </article>
          ))}
        </LoadContainer>
      </main>
    </>
  )
}
