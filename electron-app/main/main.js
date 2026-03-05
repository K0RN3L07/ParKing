const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const mainController = require('../controllers/mainController');

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

  win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html')),
  win.maximize();
}

app.whenReady().then(() => {

  ipcMain.handle('getUsers', mainController.getUsers);

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});