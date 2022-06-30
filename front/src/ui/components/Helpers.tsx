import { Search, X } from '@styled-icons/feather'
import React from 'react'

export function Loader() {
  return <div aria-label="Loading..." aria-busy />
}

export function Loading({ message }: { message: string }) {
  return (
    <div className="center">
      <span aria-label="Loading..." aria-busy /> {message}
    </div>
  )
}

export function NotFound({ message }: { message: string }) {
  return (
    <div className="center">
      <Search /> {message}
    </div>
  )
}

export function Error({ message }: { message: string }) {
  return (
    <div className="center">
      <X /> {message}
    </div>
  )
}
