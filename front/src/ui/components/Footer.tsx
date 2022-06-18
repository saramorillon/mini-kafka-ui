import { useFetch } from '@saramorillon/hooks'
import { IconBrandGithub, IconWorld } from '@tabler/icons'
import React from 'react'
import { getApp } from '../../services/app'

export function Footer() {
  const [app] = useFetch(getApp, null)

  if (!app) return null

  return (
    <footer className="center">
      <b>{app.name}</b> v{app.version} &copy; {app.author.name} {new Date().getFullYear()}
      <br />
      <a href={app.repository.url} target="_blank" rel="noopener noreferrer">
        <IconBrandGithub /> {app.repository.url}
      </a>
      <br />
      <a href={app.author.url} target="_blank" rel="noopener noreferrer">
        <IconWorld /> {app.author.url}
      </a>
      <br />
    </footer>
  )
}
