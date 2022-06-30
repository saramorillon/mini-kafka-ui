import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { KafkaService } from '../services/kafka'

export async function startConsumer(event: IpcMainInvokeEvent, key: string, topic: string) {
  await KafkaService.create(key, topic)
  KafkaService.instance.on('total', (total) => {
    BrowserWindow.getFocusedWindow()?.webContents.send('total', total)
  })
}

export async function stopConsumer() {
  await KafkaService.destroy()
}
