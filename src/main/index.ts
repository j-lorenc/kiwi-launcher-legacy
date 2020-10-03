import { app, BrowserWindow, protocol } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as isDev from 'electron-is-dev';

export let win: BrowserWindow | null = null;

export function attachEvents(): void {
  app.on('ready', appReady);
  app.on('window-all-closed', allWindowsClosed);
  app.on('activate', activate);
}

export async function appReady(): Promise<void> {
  createWindow();
}

export function allWindowsClosed(): void {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

export function activate(): void {
  if (!win) {
    createWindow();
  }
}

export async function createWindow(): Promise<void> {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    show: false,
    minWidth: 1200,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '../preload', 'preload.js'),
      contextIsolation: false,
      experimentalFeatures: true,
      webSecurity: isDev ? false : true,
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

  win.once('ready-to-show', () => {
    if (win) {
      win.maximize();
      win.show();
    }
  });

  win.on('closed', () => {
    win = null;
  });

  protocol.interceptFileProtocol('file', (req, callback) => {
    callback(decodeURI(req.url.substring(8)));
  });
}

attachEvents();
