const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createMainWindow() {
  win = new BrowserWindow({width: 1366, height: 768});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.on('closed', () => {
    win = null;
  });

  win.webContents.openDevTools()
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createMainWindow();
  }
});