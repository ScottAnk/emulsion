const { app, dialog, ipcMain } = require('electron')
const { databaseHandler } = require('./databaseMessage')

function importImages(event) {
  dialog
    .showOpenDialog(undefined, {
      title: 'Import Images',
      defaultPath: app.getPath('home'),
      properties: ['openFile', 'multiSelections'],
    })
    .then((selection) => {
      if (selection.canceled || selection.filePaths.length === 0) return

      databaseHandler.insertImages(selection.filePaths)
    })
}

ipcMain.on('importImages', importImages)

module.exports = { importImages }
