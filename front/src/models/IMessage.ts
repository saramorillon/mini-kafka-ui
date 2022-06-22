export interface IMessage {
  partition: number
  offset: string
  timestamp: number
  key?: string
  value: string
}
