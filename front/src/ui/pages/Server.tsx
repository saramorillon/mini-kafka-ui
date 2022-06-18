import { useFetch, useForm } from '@saramorillon/hooks'
import { IconDeviceFloppy, IconTrash } from '@tabler/icons'
import React, { useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { useNavigate } from '../../hooks/useNavigate'
import { IServer } from '../../models/IServer'
import { deleteServer, getServer } from '../../services/server'
import { Loader } from '../components/Helpers'

const empty: IServer = {
  key: '',
  name: '',
  brokers: [],
}

export function Server() {
  const { key } = useParams<{ key: string }>()
  const fetch = useCallback(() => getServer(key), [key])
  const [server, { loading }, refresh] = useFetch(fetch, undefined)
  const { saveServer } = useContext(ServersContext)
  const navigate = useNavigate(refresh)

  const onSave = useCallback(
    (values: IServer) => {
      void saveServer(values).then(() => navigate(`/servers`))
    },
    [saveServer, navigate]
  )

  const { onSubmit, onChange, reset, values } = useForm(onSave, server || empty)

  useEffect(() => {
    reset()
  }, [reset])

  const onDelete = useCallback(
    (server: IServer) => {
      void deleteServer(server).then(() => navigate('/servers'))
    },
    [navigate]
  )

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    )
  }

  return (
    <>
      <header>
        <h1 className="mb1">{server?.name || 'Create server'}</h1>
        {server && <small>#{server.key}</small>}
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label>
            Name
            <input type="text" value={values.name} onChange={(e) => onChange('name', e.target.value)} required />
          </label>
          <label>
            Brokers
            <textarea
              value={values.brokers.join('\n')}
              onChange={(e) => onChange('brokers', e.target.value.split(/\s|\n|,|;/))}
              rows={6}
              required
            />
            <small>Separated by a comma, a semicolon, a white space or a line break</small>
          </label>
          <div className="right">
            <button type="submit" data-variant="outlined">
              <IconDeviceFloppy /> Save
            </button>
            {server && (
              <button type="button" className="ml1" onClick={() => onDelete(server)}>
                <IconTrash /> Delete
              </button>
            )}
          </div>
        </form>
      </main>
    </>
  )
}
