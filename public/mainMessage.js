const { ipcMain } = require('electron')

console.log('ran main message')

ipcMain.handle('test', () => 'test response')
