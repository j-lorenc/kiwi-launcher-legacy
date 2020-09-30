import { Game } from '../../@types/models';

export const sendGames = (games: Game[]): void => {
  window.postMessage(
    {
      type: 'games',
      value: games,
    },
    '*'
  );
};
