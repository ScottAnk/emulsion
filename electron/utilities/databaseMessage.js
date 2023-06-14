const { ipcMain } = require('electron')

class DatabaseHandler {
  constructor() {
    this.database = null
  }

  attach(database) {
    this.database = database
  }

  createImage(event, image) {
    this.database.run(`INSERT INTO Images (uid) VALUES(?)`, image.uid)
  }

  indexImages(event) {
    this.database.all(`SELECT * FROM Images`, (err, rows) =>
      event.reply('indexImages', rows)
    )
  }
}

const databaseHandler = new DatabaseHandler()

ipcMain.handle('createImage', databaseHandler.createImage.bind(databaseHandler))
ipcMain.on('indexImages', databaseHandler.indexImages.bind(databaseHandler))

module.exports = { databaseHandler }
