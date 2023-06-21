const { Menu } = require('electron')
const { importImages } = require('../utilities/fileHandler')

const template = [
  {
    label: 'File',
    role: 'fileMenu',
    submenu: [
      {
        label: 'Import Image',
        click: importImages,
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
