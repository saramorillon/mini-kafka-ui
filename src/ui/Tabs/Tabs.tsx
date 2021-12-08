import { Close } from '@mui/icons-material'
import { Divider, Stack, Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useContext, useMemo } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { IConnection, isConnection } from '../../models/IConnection'
import { IServer } from '../../models/IServer'
import { Messages } from '../Messages/Messages'
import { Server } from '../Server/Server'

export function ActiveTabs(): JSX.Element {
  const { config, dispatch } = useContext(ConfigContext)
  const value = useMemo(() => config.openItems.findIndex(({ key }) => key === config.activeItem), [config])

  const onChange = useCallback(
    (e, value: number) => {
      dispatch({ type: 'open', item: config.openItems[value] })
    },
    [dispatch, config]
  )

  return (
    <Stack sx={{ flex: 1, overflowX: 'hidden' }}>
      <Tabs value={value} onChange={onChange} variant="scrollable" scrollButtons sx={{ minHeight: '3rem' }}>
        {config.openItems.map((item) => (
          <Tab
            key={item.key}
            label={<TabLabel item={item} />}
            icon={<TabIcon item={item} />}
            iconPosition="end"
            sx={{ justifyContent: 'space-between', minHeight: '3rem' }}
          />
        ))}
      </Tabs>
      <Divider />
      <Box sx={{ p: 3, flex: 1 }}>
        {config.openItems.map((item) => (
          <TabPanel key={item.key} item={item} active={config.activeItem === item.key} />
        ))}
      </Box>
    </Stack>
  )
}

interface ITabLabelProps {
  item: IServer | IConnection
}

function TabLabel({ item }: ITabLabelProps) {
  const label = isConnection(item) ? item.topic : item.name
  return (
    <Box
      sx={{
        maxWidth: 160,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textTransform: 'none',
        fontSize: '0.8rem',
        marginRight: '0.5rem',
      }}
      title={label}
    >
      {label}
    </Box>
  )
}

function TabIcon({ item }: ITabLabelProps) {
  const { dispatch } = useContext(ConfigContext)
  return <Close fontSize="inherit" onClick={() => dispatch({ type: 'close', item })} />
}

interface ITabPanelProps extends ITabLabelProps {
  active: boolean
}

function TabPanel({ item, active }: ITabPanelProps) {
  return (
    <Box sx={{ display: active ? 'block' : 'none', height: '100%' }}>
      {isConnection(item) ? <Messages connection={item} /> : <Server server={item} />}
    </Box>
  )
}
