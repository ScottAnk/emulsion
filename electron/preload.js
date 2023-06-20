const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('message', {
  indexImages: () => ipcRenderer.send('indexImages'),
  importImages: () => ipcRenderer.send('importImages'),
  forgetImage: (id) => ipcRenderer.send('forgetImage', id),
})

ipcRenderer.on('indexImages', (event, response) =>
  console.log('response from db: ', response)
)

ipcRenderer.on('error', (event, error) => {
  console.error(error)
})
