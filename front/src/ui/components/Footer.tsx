import { GitBranch, Globe } from '@styled-icons/feather'
import React from 'react'
import { author, name, repository, version } from '../../../package.json'

export function Footer() {
  return (
    <footer className="center">
      <b>{name}</b> v{version} &copy; {author.name} {new Date().getFullYear()}
      <br />
      <a href={repository.url} target="_blank" rel="noopener noreferrer">
        <GitBranch /> {repository.url}
      </a>
      <br />
      <a href={author.url} target="_blank" rel="noopener noreferrer">
        <Globe /> {author.url}
      </a>
      <br />
    </footer>
  )
}
