import { Add, InfoOutlined, SettingsOutlined } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import openBrowser from 'open'
import React, { useContext, useState } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { getDefaultServer } from '../../models/IServer'
import { settings } from '../../settings'
import { Info } from '../Info/Info'

export function Header(): JSX.Element {
  const [open, setOpen] = useState(false)
  const { dispatch } = useContext(ConfigContext)

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Button
          color="inherit"
          startIcon={<Add />}
          onClick={() => dispatch({ type: 'open', item: getDefaultServer() })}
          sx={{ marginRight: 'auto' }}
        >
          Create server
        </Button>
        <IconButton color="inherit" onClick={() => openBrowser(settings.configDir)}>
          <SettingsOutlined />
        </IconButton>
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <InfoOutlined />
          <Info open={open} toggle={() => setOpen(false)} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
