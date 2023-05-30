const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('message', {
  test: () => ipcRenderer.invoke('test'),
})
