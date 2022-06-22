import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { Consumer } from 'kafkajs'
import { getClient } from '../services/kafka'
import { settings } from '../settings'

const { groupId } = settings

let consumer: Consumer | null = null

export async function startConsumer(event: IpcMainInvokeEvent, key: string, topic: string) {
  if (!consumer) {
    console.log('Starting consumer')
    const win = BrowserWindow.getFocusedWindow()

    const client = await getClient(key)
    consumer = client.consumer({ groupId })
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })

    await consumer.run({
      autoCommit: false,
      eachMessage: (payload) => {
        if (win && payload.message.value) {
          win.webContents.send('message', {
            partition: payload.partition,
            offset: payload.message.offset,
            timestamp: Number(payload.message.timestamp),
            key: payload.message.key?.toString(),
            value: payload.message.value.toString(),
          })
        }
        return Promise.resolve(undefined)
      },
    })
  }
}

export async function stopConsumer() {
  if (consumer) {
    console.log('Stopping consumer')
    await consumer.stop()
    await consumer.disconnect()
    consumer = null
  }
}
