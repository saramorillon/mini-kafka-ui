import { X } from '@styled-icons/feather'
import React, { PropsWithChildren } from 'react'

interface ILoadContainerProps {
  loading: boolean
  error?: unknown
}

export function LoadContainer({ loading, error, children }: PropsWithChildren<ILoadContainerProps>) {
  if (loading) return <div aria-busy />
  if (error)
    return (
      <article>
        <X color="red" /> An error occured
      </article>
    )
  return <>{children}</>
}
