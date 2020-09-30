import { remote } from 'electron';
import mousetrap from 'mousetrap';

const bindKeys = (): void => {
  mousetrap.bind('ctrl+`', () => {
    if (remote.getCurrentWebContents().isDevToolsOpened()) {
      remote.getCurrentWebContents().closeDevTools();
    } else {
      remote.getCurrentWebContents().openDevTools();
    }
  });
};

const closeWindow = (): void => {
  remote.getCurrentWindow().close();
};

const minimizeWindow = (): void => {
  remote.getCurrentWindow().minimize();
};

const maximizeWindow = (): void => {
  if (remote.getCurrentWindow().isMaximized()) {
    remote.getCurrentWindow().unmaximize();
  } else {
    remote.getCurrentWindow().maximize();
  }
};

export default {
  bindKeys,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
};
