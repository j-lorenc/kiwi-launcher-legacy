import steamService from './launcher/steam/steamService';

import { seed } from '../../shared/db';

import ipc from 'node-ipc';

async function seedDatabase() {
  await seed();
}

seedDatabase();

export const refreshGamesList = (): void => {
  console.log('Refreshing games list');
};

export const requestGamesList = async (): Promise<void> => {
  await importGame();
};

export const importGame = async (): Promise<void> => {
  steamService.import().then((games) => {
    ipc.of.renderer.emit('games-list', {
      id: ipc.config.id,
      message: games,
    });
  });
};
