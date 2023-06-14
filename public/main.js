const path = require('path')
const isDev = require('electron-is-dev')
const { app, protocol, net, BrowserWindow } = require('electron')

const { database } = require('./database.js')
const { databaseHandler } = require('./databaseMessage.js')
databaseHandler.attach(database)

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: !isDev,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }
}

app
  .whenReady()
  .then(createWindow)
  .then(() => {
    console.log('sanity check: now app ready status is ', app.isReady())
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
