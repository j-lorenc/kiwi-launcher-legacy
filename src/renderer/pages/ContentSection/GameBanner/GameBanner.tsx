import React from 'react';
import styles from './styles.module.scss';
import { Game } from '../../../../@types/models';

import SteamIcon from '../../../assets/images/steam.svg';

import ClockIcon from 'feather-icons/dist/icons/clock.svg';
import CalendarIcon from 'feather-icons/dist/icons/calendar.svg';
import { PlayButton, InstallButton } from '../../../components/GameButton/GameButton';
import withAnimation from '../../../hocs/withAnimation';
import { AnimeProps } from 'react-anime';

const GameBanner: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div
      className={styles['game-view']}
      style={{
        backgroundImage: `url(
          '${game.backgroundUrl}'
        )`,
      }}
    >
      <GameDataWithAnimation game={game} />
    </div>
  );
};

const GameData: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className={styles['game-view__container']}>
      <h1 className={styles['game-view__header']}>{game.name}</h1>

      <div className={styles['game-view__meta']}>
        <div className={styles['game-view__launcher']}>
          <SteamIcon width={'20px'} height={'20px'} />
        </div>

        <div className={styles['game-view__playtime']}>
          <div className={styles['img']}>
            <ClockIcon width={20} height={20} viewBox="0 0 24 24" />
          </div>
          {game.playtime
            ? `
            ${
              Math.floor(game.playtime / 60)
                ? `${Math.floor(game.playtime / 60)} hour${
                    Math.floor(game.playtime / 60) > 1 ? 's' : ''
                  }`
                : ''
            }
            ${
              !Math.floor(game.playtime / 60)
                ? `${game.playtime % 60} minute${game.playtime % 60 > 1 ? 's' : ''}`
                : ''
            }
          `
            : 'Unplayed'}
        </div>

        <div className={styles['game-view__last-played']}>
          <div className={styles['img']}>
            <CalendarIcon width={20} height={20} viewBox="0 0 24 24" />
          </div>
          {game.lastPlayed ? new Date(game.lastPlayed * 1000).toLocaleDateString() : 'Unplayed'}
        </div>
      </div>
      {game.installed ? (
        <PlayButton id={game.originalId} />
      ) : (
        <InstallButton id={game.originalId} />
      )}
    </div>
  );
};

const GameDataWithAnimation = withAnimation<{ game: Game }>([
  { opacity: [0, 1], duration: 600, easing: 'linear' } as AnimeProps,
])(GameData);

export default GameBanner;
