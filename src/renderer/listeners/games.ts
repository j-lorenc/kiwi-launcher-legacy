import { Game } from '../../@types';

export const gamesListener = (setGames: (games: Game[]) => void): void => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'games') {
      setGames(e.data.value);
    }
  });
};
