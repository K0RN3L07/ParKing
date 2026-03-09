const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const ejs = require('ejs');
const fs = require('fs');

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');

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

  const page = path.join(__dirname, '..', 'renderer', 'views', 'index.ejs');
  const layout = path.join(__dirname, '..', 'renderer', 'views', 'layout.ejs');

  const pageHtml = ejs.render(
    fs.readFileSync(page, "utf8"),
    {}
  );

  const finalHtml = ejs.render(
    fs.readFileSync(layout, "utf8"),
    {
      title: "ParKing - Adminfelület",
      body: pageHtml
    }
  );

  // win.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(finalHtml));
  const tempHtmlPath = path.join(__dirname, '..', 'renderer', 'index.html');
  fs.writeFileSync(tempHtmlPath, finalHtml);
  win.loadFile(tempHtmlPath);

  win.maximize();
}

app.whenReady().then(() => {

  ipcMain.handle('getUserCount', mainController.getUserCount);
  ipcMain.handle('getUsers', userController.getUsers);
  ipcMain.handle('getAllBookings', bookingController.getAllBookings);

  createWindow();

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});