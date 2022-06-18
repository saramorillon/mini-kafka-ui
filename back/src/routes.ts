import { ipcMain } from 'electron'
import { openConfigDir } from './controllers/config'
import { getServer, getServers, saveServer } from './controllers/server'

ipcMain.handle('open-config-dir', openConfigDir)

ipcMain.handle('get-servers', getServers)
ipcMain.handle('get-server', getServer)
ipcMain.handle('save-server', saveServer)
