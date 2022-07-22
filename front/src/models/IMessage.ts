export interface IMessage {
  partition: number
  offset: number
  timestamp: number
  key?: string
  value: string
}

export type IMessageFilters = {
  [k in keyof IMessage]?: string
}
