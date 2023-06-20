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
    this.database.all(
      `SELECT rowid, uid, rating, tags, flag, collections, note FROM Images`,
      (err, rows) => event.reply('indexImages', rows)
    )
  }

  deleteImage(event, id) {
    this.database.run('DELETE FROM Images WHERE rowid=?', id, function (error) {
      if (error) event.reply('error', error)
      if (!this.changes) event.reply('error', 'delete failed to match rowid')
    })
  }
}

const databaseHandler = new DatabaseHandler()

ipcMain.on('indexImages', databaseHandler.indexImages.bind(databaseHandler))
ipcMain.on('forgetImage', databaseHandler.deleteImage.bind(databaseHandler))

module.exports = { databaseHandler }
