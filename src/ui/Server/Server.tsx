import { Save } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { fields } from '@saramorillon/hooks'
import React, { FormEvent, useCallback, useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { IServer } from '../../models/IServer'

interface IServerProps {
  server: IServer
}

export function Server({ server }: IServerProps): JSX.Element {
  const { dispatch } = useContext(ConfigContext)

  const [name, setName] = fields.useText(server.name)
  const [brokers, setBrokers] = fields.useMultiSelect(server.brokers)

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      dispatch({ type: 'save', item: { ...server, name, brokers } })
    },
    [dispatch, server, name, brokers]
  )

  return (
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Server name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Brokers"
        required
        value={brokers.join('\n')}
        onChange={(e) => setBrokers(e.target.value.split(/\s*(,|\n)+\s*/))}
        multiline
        rows={brokers.length}
      />
      <Button startIcon={<Save />} variant="contained" type="submit">
        Save
      </Button>
    </form>
  )
}
