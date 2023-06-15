const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('message', {
  indexImages: () => ipcRenderer.send('indexImages'),
  importImages: () => ipcRenderer.send('importImages'),
})

ipcRenderer.on('indexImages', (event, response) =>
  console.log('response from db: ', response)
)
