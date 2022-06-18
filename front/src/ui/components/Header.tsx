import { ipcRenderer } from 'electron'
import React, { MouseEvent, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'

export function Header(): JSX.Element {
  const onOpenConfig = useCallback((e: MouseEvent) => {
    e.preventDefault()
    void ipcRenderer.invoke('open-config-dir')
  }, [])

  return (
    <nav>
      <ul>
        <li>Mini Kafka UI</li>
        <li>
          <NavLink to="/servers">
            <Icon name="database" /> Servers
          </NavLink>
        </li>
        <li>
          <NavLink to="/topics">
            <Icon name="list" /> Topics
          </NavLink>
        </li>
      </ul>
      <ul className="ml-auto">
        <li>
          <a href="#" onClick={onOpenConfig}>
            <Icon name="settings" /> Config
          </a>
        </li>
      </ul>
    </nav>
  )
}
