import React, { useState } from 'react';
import { Game } from '../../../../@types/models';

import ChevronLeftIcon from 'feather-icons/dist/icons/chevron-left.svg';
import ChevronRightIcon from 'feather-icons/dist/icons/chevron-right.svg';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Direction } from './VerticalGameCarousel';

const GameCarousel: React.FC<{
  games: Game[];
  title: string;
}> = ({ games, title }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className={styles['game-container']}>
      <h1 className={styles['game-container__header']}>{title}</h1>
      <div className={styles['games-lists']}>
        {index > 0 && (
          <GameList
            games={games}
            position={Direction.LEFT}
            initialIndex={index - 1}
            onClick={() => {
              setIndex(index - 1);
            }}
          />
        )}
        <GameList games={games} initialIndex={index} />
        <GameList
          games={games}
          position={Direction.RIGHT}
          initialIndex={index + 1}
          onClick={() => {
            setIndex(index + 1);
          }}
        />
      </div>
    </div>
  );
};

const GameList: React.FC<{
  games: Game[];
  position?: Direction;
  initialIndex: number;
  onClick?: () => void;
}> = ({ games, position, initialIndex, onClick }) => {
  const [selectedGame, setSelectedGame] = useState<Game>();
  const entries = 7;

  const gameListClasses = classNames({
    [styles['games-list']]: true,
    [styles['games-list--right']]: position == Direction.RIGHT,
    [styles['games-list--left']]: position == Direction.LEFT,
  });

  return (
    <div className={gameListClasses} style={{ gridTemplateColumns: `repeat(${entries}, 1fr)` }}>
      {[...games].splice(initialIndex * entries, entries).map((game) => {
        return (
          <div
            key={game.id}
            className={`${styles['games-list__image-container']} ${
              selectedGame && game.id === selectedGame.id
                ? styles['games-list__image-container--active']
                : ''
            } ${game.coverUrl && styles['games-list__image-container--shadow']}`}
            onClick={() => {
              onClick?.();
              setSelectedGame(game);
            }}
          >
            {game.coverUrl ? <img src={game.coverUrl} /> : <div>{game.name}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default GameCarousel;
