const sqlite3 = require('sqlite3')

const database = new sqlite3.Database('./public/db.sqlite3', (e) => {
  if (e) console.error('Database opening error: ', e)
})

module.exports = { database }
