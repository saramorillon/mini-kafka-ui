import { query } from './query'

export function startConsumer(id: string, topic: string): Promise<void> {
  return query('StartConsumer', { id, topic })
}

export async function stopConsumer(key: string, topic: string): Promise<void> {
  await query('StopConsumer', { key, topic })
}
