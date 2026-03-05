const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getUsers: () => ipcRenderer.invoke("getUsers")
});