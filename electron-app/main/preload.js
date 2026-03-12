const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getUserCount: () => ipcRenderer.invoke("getUserCount"),
    getActiveBookingCount: () => ipcRenderer.invoke("getActiveBookingCount"),
    getAllBookingPrices: () => ipcRenderer.invoke("getAllBookingPrices"),
    getTodaysRevenue: () => ipcRenderer.invoke("getTodaysRevenue"),
    
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