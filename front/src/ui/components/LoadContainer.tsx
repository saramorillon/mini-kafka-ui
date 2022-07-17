import React, { PropsWithChildren } from 'react'
import { Error } from './Helpers'

interface ILoadContainerProps {
  loading: boolean
  error?: unknown
}

export function LoadContainer({ loading, error, children }: PropsWithChildren<ILoadContainerProps>) {
  if (loading) return <div aria-busy />
  if (error)
    return (
      <article>
        <Error message="An error occured" />
      </article>
    )
  return <>{children}</>
}
