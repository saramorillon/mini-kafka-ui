import { ipcMain } from 'electron'
import { getApp } from './controllers/app'
import { openConfigDir } from './controllers/config'
import { startConsumer, stopConsumer } from './controllers/consumer'
import { sendMessage } from './controllers/message'
import { deleteServer, getServer, getServers, saveServer } from './controllers/server'
import { getFavoriteTopics, getTopics, toggleTopicFavorite } from './controllers/topic'

ipcMain.handle('get-app', getApp)

ipcMain.handle('open-config-dir', openConfigDir)

ipcMain.handle('get-servers', getServers)
ipcMain.handle('get-server', getServer)
ipcMain.handle('save-server', saveServer)
ipcMain.handle('delete-server', deleteServer)

ipcMain.handle('get-topics', getTopics)
ipcMain.handle('get-favorite-topics', getFavoriteTopics)
ipcMain.handle('toggle-topic-favorite', toggleTopicFavorite)

ipcMain.handle('start-consumer', startConsumer)
ipcMain.handle('stop-consumer', stopConsumer)

ipcMain.handle('send-message', sendMessage)
