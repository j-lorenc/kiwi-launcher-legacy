import React from 'react';
import styles from './styles.module.scss';

const ContentSection: React.FC = () => {
  return (
    <section>
      <GamesList />
      <GameDetails />
    </section>
  );
};

const GamesList: React.FC = () => {
  const games = [] as {
    _id: string;
    name: string;
    iconUrl: string;
  }[];
  return (
    <aside className={styles['games-list-container']}>
      <ul className={styles['games-list']}>
        {games.map((game) => {
          return (
            <li key={game._id} className={styles['games-list__list-item']}>
              <button className={`${styles['games-list__game']}`}>
                <img className={styles['games-list__game__icon']} src={game.iconUrl} />
                {game.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

const GameDetails: React.FC = () => {
  return <main></main>;
};

export default ContentSection;
