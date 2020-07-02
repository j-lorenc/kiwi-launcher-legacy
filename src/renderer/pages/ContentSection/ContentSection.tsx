import React, { memo } from 'react';
import { useSelectedGameContext } from '../../contexts/selectedGame';
import { GamesList } from './GamesList/GamesList';
import { GameDetails } from './GameContainer/GameContainer';
import styles from './styles.module.scss';

const ContentSection: React.FC = () => {
  const { state: game, dispatch } = useSelectedGameContext();
  return (
    <section className={styles['content-section']}>
      <GamesList selectedGame={game} setSelectedGame={dispatch} />
      {game.id && <MemoGameDetails game={game} />}
    </section>
  );
};

const MemoGameDetails = memo(GameDetails);

export default ContentSection;
