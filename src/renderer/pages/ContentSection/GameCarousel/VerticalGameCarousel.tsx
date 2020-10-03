import React from 'react';
import { Game } from '../../../../@types/models';

import ChevronLeftIcon from 'feather-icons/dist/icons/chevron-left.svg';
import ChevronRightIcon from 'feather-icons/dist/icons/chevron-right.svg';
import styles from './styles.module.scss';
import cs from 'classnames';

const VerticalGameCarousel: React.FC<{
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
            const verticalCoverStyles = cs({
              [styles['games-list__image-container']]: true,
              [styles['games-list__image-container--active']]: game.id === selectedGame.id,
              [styles['games-list__image-container--shadow']]: game.coverUrl,
              [styles['games-list__image-container--vertical']]: true,
            });

            return (
              <div
                key={game.id}
                className={verticalCoverStyles}
                onClick={() => setSelectedGame(game)}
              >
                {game.coverUrl ? <img src={game.verticalUrl} /> : <div>{game.name}</div>}
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

export default VerticalGameCarousel;
