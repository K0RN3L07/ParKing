const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getUserCount: () => ipcRenderer.invoke("getUserCount"),
    getActiveBookingCount: () => ipcRenderer.invoke("getActiveBookingCount"),
    getAllBookingPrices: () => ipcRenderer.invoke("getAllBookingPrices"),
    getTodaysRevenue: () => ipcRenderer.invoke("getTodaysRevenue"),
    getAverageBookingTime: () => ipcRenderer.invoke("getAverageBookingTime"),
    
    getBookingsPerDay: () => ipcRenderer.invoke("getBookingsPerDay"),
    getPeakParkingHours: () => ipcRenderer.invoke("getPeakParkingHours"),
    getMostUsedParkingSpaces: () => ipcRenderer.invoke("getMostUsedParkingSpaces"),
    getRevenueOverTime: () => ipcRenderer.invoke("getRevenueOverTime"),
    getBookingsByStatus: () => ipcRenderer.invoke("getBookingsByStatus"),

    getUsers: () => ipcRenderer.invoke("getUsers"),
    deleteUser: (id) => ipcRenderer.invoke("deleteUser", id),
    editUser: (id, name, email, phone_num, password) => ipcRenderer.invoke("editUser", id, name, email, phone_num, password),

    getAllBookings: () => ipcRenderer.invoke("getAllBookings"),
    deleteBooking: (id) => ipcRenderer.invoke("deleteBooking", id),
    editBooking: (id, plate_num, start_time, end_time, parking_space_id) => ipcRenderer.invoke("editBooking", id, plate_num, start_time, end_time, parking_space_id),

    getAllParkingSpaces: () => ipcRenderer.invoke("getAllParkingSpaces"),

    getAllMessages: () => ipcRenderer.invoke("getAllMessages"),
    deleteMessage: (id) => ipcRenderer.invoke("deleteMessage", id),
});