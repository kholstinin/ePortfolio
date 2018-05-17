const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
const url = require('url');

let win;
let tray;

app.commandLine.appendSwitch('remote-debugging-port', '9222');

function createMainWindow() {
  win = new BrowserWindow({width: 1366, height: 768});

  // tray = new Tray('');
  // const contextMenu = Menu.buildFromTemplate([
  //   {label: 'Item1', type: 'radio'},
  //   {label: 'Item2', type: 'radio'},
  //   {label: 'Item3', type: 'radio', checked: true},
  //   {label: 'Item4', type: 'radio'}
  // ]);
  // tray.setToolTip('This is my application.');
  // tray.setContextMenu(contextMenu);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.on('closed', () => {
    win = null;
  });

  win.webContents.openDevTools();
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