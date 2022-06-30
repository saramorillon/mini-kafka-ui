import { BrowserWindow } from 'electron'
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs'
import { EventEmitter } from 'stream'
import { getConfig } from '../controllers/config'
import { settings } from '../settings'

const { clientId, groupId } = settings

export class KafkaService extends EventEmitter {
  private static _emitter?: EventEmitter

  private static _client?: Kafka
  private static _consumer?: Consumer

  private static _filters: Record<string, string>
  private static _page: number
  private static _limit: number

  private static _messages: { partition: number; offset: string; timestamp: string; key?: string; value?: string }[] =
    []

  static get emitter() {
    if (!this._emitter) {
      this._emitter = new EventEmitter()
    }
    return this._emitter
  }

  static get filteredMessages() {
    return this._messages.filter(
      (payload) =>
        (!this._filters.partition || payload.partition.toString() === this._filters.partition) &&
        (!this._filters.offset || payload.offset === this._filters.offset) &&
        (!this._filters.date || payload.timestamp > this._filters.date) &&
        (!this._filters.key || payload.key?.toString().toLowerCase().includes(this._filters.key.toLowerCase())) &&
        (!this._filters.value || payload.value?.toString().toLowerCase().includes(this._filters.value?.toLowerCase()))
    )
  }

  static get messages() {
    return this.filteredMessages.slice((this._page - 1) * this._limit, this._page * this._limit)
  }

  static async create(key: string, topic: string) {
    if (!this._consumer) {
      const client = await this.getClient(key)
      this._consumer = client.consumer({ groupId })
      await this._consumer.connect()
      await this._consumer.subscribe({ topic, fromBeginning: true })
      await this._consumer.run({
        autoCommit: false,
        eachMessage: this.eachMessage.bind(this),
      })
    }
  }

  static async destroy() {
    if (this._consumer) {
      await this._consumer.stop()
      await this._consumer.disconnect()
      this._messages = []
      delete this._client
      delete this._consumer
    }
  }

  private static async eachMessage(payload: EachMessagePayload) {
    this._messages.push({
      partition: payload.partition,
      offset: payload.message.offset,
      timestamp: payload.message.timestamp,
      key: payload.message.key?.toString(),
      value: payload.message.value?.toString(),
    })
    await Promise.resolve(undefined)
    BrowserWindow.getAllWindows()[0].webContents.send('total', this.filteredMessages.length)
    if (this._messages.length < this._page * this._limit) {
      BrowserWindow.getAllWindows()[0].webContents.send('messages', this.messages)
    }
  }

  static async getClient(key: string) {
    if (!this._client) {
      const config = await getConfig()
      const { brokers } = config.servers[key] || { brokers: [] }
      if (!brokers.length) {
        throw new Error(`Missing brokers in config for server ${key}`)
      }
      this._client = new Kafka({ brokers, clientId })
    }
    return this._client
  }

  static getMessages(filters: Record<string, string>, page: number, limit: number) {
    this._filters = filters
    this._page = page
    this._limit = limit
    BrowserWindow.getAllWindows()[0].webContents.send('total', this.filteredMessages.length)
    BrowserWindow.getAllWindows()[0].webContents.send('messages', this.messages)
  }
}
