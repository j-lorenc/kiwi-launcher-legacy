import React from 'react';
import styles from './styles.module.scss';
import { useFilterContext } from '../../contexts/filteredGame';

const ContentSection: React.FC = () => {
  return (
    <section>
      <GamesList />
      <GameDetails />
    </section>
  );
};

const GamesList: React.FC = () => {
  const { state } = useFilterContext();

  return (
    <aside className={styles['games-list-container']}>
      <ul className={styles['games-list']}>
        <li className={styles['games-list__list-item']}>
          <button className={`${styles['games-list__game']} ${styles['games-list__game--active']}`}>
            {state.gameName}
          </button>
        </li>
      </ul>
    </aside>
  );
};

const GameDetails: React.FC = () => {
  return <main></main>;
};

export default ContentSection;
