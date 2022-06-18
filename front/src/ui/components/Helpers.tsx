import { IconSearch } from '@tabler/icons'
import React from 'react'

export function Loader() {
  return <div aria-label="Loading..." aria-busy />
}

export function NotFound() {
  return (
    <div className="center">
      <IconSearch size={80} color="var(--palette-background-light)" />
      <br />
      Not found
    </div>
  )
}
