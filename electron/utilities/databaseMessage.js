const { ipcMain } = require('electron')

class DatabaseHandler {
  constructor() {
    this.database = null
  }

  attach(database) {
    this.database = database
  }

  insertImages(imagePaths) {
    for (let path of imagePaths) {
      this.database.run(`INSERT INTO Images (uid) VALUES (?)`, path)
    }
  }

  indexImages(event) {
    this.database.all(`SELECT * FROM Images`, (err, rows) =>
      event.reply('indexImages', rows)
    )
  }
}

const databaseHandler = new DatabaseHandler()

ipcMain.on('indexImages', databaseHandler.indexImages.bind(databaseHandler))

module.exports = { databaseHandler }
