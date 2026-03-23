const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const parkingSpacesController = require('../controllers/parkingSpacesController');
const messagesController = require('../controllers/messagesController');

function createWindow() {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../assets/img", "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  win.loadFile(path.join(__dirname, "..", "renderer", "index.html"));

  win.maximize();

  // Enable DevTools
  win.webContents.on('before-input-event', (event, input) => {
    if (
      input.key === 'F12' ||
      (input.control && input.shift && input.key.toLowerCase() === 'i')
    ) {
      win.webContents.toggleDevTools();
    }
  });
}

app.whenReady().then(() => {

  ipcMain.handle('getUserCount', mainController.getUserCount);
  ipcMain.handle('getActiveBookingCount', mainController.getActiveBookingCount);
  ipcMain.handle('getAllBookingPrices', mainController.getAllBookingPrices);
  ipcMain.handle('getTodaysRevenue', mainController.getTodaysRevenue);
  ipcMain.handle('getAverageBookingTime', mainController.getAverageBookingTime);

  // Statistic for charts
  ipcMain.handle('getBookingsPerDay', mainController.getBookingsPerDay);
  ipcMain.handle('getPeakParkingHours', mainController.getPeakParkingHours);
  ipcMain.handle('getMostUsedParkingSpaces', mainController.getMostUsedParkingSpaces);
  ipcMain.handle('getRevenueOverTime', mainController.getRevenueOverTime);
  ipcMain.handle('getBookingsByStatus', mainController.getBookingsByStatus);

  ipcMain.handle('getUsers', userController.getUsers);

  ipcMain.handle('getAllBookings', bookingController.getAllBookings);

  ipcMain.handle('getAllParkingSpaces', parkingSpacesController.getAllParkingSpaces);

  ipcMain.handle('getAllMessages', messagesController.getAllMessages);

  createWindow();

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});