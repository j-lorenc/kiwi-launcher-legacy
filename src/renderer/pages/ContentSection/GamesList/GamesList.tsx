import React from 'react';
import { Game } from '../../../../@types/models';
import { useSelectedGameContext } from '../../../contexts/selectedGame';
import { useFilterContext } from '../../../contexts/filteredGame';

import styles from './styles.module.scss';

import cs from 'classnames';

export const GamesList: React.FC<{
  games: Game[];
}> = ({ games }) => {
  const { state: filterState } = useFilterContext();

  const filteredGames = games
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .filter((game) => {
      return game.name.toLocaleLowerCase().includes(filterState.gameName.toLocaleLowerCase());
    });

  return (
    <aside className={styles['games-list-container']}>
      <div className={styles['games-list__header']}>Library</div>
      <div className={styles['games-list__section']}>
        <ul className={styles['games-list']}>
          {filteredGames.map((game) => (
            <li key={game.id} className={styles['games-list__list-item']}>
              <GameButton game={game} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const GameButton: React.FC<{
  game: Game;
}> = ({ game }) => {
  const { state: selectedGame, dispatch: setSelectedGame } = useSelectedGameContext();

  const buttonClasses = cs({
    [styles['games-list__game']]: true,
    [styles['games-list__game--active']]: selectedGame.id === game.id,
    [styles['games-list__game--installed']]: game.installed,
  });

  return (
    <button
      className={buttonClasses}
      onClick={() => {
        setSelectedGame({ type: 'setSelectedGame', payload: game });
      }}
    >
      <img className={styles['games-list__game__icon']} src={game.iconUrl} />
      {game.name}
    </button>
  );
};
