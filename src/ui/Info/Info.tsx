import { GitHub, Language } from '@mui/icons-material'
import { Dialog, DialogTitle, Link, Stack } from '@mui/material'
import React from 'react'
import { author, name, repository, version } from '../../../package.json'

interface IInfoProps {
  open: boolean
  toggle: () => void
}

export function Info({ open, toggle }: IInfoProps): JSX.Element | null {
  if (!open) return null

  return (
    <Dialog onClose={toggle} open={open}>
      <DialogTitle>Information</DialogTitle>
      <Stack spacing={2}>
        <span>
          <b>{name}</b> v{version}
        </span>
        <Link href={repository.url}>
          <GitHub /> {repository.url}
        </Link>
        <Link href={author.url}>
          <Language /> {author.url}
        </Link>
        <span>
          &copy; {author.name} {new Date().getFullYear()}
        </span>
      </Stack>
    </Dialog>
  )
}
