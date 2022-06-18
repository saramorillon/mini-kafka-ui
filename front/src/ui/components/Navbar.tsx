import { IconDatabase, IconList, IconSettings } from '@tabler/icons'
import { ipcRenderer } from 'electron'
import React, { MouseEvent, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

export function Navbar(): JSX.Element {
  const onOpenConfig = useCallback((e: MouseEvent) => {
    e.preventDefault()
    void ipcRenderer.invoke('open-config-dir')
  }, [])

  return (
    <nav aria-label="Main">
      <a href="/">
        <strong>
          <img src="/favicon.svg" className="icon" /> Mini Kafka UI
        </strong>
      </a>
      <NavLink to="/topics">
        <IconList /> Topics
      </NavLink>
      <NavLink to="/servers">
        <IconDatabase /> Servers
      </NavLink>
      <button className="ml-auto" onClick={onOpenConfig}>
        <IconSettings /> Config
      </button>
    </nav>
  )
}
