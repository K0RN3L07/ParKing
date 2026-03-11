const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getUserCount: () => ipcRenderer.invoke("getUserCount"),
    getBookingCount: () => ipcRenderer.invoke("getBookingCount"),
    getAllBookingPrices: () => ipcRenderer.invoke("getAllBookingPrices"),
    
    getBookingsPerDay: () => ipcRenderer.invoke("getBookingsPerDay"),
    getPeakParkingHours: () => ipcRenderer.invoke("getPeakParkingHours"),
    getMostUsedParkingSpaces: () => ipcRenderer.invoke("getMostUsedParkingSpaces"),
    getRevenueOverTime: () => ipcRenderer.invoke("getRevenueOverTime"),
    getBookingsByStatus: () => ipcRenderer.invoke("getBookingsByStatus"),

    getUsers: () => ipcRenderer.invoke("getUsers"),

    getAllBookings: () => ipcRenderer.invoke("getAllBookings"),

    getAllParkingSpaces: () => ipcRenderer.invoke("getAllParkingSpaces"),

    getAllMessages: () => ipcRenderer.invoke("getAllMessages"),
});