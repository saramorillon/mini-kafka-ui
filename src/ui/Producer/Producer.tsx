import { Send } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { FormEvent, useCallback, useState } from 'react'
import { useProducer } from '../../hooks/useProducer'
import { IConnection } from '../../models/IConnection'

interface IProducerProps {
  open: boolean
  toggle: () => void
  connection: IConnection
}

export function Producer({ connection, open, toggle }: IProducerProps): JSX.Element {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const { loading, sendMessage } = useProducer(connection)

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      sendMessage(value, key)
    },
    [sendMessage, value, key]
  )

  return (
    <Dialog onClose={toggle} open={open}>
      <DialogTitle>Information</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <TextField fullWidth margin="normal" label="Key" value={key} onChange={(e) => setKey(e.target.value)} />
          <TextField
            fullWidth
            margin="normal"
            label="Value"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            multiline
            rows={10}
          />
          <Button
            startIcon={loading ? <CircularProgress size="1rem" /> : <Send />}
            variant="contained"
            type="submit"
            disabled={loading}
          >
            Send message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
