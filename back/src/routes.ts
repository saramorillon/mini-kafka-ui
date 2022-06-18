import { ipcMain } from 'electron'
import { getApp } from './controllers/app'
import { openConfigDir } from './controllers/config'
import { getServer, getServers, saveServer } from './controllers/server'

ipcMain.handle('get-app', getApp)

ipcMain.handle('open-config-dir', openConfigDir)

ipcMain.handle('get-servers', getServers)
ipcMain.handle('get-server', getServer)
ipcMain.handle('save-server', saveServer)
