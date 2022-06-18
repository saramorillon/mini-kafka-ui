import { author, name, repository, version } from '../../package.json'

export function getApp() {
  return { name, version, repository, author }
}
