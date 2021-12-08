import { Delete, Edit, ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { PropsWithChildren, useCallback, useContext, useState } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { useAdmin } from '../../hooks/useAdmin'
import { IServer } from '../../models/IServer'
import { Topics } from './Topics'

interface INavButtonProps {
  server: IServer
}

export function NavButton({ server }: INavButtonProps): JSX.Element {
  const { dispatch } = useContext(ConfigContext)
  const [open, setOpen] = useState(false)
  const admin = useAdmin(server, open)

  const toggle = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  return (
    <>
      <ListItem>
        <ListItemButton onClick={toggle} sx={{ flexGrow: 1 }}>
          <ListItemText primary={server.name} />
        </ListItemButton>
        <IconButton size="small" onClick={() => dispatch({ type: 'open', item: server })}>
          <Edit />
        </IconButton>
        <IconButton size="small" onClick={() => dispatch({ type: 'delete', item: server })}>
          <Delete />
        </IconButton>
        <IconButton size="small" onClick={toggle}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding component="div" sx={{ pl: 2 }}>
          <LoadContainer loading={admin.loading}>
            <Topics server={server} topics={admin.topics} />
          </LoadContainer>
        </List>
      </Collapse>

      <Divider />
    </>
  )
}

interface ILoadContainerProps {
  loading: boolean
}

function LoadContainer({ loading, children }: PropsWithChildren<ILoadContainerProps>) {
  if (loading)
    return (
      <ListItem>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </ListItem>
    )
  return <>{children}</>
}
