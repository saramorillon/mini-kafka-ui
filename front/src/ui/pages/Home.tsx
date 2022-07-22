import { useFetch } from '@saramorillon/hooks'
import { Star } from '@styled-icons/feather'
import React, { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { getFavoriteTopics, toggleTopicFavorite } from '../../services/topic'
import { LoadContainer } from '../components/LoadContainer'

export function Home() {
  const { servers } = useContext(ServersContext)
  const [favorites, { loading, error }, , replace] = useFetch(getFavoriteTopics, [])

  const toggleFavorite = useCallback(
    (server: string, topic: string) =>
      toggleTopicFavorite(server, topic).then(() => replace((topics) => topics.filter(({ topic }) => topic !== topic))),
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
          {favorites.map((favorite, key) => (
            <article key={key}>
              <Star
                className="right"
                fill="currentColor"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFavorite(favorite.server, favorite.topic)}
              />
              <Link to={`/topic/${favorite.server}/${favorite.topic}`}>{favorite.topic}</Link>
              <br />
              <small>{servers[favorite.server].name}</small>
            </article>
          ))}
        </LoadContainer>
      </main>
    </>
  )
}
