import React, { memo } from 'react';
import { Game } from '../../../@types/models';
import { useSelectedGameContext } from '../../contexts/selectedGame';
import { GameDetails } from './GameContainer/GameContainer';
import { GamesList } from './GamesList/GamesList';
import styles from './styles.module.scss';

const ListView: React.FC<{ games: Game[] }> = ({ games }) => {
  const { state: game } = useSelectedGameContext();

  return (
    <section className={`${styles['content-section']} ${styles['content-section--no-scroll']}`}>
      <MemoGamesList games={games} />
      <MemoGameDetails game={game} />
    </section>
  );
};

const MemoGamesList = memo(GamesList);
const MemoGameDetails = memo(GameDetails);

export default ListView;
