import { IMessage } from './IMessage'

export interface IPartition {
  index: number
  messages: IMessage[]
}
