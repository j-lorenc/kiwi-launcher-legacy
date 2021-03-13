import React from 'react';
import { Game } from '../../../@types/models';
import GameBanner from './GameBanner/GameBanner';
import GameCarousel from './GameCarousel/GameCarousel';
import VerticalGameCarousel from './GameCarousel/VerticalGameCarousel';
import styles from './styles.module.scss';

const HomeView: React.FC<{ games: Game[] }> = ({ games = [] }) => {
  const lastPlayedGames = [...games]
    .sort((a: Game, b: Game) => {
      return (a.lastPlayed || 0) === (b.lastPlayed || 0)
        ? 0
        : (a.lastPlayed || 0) > (b.lastPlayed || 0)
        ? 1
        : -1;
    })
    .reverse();

  const collection = [...games].sort((a: Game, b: Game) => {
    return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
  });

  return (
    <section className={styles['content-section']}>
      <div>
        <GameBanner game={lastPlayedGames[0]} />
        <div className={styles['game-lists']}>
          <VerticalGameCarousel title="Continue Playing" games={lastPlayedGames} />
          <GameCarousel title="Collection" games={collection} />
        </div>
      </div>
    </section>
  );
};

export default HomeView;
