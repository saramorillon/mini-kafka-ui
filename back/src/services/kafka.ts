import { BrowserWindow } from 'electron'
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs'
import { EventEmitter } from 'stream'
import { getConfig } from '../controllers/config'
import { settings } from '../settings'
import { Database } from './db'

const { clientId, groupId } = settings

export class KafkaService extends EventEmitter {
  private static _consumer?: Consumer

  private static _filters: Record<string, string>
  private static _page: number
  private static _limit: number

  static async getClient(key: string) {
    const config = await getConfig()
    const { brokers } = config.servers[key] || { brokers: [] }
    if (!brokers.length) {
      throw new Error(`Missing brokers in config for server ${key}`)
    }
    return new Kafka({ brokers, clientId })
  }

  static async create(key: string, topic: string) {
    await this.destroy()
    const client = await this.getClient(key)
    this._consumer = client.consumer({ groupId })
    await this._consumer.connect()
    await this._consumer.subscribe({ topic, fromBeginning: true })
    await this._consumer.run({
      autoCommit: false,
      eachMessage: this.eachMessage.bind(this, key, topic),
    })
  }

  static async destroy() {
    if (this._consumer) {
      await this._consumer.stop()
      await this._consumer.disconnect()
      delete this._consumer
    }
  }

  private static async eachMessage(key: string, topic: string, payload: EachMessagePayload) {
    await Database.insertMessage(key, topic, payload)

    await this.sendTotal()

    const total = await Database.count({})
    if (total < this._page * this._limit) {
      await this.sendMessages()
    }
  }

  static async getMessages(filters: Record<string, string>, page: number, limit: number) {
    this._filters = filters
    this._page = page
    this._limit = limit

    await this.sendTotal()
    await this.sendMessages()
  }

  private static async sendTotal() {
    const total = await Database.count(this._filters)
    BrowserWindow.getAllWindows()[0].webContents.send('total', total)
  }

  private static async sendMessages() {
    const messages = await Database.getMessages(this._filters, this._page, this._limit)
    BrowserWindow.getAllWindows()[0].webContents.send('messages', messages)
  }
}
