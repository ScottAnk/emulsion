const databaseHandler = require('./databaseMessage')
const sqlite3 = require('sqlite3')
const { unlink } = require('fs/promises')

// databaseMessage depends on electron.ipcMain
jest.mock(
  'electron',
  () => {
    const mockIpcMain = {
      on: jest.fn(),
      handle: jest.fn(),
    }
    return { ipcMain: mockIpcMain }
  },
  { virtual: true }
)

let database
beforeAll(() => {
  database = new sqlite3.Database('./test.sqlite3', (err) => {
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
})

afterAll(() => {
  return unlink('./test.sqlite3')
})

// struggling to think of any unittests that are valuable here
// test('createImage stores image location', () => {
//   databaseHandler.createImage({}, { uid: '/home/scott/Pictures/testImage.jpg' })
//   expect(true).toEqual(true)
// })
