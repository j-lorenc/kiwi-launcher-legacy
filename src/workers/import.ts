import ipc from 'node-ipc';
import { v4 as uuid } from 'uuid';
import { importGame, refreshGamesList } from './services/gameService';
import steamAuthService from './services/launcher/steam/steamAuthService';

ipc.config.id = uuid();
ipc.config.retry = 1000;

ipc.connectTo('renderer', function () {
  ipc.of.renderer.on('connect', function () {
    ipc.log('## connected to renderer ##', ipc.config);
    ipc.of.renderer.emit('app.message', {
      id: ipc.config.id,
      message: 'hello',
    });

    ipc.of.renderer.emit('app.connect', {
      id: ipc.config.id,
      message: ipc.config.id,
    });
  });

  ipc.of.renderer.on('request-games-list', () => {
    ipc.log('requesting games list');
    importGame();
  });

  ipc.of.renderer.on('submit-steam-creds', async (data) => {
    ipc.log('setting the auth');
    await steamAuthService.storeSteamCreds(data.steamUserKey, data.steamApiKey);
  });

  ipc.of.renderer.on('refresh-games-list', () => {
    ipc.log('refreshing games list');
    refreshGamesList();
  });

  ipc.of.renderer.on('disconnect', () => {
    ipc.log('disconnected from renderer');
  });

  ipc.of.renderer.on('app.message', (data) => {
    ipc.log('got a message from renderer : ', data);
  });

  console.log(ipc.of.renderer.destroy);
});
