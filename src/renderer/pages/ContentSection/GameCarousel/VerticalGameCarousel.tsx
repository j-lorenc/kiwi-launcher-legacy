import React, { Dispatch, useState } from 'react';
import { Game } from '../../../../@types/models';

import ChevronLeftIcon from 'feather-icons/dist/icons/chevron-left.svg';
import ChevronRightIcon from 'feather-icons/dist/icons/chevron-right.svg';
import styles from './styles.module.scss';
import cs from 'classnames';
import classNames from 'classnames';
import { CSSTransition, Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import withAnimation from '../../../hocs/withAnimation';
import { AnimeProps } from 'react-anime';

export enum Direction {
  LEFT,
  RIGHT,
}

const VerticalGameCarousel: React.FC<{
  games: Game[];
  title: string;
}> = ({ games, title }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className={styles['game-container']}>
      <h1 className={styles['game-container__header']}>{title}</h1>
      <div className={styles['games-lists']}>
        {index > 0 && (
          <GamesList
            position={Direction.LEFT}
            games={games}
            initialIndex={index - 1}
            onClick={() => {
              setIndex(index - 1);
            }}
          />
        )}
        <GamesList games={games} initialIndex={index} />
        <GamesList
          position={Direction.RIGHT}
          games={games}
          initialIndex={index + 1}
          onClick={() => {
            setIndex(index + 1);
          }}
        />
      </div>
    </div>
  );
};

interface GamesListProps {
  games: Game[];
  position?: Direction;
  initialIndex?: number;
  onClick?: () => void;
}

const GamesList: React.FC<GamesListProps> = ({ games, position, initialIndex = 0, onClick }) => {
  const entries = 8;
  const [selectedGame, setSelectedGame] = useState<Game>();

  const gameListClasses = classNames({
    [styles['games-list']]: true,
    [styles['games-list--right']]: position == Direction.RIGHT,
    [styles['games-list--left']]: position == Direction.LEFT,
  });

  return (
    <div className={gameListClasses} style={{ gridTemplateColumns: `repeat(${entries}, 1fr)` }}>
      {[...games].splice(entries * initialIndex, entries).map((game) => {
        const verticalCoverStyles = cs({
          [styles['games-list__image-container']]: true,
          [styles['games-list__image-container--active']]:
            selectedGame && game.id === selectedGame.id,
          [styles['games-list__image-container--shadow']]: game.coverUrl,
          [styles['games-list__image-container--vertical']]: true,
        });

        return (
          <div
            key={game.id}
            className={verticalCoverStyles}
            onClick={() => {
              onClick?.();
              setSelectedGame(game);
            }}
          >
            {game.coverUrl ? <img src={game.verticalUrl} /> : <div>{game.name}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default VerticalGameCarousel;
