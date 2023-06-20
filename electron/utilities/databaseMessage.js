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

  updateImage(event, params) {
    if (!params.rowid) {
      event.reply('error', 'updates require a rowid property')
      return
    }

    const validKeys = ['uid', 'rating', 'tags', 'flag', 'collections', 'note']
    const paramKeys = Object.keys(params)
    let sqlParams = []

    let sql = `UPDATE Images`
    for (let key of validKeys) {
      if (paramKeys.find((element) => element === key)) {
        sql += `\nSET ${key} = ?`
        sqlParams.push(params[key])
      }
    }
    sql += `\nWHERE rowid = ?`
    sqlParams.push(params.rowid)

    if (sqlParams.length === 1) {
      event.reply('error', 'update did not contain valid column keys')
      return
    }

    this.database.run(sql, sqlParams)
  }
}

const databaseHandler = new DatabaseHandler()

ipcMain.on('indexImages', databaseHandler.indexImages.bind(databaseHandler))
ipcMain.on('forgetImage', databaseHandler.deleteImage.bind(databaseHandler))
ipcMain.on('updateImage', databaseHandler.updateImage.bind(databaseHandler))

module.exports = { databaseHandler }
