import { Dialog, DialogType, FontIcon, Link, Stack } from '@fluentui/react'
import React from 'react'
import { name, author, version, repository } from '../../../package.json'

interface IInfoProps {
  open: boolean
  toggle: () => void
}

export function Info({ open, toggle }: IInfoProps): JSX.Element | null {
  if (!open) return null

  return (
    <Dialog
      hidden={!open}
      onDismiss={toggle}
      dialogContentProps={{ type: DialogType.largeHeader, title: 'Info' }}
      maxWidth={500}
    >
      <Stack tokens={{ childrenGap: '0.5rem' }}>
        <span>
          <b>{name}</b> v{version}
        </span>
        <Link href={repository.url}>
          <FontIcon iconName="GitGraph" /> {repository.url}
        </Link>
        <Link href={author.url}>
          <FontIcon iconName="Globe" /> {author.url}
        </Link>
        <span>
          &copy; {author.name} {new Date().getFullYear()}
        </span>
      </Stack>
    </Dialog>
  )
}
