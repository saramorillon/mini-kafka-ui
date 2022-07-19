import { query } from './query'

export function startConsumer(key: string, topic: string): Promise<void> {
  return query('StartConsumer', key, topic)
}

export async function stopConsumer(key: string, topic: string): Promise<void> {
  await query('StopConsumer', key, topic)
}
