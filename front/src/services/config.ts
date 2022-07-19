import { query } from './query'

export function openConfigDir(): Promise<void> {
  return query('OpenConfigDir')
}
