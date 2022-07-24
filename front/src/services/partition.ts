import { query } from './query'

export function getPartitions() {
  return query('GetPartitions')
}
