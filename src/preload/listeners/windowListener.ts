import windowManager from '../managers/windowManager';

export const attachWindowListeners = (event: string): void => {
  if (event === 'close-window') {
    windowManager.closeWindow();
  }

  if (event === 'minimize-window') {
    windowManager.minimizeWindow();
  }

  if (event === 'maximize-window') {
    windowManager.maximizeWindow();
  }
};

export default {
  attachWindowListeners,
};
