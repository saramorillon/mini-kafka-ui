export interface IMessage {
  partition: number
  offset: string
  timestamp: string
  key?: string
  value: string
}
