import { Consumer, EachBatchPayload, Kafka, KafkaMessage } from 'kafkajs'
import { EventEmitter } from 'stream'
import { getConfig } from '../controllers/config'
import { settings } from '../settings'

const { clientId, groupId } = settings

export class KafkaService extends EventEmitter {
  private static _instance?: KafkaService
  private _client?: Kafka
  private _consumer?: Consumer

  private _messages: { partition: number; message: KafkaMessage }[] = []

  constructor() {
    super()
  }

  static async create(key: string, topic: string) {
    this._instance = new KafkaService()
    await this._instance.start(key, topic)
  }

  static async destroy() {
    if (this._instance) {
      await this._instance.stop()
      delete this._instance
    }
  }

  static get instance() {
    if (!this._instance) {
      throw new Error('Kakfa client has not been instanciated')
    }
    return this._instance
  }

  private async start(key: string, topic: string) {
    this._client = await KafkaService.getClient(key)
    this._consumer = this._client.consumer({ groupId })
    await this._consumer.connect()
    await this._consumer.subscribe({ topic, fromBeginning: true })
    await this._consumer.run({
      autoCommit: false,
      eachBatchAutoResolve: false,
      eachBatch: this.eachBatch.bind(this),
    })
  }

  private async stop() {
    if (this._consumer) {
      await this._consumer.stop()
      await this._consumer.disconnect()
    }
  }

  private async eachBatch(payload: EachBatchPayload) {
    this._messages.push(...payload.batch.messages.map((message) => ({ partition: payload.batch.partition, message })))
    await Promise.resolve(undefined)
    this.emit('total', this._messages.length)
  }

  static async getClient(key: string) {
    const config = await getConfig()
    const { brokers } = config.servers[key] || { brokers: [] }
    if (!brokers.length) {
      throw new Error(`Missing brokers in config for server ${key}`)
    }
    return new Kafka({ brokers, clientId })
  }

  getMessages(filters: Record<string, string>, page: number, limit: number) {
    return this._messages
      .filter(
        (payload) =>
          (!filters.partition || payload.partition.toString() === filters.partition) &&
          (!filters.offset || payload.message.offset === filters.offset) &&
          (!filters.date || payload.message.timestamp > filters.date) &&
          (!filters.key || payload.message.key?.toString().toLowerCase().includes(filters.key.toLowerCase())) &&
          (!filters.value || payload.message.value?.toString().toLowerCase().includes(filters.value?.toLowerCase()))
      )
      .slice((page - 1) * limit, page * limit)
  }
}
