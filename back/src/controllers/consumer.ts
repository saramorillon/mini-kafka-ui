import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { Consumer } from 'kafkajs'
import { getClient } from '../services/kafka'
import { settings } from '../settings'

const { groupId } = settings

let consumer: Consumer

export async function startConsumer(event: IpcMainInvokeEvent, key: string, topic: string) {
  const win = BrowserWindow.getFocusedWindow()

  const client = await getClient(key)
  consumer = client.consumer({ groupId })
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  // await consumer.run({
  //   autoCommit: false,
  //   eachMessage: (payload) => {
  //     if (win) {
  //       win.webContents.send('message', payload)
  //     }
  //     return Promise.resolve(undefined)
  //   },
  // })
}

export async function stopConsumer() {
  if (consumer) {
    await consumer.stop()
    await consumer.disconnect()
  }
}
