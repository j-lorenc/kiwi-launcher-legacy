import React from 'react';
import { Game } from '../../../../@types';
import withAnimation from '../../../hocs/withAnimation';
import { AnimeProps } from 'react-anime';
import styles from './styles.module.scss';
import { CoverImage } from '../../../components/CoverImage/CoverImage';

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
      {game.coverUrl && (
        <CoverImage className={styles['card__cover-image']} coverSrc={game.coverUrl} />
      )}
      <h1 className={`${styles['card__header']}`}> {game.name}</h1>
    </div>
  );
};

const AnimatedCard = withAnimation<{ game: Game }>([
  { translateY: [50, 0], duration: 400, easing: 'easeInSine' } as AnimeProps,
])(Card);

const AnimatedInnerCard = withAnimation<{ game: Game }>([
  { delay: 100, opacity: [0, 1], duration: 300, easing: 'linear' } as AnimeProps,
])(InnerCard);
