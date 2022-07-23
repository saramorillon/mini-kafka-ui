import { useFetch } from '@saramorillon/hooks'
import { Star } from '@styled-icons/feather'
import React, { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { IFavorite } from '../../models/IFavorite'
import { getFavoriteTopics, toggleTopicFavorite } from '../../services/topic'
import { LoadContainer } from '../components/LoadContainer'

export function Home() {
  const { servers } = useContext(ServersContext)
  const [favorites, { loading, error }, , replace] = useFetch(getFavoriteTopics, [])

  const toggleFavorite = useCallback(
    (favorite: IFavorite) =>
      toggleTopicFavorite(favorite).then(() => replace((topics) => topics.filter(({ topic }) => topic !== topic))),
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
                onClick={() => toggleFavorite(favorite)}
              />
              <Link to={`/topic/${favorite.serverId}/${favorite.topic}`}>{favorite.topic}</Link>
              <br />
              <small>{servers.find((server) => server.id === favorite.serverId)?.name}</small>
            </article>
          ))}
        </LoadContainer>
      </main>
    </>
  )
}
