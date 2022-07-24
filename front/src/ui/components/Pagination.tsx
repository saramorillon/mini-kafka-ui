import { IPagination, useFetch } from '@saramorillon/hooks'
import React, { useCallback, useEffect } from 'react'
import { countMessages } from '../../services/message'

const limit = 10

interface IPaginationProps {
  pagination: IPagination
}

export function Pagination({ pagination }: IPaginationProps) {
  const fetch = useCallback(() => countMessages({}, limit), [])
  const [total, { loading }] = useFetch(fetch, 0)
  const { page, maxPage, setMaxPage, first, previous, next, last, canPrevious, canNext } = pagination

  useEffect(() => {
    setMaxPage(total)
  }, [total, setMaxPage])

  return (
    <div className="center">
      <button disabled={!canPrevious} onClick={first} aria-label="First">
        ⟪
      </button>
      <button disabled={!canPrevious} onClick={previous} aria-label="Previous">
        ⟨
      </button>
      <span className="mx1">
        Page {page} of <span aria-busy={loading}>{maxPage}</span>
      </span>
      <button disabled={!canNext} onClick={next} aria-label="Next">
        ⟩
      </button>
      <button disabled={!canNext} onClick={last} aria-label="Last">
        ⟫
      </button>
    </div>
  )
}
