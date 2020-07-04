import windowManager from './managers/window/window';
import gameManager from './managers/game/game';

window.addEventListener('DOMContentLoaded', async () => {
  window.addEventListener('message', (e: MessageEvent) => {
    windowManager.attachEvents(e);
    gameManager.attachEvents(e);
  });
});
