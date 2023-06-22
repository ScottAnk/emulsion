const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('message', {
  indexImages: () => ipcRenderer.send('indexImages'),
  importImages: () => ipcRenderer.send('importImages'),
  forgetImage: (id) => ipcRenderer.send('forgetImage', id),
  updateImage: (params) => ipcRenderer.send('updateImage', params),
})

contextBridge.exposeInMainWorld('env', {
  cwd: process.cwd(),
})

ipcRenderer.on('indexImages', (event, response) => {
  console.log('response from db:')
  console.table(response)
})

ipcRenderer.on('error', (event, error) => {
  console.error(error)
})
