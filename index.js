const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: 'public/favicon.ico',
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  })
  mainWindow.maximize()
  mainWindow.setMenu(null)
  if (process.env.NODE_ENV === 'dev') {
    mainWindow.loadURL('http://localhost:4000')
    mainWindow.webContents.openDevTools({ mode: 'right', activate: false })
  } else {
    mainWindow.loadFile(path.join(process.cwd(), 'resources', 'app', 'index.html'))
  }
}

app.on('ready', () => {
  const { nativeTheme } = require('electron')
  nativeTheme.themeSource = 'light'

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
