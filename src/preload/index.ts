import { remote } from 'electron';
import mousetrap from 'mousetrap';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'close-window') {
      remote.getCurrentWindow().close();
    }

    if (e.data.type === 'minimize-window') {
      remote.getCurrentWindow().minimize();
    }

    if (e.data.type === 'maximize-window') {
      if (remote.getCurrentWindow().isMaximized()) {
        remote.getCurrentWindow().unmaximize();
      } else {
        remote.getCurrentWindow().maximize();
      }
    }
  });
});

mousetrap.bind('ctrl+`', () => {
  if (remote.getCurrentWebContents().isDevToolsOpened()) {
    remote.getCurrentWebContents().closeDevTools();
  } else {
    remote.getCurrentWebContents().openDevTools();
  }
});
