import { query } from './query'

export function startConsumer(id: string, topic: string): Promise<number[]> {
  return query('StartConsumer', { id, topic })
}

export async function stopConsumer(): Promise<void> {
  await query('StopConsumer')
}
