import { ipcMain } from 'electron'
import { getApp } from './controllers/app'
import { openConfigDir } from './controllers/config'
import { deleteServer, getServer, getServers, saveServer } from './controllers/server'
import { getTopics } from './controllers/topic'

ipcMain.handle('get-app', getApp)

ipcMain.handle('open-config-dir', openConfigDir)

ipcMain.handle('get-servers', getServers)
ipcMain.handle('get-server', getServer)
ipcMain.handle('save-server', saveServer)
ipcMain.handle('delete-server', deleteServer)

ipcMain.handle('get-topics', getTopics)
