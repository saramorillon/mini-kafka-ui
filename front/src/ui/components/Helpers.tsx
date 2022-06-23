import { IconSearch } from '@tabler/icons'
import React from 'react'

export function Loader() {
  return <div aria-label="Loading..." aria-busy />
}

export function NotFound({ message }: { message: string }) {
  return (
    <div className="center">
      <IconSearch size={16} color="var(--palette-background-light)" /> {message}
    </div>
  )
}
