import { Game } from '../../@types';

export const gamesListener = (
  setGames: (games: Game[]) => void,
  setSelectedGame: (game: Game) => void
): void => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'games') {
      setGames(e.data.value);
      setSelectedGame(
        (JSON.parse(localStorage.getItem('selectedGame') || '') as Game) || e.data.value[0]
      );
    }
  });
};
