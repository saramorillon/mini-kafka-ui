import React, { PropsWithChildren } from 'react'

interface ILoadContainerProps {
  loading: boolean
}

export function LoadContainer({ loading, children }: PropsWithChildren<ILoadContainerProps>) {
  if (loading) return <div aria-busy />
  return <>{children}</>
}
