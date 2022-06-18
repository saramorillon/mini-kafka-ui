import { useCallback } from 'react'
import { useLocation, useNavigate as _useNavigate } from 'react-router-dom'

export function useNavigate(refresh: () => void) {
  const navigate = _useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (path: string) => {
      if (path === pathname) {
        refresh()
      } else {
        navigate(path)
      }
    },
    [navigate, refresh, pathname]
  )
}
