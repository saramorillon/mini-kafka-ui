import { Database, List, Settings } from '@styled-icons/feather'
import React, { MouseEvent, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { openConfigDir } from '../../services/config'

export function Navbar(): JSX.Element {
  const onOpenConfig = useCallback((e: MouseEvent) => {
    e.preventDefault()
    void openConfigDir()
  }, [])

  return (
    <nav aria-label="Main">
      <Link to="/">
        <strong>
          <img src="/favicon.svg" className="icon" /> Mini Kafka UI
        </strong>
      </Link>
      <NavLink to="/topics">
        <List /> Topics
      </NavLink>
      <NavLink to="/servers">
        <Database /> Servers
      </NavLink>
      <button className="ml-auto" onClick={onOpenConfig}>
        <Settings /> Config
      </button>
    </nav>
  )
}
