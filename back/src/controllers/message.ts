import { IpcMainInvokeEvent } from 'electron'
import { KafkaService } from '../services/kafka'

export function getMessages(event: IpcMainInvokeEvent, filters: Record<string, string>, page: number, limit: number) {
  return KafkaService.instance.getMessages(filters, page, limit)
}
