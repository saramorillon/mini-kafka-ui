export function startConsumer(key: string, topic: string): Promise<void> {
  return pywebview.api.startConsumer(key, topic)
}
export function stopConsumer(key: string, topic: string): Promise<void> {
  return pywebview.api.stopConsumer(key, topic)
}
