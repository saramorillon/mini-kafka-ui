import { Search } from '@styled-icons/feather'
import React from 'react'

export function Loader() {
  return <div aria-label="Loading..." aria-busy />
}

export function NotFound({ message }: { message: string }) {
  return (
    <div className="center">
      <Search /> {message}
    </div>
  )
}
