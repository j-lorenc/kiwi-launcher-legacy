import { SelectedGameAction } from '../../@types';
import { Game } from '../../@types/models';

export const gamesListener = (
  setGames: (games: Game[]) => void,
  setSelectedGame: (gameAction: SelectedGameAction) => void,
  selectedGame?: Game
): void => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'games') {
      const games: Game[] = e.data.value;
      setGames(games);

      const newGame = selectedGame && selectedGame.id ? selectedGame : games[0];

      setSelectedGame({
        type: 'setSelectedGame',
        payload: newGame,
      });
    }
  });
};
