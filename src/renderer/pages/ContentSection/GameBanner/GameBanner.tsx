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
  if (!game) return <></>;

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
  const { name, originalId, installed, playtime, lastPlayed } = game;

  return (
    <div className={styles['game-view__container']}>
      <h1 className={styles['game-view__header']}>{name}</h1>

      <div className={styles['game-view__meta']}>
        <div>{installed ? <PlayButton id={originalId} /> : <InstallButton id={originalId} />}</div>
        <div className={styles['game-view__launcher']}>
          <SteamIcon width={'20px'} height={'20px'} />
        </div>

        <div className={styles['game-view__playtime']}>
          <div className={styles['img']}>
            <ClockIcon width={20} height={20} viewBox="0 0 24 24" />
          </div>
          {}
          {playtime
            ? `
            ${
              Math.floor(playtime / 60)
                ? `${Math.floor(playtime / 60)} hour${Math.floor(playtime / 60) > 1 ? 's' : ''}`
                : ''
            }
            ${
              !Math.floor(playtime / 60)
                ? `${playtime % 60} minute${playtime % 60 > 1 ? 's' : ''}`
                : ''
            }
          `
            : 'Unplayed'}
        </div>

        <div className={styles['game-view__last-played']}>
          <div className={styles['img']}>
            <CalendarIcon width={20} height={20} viewBox="0 0 24 24" />
          </div>
          {lastPlayed ? new Date(lastPlayed * 1000).toLocaleDateString() : 'Unplayed'}
        </div>
      </div>
    </div>
  );
};

const GameDataWithAnimation = withAnimation<{ game: Game }>([
  { opacity: [0, 1], duration: 600, easing: 'linear' } as AnimeProps,
])(GameData);

export default GameBanner;
