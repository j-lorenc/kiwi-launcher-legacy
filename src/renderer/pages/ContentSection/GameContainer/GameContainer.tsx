import React from 'react';
import { Game } from '../../../../@types';
import withAnimation from '../../../hocs/withAnimation';
import { AnimeProps } from 'react-anime';
import styles from './styles.module.scss';
import { CoverImage } from '../../../components/CoverImage/CoverImage';
import { launchGame } from '../../../events/game';
import PlayButtonIcon from 'feather-icons/dist/icons/play.svg';
import DownloadButtonIcon from 'feather-icons/dist/icons/download.svg';

export const GameDetails: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <main className={styles['card-container']}>
      <div className={styles['card-wrapper']}>
        <AnimatedCard game={game} />
      </div>
    </main>
  );
};

const Card: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className={`${styles.card}`}>
      <AnimatedInnerCard game={game} />
    </div>
  );
};

const InnerCard: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className={styles['card__card-grid']}>
      <div className={styles['card__card-grid__row']}>
        {game.coverUrl && (
          <CoverImage className={styles['card__cover-image']} coverSrc={game.coverUrl} />
        )}
        <h1 className={`${styles['card__header']}`}> {game.name}</h1>
      </div>
      <div className={styles['card__card-grid__row']}>
        {game.installed ? (
          <PlayButton id={game.originalId} />
        ) : (
          <InstallButton id={game.originalId} />
        )}
      </div>
    </div>
  );
};

const InstallButton: React.FC<{ id: number | string }> = ({ id }) => {
  return (
    <button
      onClick={() => {
        launchGame(id);
      }}
      className={`${styles['card__launch-button']} ${styles['card__launch-button--install']}`}
    >
      <span>
        <DownloadButtonIcon />
        Install
      </span>
    </button>
  );
};

const PlayButton: React.FC<{ id: number | string }> = ({ id }) => {
  return (
    <button
      onClick={() => {
        launchGame(id);
      }}
      className={`${styles['card__launch-button']} ${styles['card__launch-button--launch']}`}
    >
      <span>
        <PlayButtonIcon />
        Play
      </span>
    </button>
  );
};

const AnimatedCard = withAnimation<{ game: Game }>([
  { translateY: [50, 0], duration: 400, easing: 'easeInSine' } as AnimeProps,
])(Card);

const AnimatedInnerCard = withAnimation<{ game: Game }>([
  { delay: 100, opacity: [0, 1], duration: 300, easing: 'linear' } as AnimeProps,
])(InnerCard);
