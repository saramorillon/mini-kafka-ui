import { CloudOff, Inbox } from '@mui/icons-material'
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { PropsWithChildren } from 'react'
import ReactJson from 'react-json-view'
import { useMessages } from '../../hooks/useMessages'
import { IConnection } from '../../models/IConnection'

interface IMessagesProps {
  connection: IConnection
}

export function Messages({ connection }: IMessagesProps): JSX.Element {
  const [payloads, { loading, connected, connect, disconnect }] = useMessages(connection)

  return (
    <Stack spacing={3} sx={{ height: '100%', overflowY: 'auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Breadcrumbs>
          <Typography color="inherit">{connection.name}</Typography>
          <Typography color="text.primary">{connection.topic}</Typography>
        </Breadcrumbs>
        <Button onClick={connected ? disconnect : connect} variant="contained">
          {connected ? 'Disconnect' : 'Connect'}
        </Button>
      </Stack>
      <Table size="small" sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}>Partition</TableCell>
            <TableCell sx={{ width: 100 }}>Offset</TableCell>
            <TableCell sx={{ width: 100 }}>Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payloads.map((payload) => (
            <TableRow key={`${payload.partition}-${payload.message.offset}`}>
              <TableCell sx={{ width: 100, verticalAlign: 'top' }}>{payload.partition}</TableCell>
              <TableCell sx={{ width: 100, verticalAlign: 'top' }}>{payload.message.offset}</TableCell>
              <TableCell sx={{ width: 100, verticalAlign: 'top' }}>{payload.message.key?.toString()}</TableCell>
              <TableCell>
                {payload.message.value && (
                  <ReactJson
                    src={JSON.parse(payload.message.value.toString())}
                    name={null}
                    collapsed
                    displayDataTypes={false}
                    displayObjectSize={false}
                    theme="ashes"
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GridOverlay loading={loading} connected={connected} empty={payloads.length === 0} />
      </Box>
    </Stack>
  )
}

interface IGridOverlayProps {
  loading: boolean
  connected: boolean
  empty: boolean
}

function GridOverlay({ loading, connected, empty }: IGridOverlayProps): JSX.Element | null {
  if (loading) return <CircularProgress size="1rem" />
  if (!connected)
    return (
      <Message>
        <CloudOff sx={{ mr: 1 }} /> Consumer is not connected
      </Message>
    )
  if (empty)
    return (
      <Message>
        <Inbox sx={{ mr: 1 }} /> No messages for now
      </Message>
    )
  return null
}

function Message({ children }: PropsWithChildren<unknown>) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography color="text.disabled" sx={{ display: 'flex', alignItems: 'center' }}>
        {children}
      </Typography>
    </Paper>
  )
}
