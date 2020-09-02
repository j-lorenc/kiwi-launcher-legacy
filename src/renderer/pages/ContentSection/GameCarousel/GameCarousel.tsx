import React from 'react';
import { Game } from '../../../../@types';

import ChevronLeftIcon from 'feather-icons/dist/icons/chevron-left.svg';
import ChevronRightIcon from 'feather-icons/dist/icons/chevron-right.svg';
import styles from './styles.module.scss';

const GameCarousel: React.FC<{
  selectedGame: Game;
  games: Game[];
  setSelectedGame: (game: Game) => void;
  title: string;
}> = ({ selectedGame, games, setSelectedGame, title }) => {
  return (
    <div className={styles['game-container']}>
      <h1 className={styles['game-container__header']}>{title}</h1>
      <div className={styles['game-container']}>
        <div className={`${styles['games-list__nav']} ${styles['games-list__nav--backwards']}`}>
          <ChevronLeftIcon />
        </div>
        <div className={styles['games-list']}>
          {games.map((game) => {
            return (
              <div
                key={game.id}
                className={`${styles['games-list__image-container']} ${
                  game.id === selectedGame.id ? styles['games-list__image-container--active'] : ''
                }`}
                onClick={() => setSelectedGame(game)}
              >
                <img src={game.coverUrl} />
              </div>
            );
          })}
        </div>
        <div className={`${styles['games-list__nav']} ${styles['games-list__nav--forwards']}`}>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default GameCarousel;
