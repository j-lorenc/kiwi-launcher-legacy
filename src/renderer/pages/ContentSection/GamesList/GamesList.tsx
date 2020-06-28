import React, { useState } from 'react';
import { Game, SelectedGameAction } from '../../../../@types';
import { useSelectedGameContext } from '../../../contexts/selectedGame';
import { useFilterContext } from '../../../contexts/filteredGame';
import { requestGamesList } from '../../../events/window';
import { gamesListener } from '../../../listeners/games';

import styles from './styles.module.scss';

export const GamesList: React.FC<{
  selectedGame: Game;
  setSelectedGame: React.Dispatch<SelectedGameAction>;
}> = () => {
  const [games, setGames] = useState<Game[]>([] as Game[]);
  const { state: selectedGame, dispatch } = useSelectedGameContext();
  const { state: filterState } = useFilterContext();

  if (!games.length) {
    requestGamesList();
    gamesListener(setGames);
  }

  const setSelectedGame = (game: Game) => {
    dispatch({
      type: 'setSelectedGame',
      payload: game,
    });
  };

  return (
    <aside className={styles['games-list-container']}>
      <ul className={styles['games-list']}>
        {games
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .filter((game) => {
            return game.name.toLocaleLowerCase().includes(filterState.gameName.toLocaleLowerCase());
          })
          .map((game) => (
            <li key={game.id} className={styles['games-list__list-item']}>
              <GameButton
                game={game}
                setSelectedGame={setSelectedGame}
                selectedGame={selectedGame}
              />
            </li>
          ))}
      </ul>
    </aside>
  );
};

const GameButton: React.FC<{
  game: Game;
  selectedGame: Game;
  setSelectedGame: (game: Game) => void;
}> = ({ game, selectedGame, setSelectedGame }) => {
  return (
    <button
      className={`${styles['games-list__game']} ${
        selectedGame.id === game.id ? styles['games-list__game--active'] : ''
      }`}
      onClick={() => {
        if (selectedGame.id !== game.id) {
          setSelectedGame(game);
        }
      }}
    >
      <img className={styles['games-list__game__icon']} src={game.iconUrl} />
      {game.name}
    </button>
  );
};
