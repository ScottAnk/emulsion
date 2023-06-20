const sqlite3 = require('sqlite3')
const isDev = require('electron-is-dev')

const database = new sqlite3.Database('./electron/db.sqlite3', (err) => {
  if (err) console.error('Database opening error: ', err)
})

database
  .exec(
    `CREATE TABLE IF NOT EXISTS Images(
      uid TEXT,
      rating INTEGER,
      tags REAL,
      flag INTEGER DEFAULT 0 CHECK (flag BETWEEN -1 and 1),
      collections REAL,
      note TEXT
    )`
  )
  .exec(
    `CREATE TABLE IF NOT EXISTS Collections(
      name TEXT,
      description TEXT
    )`
  )

if (isDev) {
  database.on('trace', (sql) => console.log('SQLite executing:', sql))
}

module.exports = { database }
