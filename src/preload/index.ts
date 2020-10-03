import windowManager from './managers/windowManager';
import windowListener from './listeners/windowListener';
import ipc from 'node-ipc';
import { fork, exec } from 'child_process';
import { sendGames } from './events/game';
import steamService from './services/launchers/steam/steamService';

ipc.config.id = 'renderer';
ipc.config.retry = 1500;

const sockets: any[] = [];

ipc.serve(() => {
  ipc.server.on('app.message', (data, socket) => {
    ipc.server.emit(socket, 'app.message', {
      id: ipc.config.id,
      message: data.message + ' world!',
    });
  });

  ipc.server.on('app.connect', (data, socket) => {
    ipc.log(data.message + 'connected');
    sockets.push(socket);
  });

  ipc.server.on('games-list', (data) => {
    sendGames(data.message);
  });
});

if (sockets.length < 1) {
  ipc.server.start();
  fork('./dist/worker/import');
}

window.addEventListener('DOMContentLoaded', async () => {
  windowManager.bindKeys();

  window.addEventListener('message', (e: MessageEvent) => {
    windowListener.attachWindowListeners(e.data.type);

    if (e.data.type === 'request-games-list') {
      const timers = setInterval(() => {
        if (sockets[0]) {
          ipc.server.emit(sockets[0], 'request-games-list', {
            id: ipc.config.id,
            message: 'requesting games list',
          });
          clearInterval(timers);
        }
      }, 1000);
    }

    if (e.data.type === 'submit-steam-creds') {
      const timers = setInterval(() => {
        if (sockets[0]) {
          ipc.server.emit(sockets[0], 'submit-steam-creds', {
            id: ipc.config.id,
            steamUserKey: e.data.value.steamUserKey,
            steamApiKey: e.data.value.steamApiKey,
          });
          clearInterval(timers);
        }
      }, 1000);
    }

    if (e.data.type === 'refresh-games-list') {
      if (sockets[0]) {
        ipc.server.emit(sockets[0], 'refresh-games-list', {
          id: ipc.config.id,
          message: 'refreshing games list',
        });
      }
    }

    if (e.data.type === 'refresh-games-list') {
      if (sockets[0]) {
        ipc.server.emit(sockets[0], 'refresh-games-list', {
          id: ipc.config.id,
          message: 'refreshing games list',
        });
      }
    }

    if (e.data.type === 'launch-game') {
      launchGame(e.data.value);
    }

    if (e.data.type === 'open-store') {
      openStore();
    }
  });
});

const launchGame = (id: string): void => {
  steamService.launchGame(id);
};

const openStore = (): void => {
  exec(`start steam://openurl/https://store.steampowered.com/`, {});
};
