const { ipcMain } = require('electron')

class DatabaseHandler {
  constructor() {
    this.database = null
  }

  attach(database) {
    this.database = database
  }

  test() {
    return 'test response from database handler'
  }
}

const databaseHandler = new DatabaseHandler()

ipcMain.handle('test', () => databaseHandler.test())

module.exports = { databaseHandler }
