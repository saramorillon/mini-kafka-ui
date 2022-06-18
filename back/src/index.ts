import { app, BrowserWindow, shell } from 'electron'
import { promises } from 'fs'
import path from 'path'
import { getConfig, updateConfig } from './controllers/config'
import './routes'
import { settings } from './settings'

let timeout: NodeJS.Timeout

function updateWindow(win: BrowserWindow) {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    void updateConfig({
      window: {
        maximized: win.isMaximized(),
        x: win.getPosition()[0],
        y: win.getPosition()[1],
        width: win.getSize()[0],
        height: win.getSize()[1],
      },
    })
  }, 250)
}

async function createWindow() {
  await promises.mkdir(settings.configDir, { recursive: true }).catch(() => false)

  const config = await getConfig()

  const win = new BrowserWindow({
    ...config.window,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  })
  if (config.window?.maximized) win.maximize()

  win.setMenu(null)
  await win.loadURL('about:blank').catch(console.error)

  if (process.env.NODE_ENV === 'dev') {
    win.webContents.openDevTools({ mode: 'right', activate: false })
    await win.loadURL('http://localhost:4000').catch(console.error)
  } else {
    await win.loadFile(path.join(process.cwd(), 'resources', 'app', 'public', 'index.html')).catch(console.error)
  }

  win.on('maximize', () => updateWindow(win))
  win.on('unmaximize', () => updateWindow(win))
  win.on('moved', () => updateWindow(win))
  win.on('resized', () => updateWindow(win))
  win.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)
    return { action: 'deny' }
  })
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown') {
      if (input.key === 'F5') win.reload()
      if (process.env.NODE_ENV === 'dev' && input.key === 'F12') win.webContents.toggleDevTools()
    }
  })
}

app.on('ready', () => createWindow())
app.on('window-all-closed', () => app.quit())
