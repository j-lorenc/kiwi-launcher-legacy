import { app, BrowserWindow, session } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

app.on('ready', appReady);
app.on('window-all-closed', allWindowsClosed);
app.on('activate', activate);

function appReady() {
  createWindow();
}

function allWindowsClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

function activate() {
  if (!win) {
    createWindow();
  }
}

const createWindow = async () => {
  // if (process.env.NODE_ENV !== 'production') {
  // }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/', 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  win.on('closed', () => {
    win = null;
  });
};
