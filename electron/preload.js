const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('message', {
  createImage: (image) => ipcRenderer.invoke('createImage', image),
  indexImages: () => ipcRenderer.send('indexImages'),
})

ipcRenderer.on('indexImages', (event, response) =>
  console.log('response from db: ', response)
)
