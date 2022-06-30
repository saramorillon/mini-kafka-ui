import { EachMessagePayload } from 'kafkajs'
import path from 'path'
import sqlite3 from 'sqlite3'
import { IMessage } from '../models/IMessage'
import { settings } from '../settings'

const dbFile = path.join(settings.configDir, 'db.sqlite')

export const db = new sqlite3.Database(dbFile)

function run(query: string, params: unknown[] = []) {
  return new Promise<void>((res, rej) => db.run(query, params, (err) => (err ? rej(err) : res())))
}

function get<T>(query: string, params: unknown[] = []) {
  return new Promise<T>((res, rej) => db.get(query, params, (err, row) => (err ? rej(err) : res(row))))
}

function all<T>(query: string, params: unknown[] = []) {
  return new Promise<T[]>((res, rej) => db.all(query, params, (err, rows) => (err ? rej(err) : res(rows))))
}

export class Database {
  static async init() {
    await run(`DROP TABLE IF EXISTS "message";`)
    await run(`
    CREATE TABLE "message" (
      "server" TEXT NOT NULL,
      "topic" TEXT NOT NULL,
      "partition" INTEGER NOT NULL,
      "offset" TEXT NOT NULL,
      "timestamp" TEXT NOT NULL,
      "key" TEXT DEFAULT NULL,
      "value" TEXT DEFAULT NULL,
      PRIMARY KEY ("server", "topic", "partition", "offset")
    );`)
  }

  private static getFilter(filters: Record<string, string>) {
    const values = Object.entries(filters)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => `LOWER("${key}") LIKE '%${value}%'`)
    return values.length ? `WHERE ${values.join(' AND ')}` : ''
  }

  static async count(filters: Record<string, string>): Promise<number> {
    const { total } = await get(`SELECT count(*) as total from "message" ${this.getFilter(filters)}`)
    return total
  }

  static getMessages(filters: Record<string, string>, page: number, limit: number): Promise<IMessage[]> {
    return all(`SELECT * from "message" ${this.getFilter(filters)} LIMIT ${limit} OFFSET ${(page - 1) * limit}`)
  }

  static async insertMessage(key: string, topic: string, payload: EachMessagePayload) {
    await run(`INSERT OR IGNORE INTO "message" VALUES (?, ?, ?, ?, ?, ?, ?);`, [
      key,
      topic,
      payload.partition,
      payload.message.offset,
      payload.message.timestamp,
      payload.message.key?.toString() || null,
      payload.message.value?.toString() || null,
    ])
  }
}
