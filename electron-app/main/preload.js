const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getUserCount: () => ipcRenderer.invoke("getUserCount"),
    getUsers: () => ipcRenderer.invoke("getUsers"),
    getAllBookings: () => ipcRenderer.invoke("getAllBookings"),
    getAllParkingSpaces: () => ipcRenderer.invoke("getAllParkingSpaces"),
    getAllMessages: () => ipcRenderer.invoke("getAllMessages"),
});