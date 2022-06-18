import { useFetch, useForm } from '@saramorillon/hooks'
import React, { useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ServersContext } from '../../contexts/ServersContext'
import { IServer } from '../../models/IServer'
import { getServer } from '../../services/server'
import { LoadContainer } from '../components/LoadContainer'

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

  const onSave = useCallback(
    (values: IServer) => {
      saveServer(values).then(refresh)
    },
    [saveServer, refresh]
  )

  const { onSubmit, onChange, reset, values } = useForm(onSave, server || empty)

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <LoadContainer loading={loading}>
      <h4>{server?.name || 'Create server'}</h4>

      <form onSubmit={onSubmit}>
        {values.key && (
          <label>
            Key
            <input type="text" defaultValue={key} disabled />
          </label>
        )}

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
          <button role="button" type="submit">
            Save
          </button>
        </div>
      </form>
    </LoadContainer>
  )
}
