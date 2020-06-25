import React, { useState } from 'react';
import styles from './styles.module.scss';
import { gamesListener } from '../../listeners/games';
import { Game } from '../../../@types';
import { useSelectedGameContext } from '../../contexts/selectedGame';
import { useFilterContext } from '../../contexts/filteredGame';

const ContentSection: React.FC = () => {
  return (
    <section>
      <GamesList />
      <GameDetails />
    </section>
  );
};

const GamesList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([] as Game[]);
  const { state, dispatch } = useSelectedGameContext();
  const { state: filterState } = useFilterContext();

  gamesListener(setGames);

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
              <button
                className={`${styles['games-list__game']} ${
                  state.id === game.id ? styles['games-list__game--active'] : ''
                }`}
                onClick={() => {
                  setSelectedGame(game);
                }}
              >
                <img className={styles['games-list__game__icon']} src={game.iconUrl} />
                {game.name}
              </button>
            </li>
          ))}
      </ul>
    </aside>
  );
};

const GameDetails: React.FC = () => {
  return <main></main>;
};

export default ContentSection;
