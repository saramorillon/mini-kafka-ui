export interface IMessage {
  server: string
  topic: string
  partition: number
  offset: string
  timestamp: string
  key: string | null
  value: string | null
}
