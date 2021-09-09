export interface IConnection {
  key: string
  name: string
  brokers: string[]
  topic: string
  open: boolean
}
