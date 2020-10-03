import React, { memo, useState } from 'react';
import { useSelectedGameContext } from '../../contexts/selectedGame';
import { GamesList } from './GamesList/GamesList';
import { GameDetails } from './GameContainer/GameContainer';
import styles from './styles.module.scss';
import GameBanner from './GameBanner/GameBanner';

import { CurrentWindow } from '../../../@types';
import { Game } from '../../../@types/models';
import { requestGamesList } from '../../events/game';
import { gamesListener } from '../../listeners/games';
import GameCarousel from './GameCarousel/GameCarousel';
import { useFilterContext } from '../../contexts/filteredGame';
import { useWindowContext } from '../../contexts/currentWindow';
import VerticalGameCarousel from './GameCarousel/VerticalGameCarousel';

const ContentSection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([] as Game[]);
  const { state: game, dispatch } = useSelectedGameContext();
  const { state: filterState } = useFilterContext();
  const { state: windowState } = useWindowContext();

  const setSelectedGame = (newGame: Game) => {
    if (game.id !== newGame.id) {
      dispatch({
        type: 'setSelectedGame',
        payload: newGame,
      });
      localStorage.setItem('selectedGame', JSON.stringify(newGame));
    }
  };

  if (!games.length) {
    requestGamesList();
    gamesListener(setGames, setSelectedGame);
  }

  if (windowState.currentWindow === CurrentWindow.HOME && !filterState.gameName) {
    const lastPlayedGames = [...games]
      .sort((a: Game, b: Game) => {
        return (a.lastPlayed || 0) === (b.lastPlayed || 0)
          ? 0
          : (a.lastPlayed || 0) > (b.lastPlayed || 0)
          ? 1
          : -1;
      })
      .reverse()
      .slice(0, 20);

    const collection = [...games]
      .sort((a: Game, b: Game) => {
        return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
      })
      .slice(0, 20);

    return (
      <section className={styles['content-section']}>
        <div>
          <MemoGameBanner game={game} />
          <div className={styles['game-lists']}>
            <VerticalGameCarousel
              title="Continue Playing"
              games={lastPlayedGames}
              selectedGame={game}
              setSelectedGame={setSelectedGame}
            />

            <GameCarousel
              title="Collection"
              games={collection}
              selectedGame={game}
              setSelectedGame={setSelectedGame}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles['content-section']}>
      <GamesList games={games} selectedGame={game} setSelectedGame={setSelectedGame} />
      {game.id && <MemoGameDetails game={game} />}
    </section>
  );
};

const MemoGameBanner = memo(GameBanner);

const MemoGameDetails = memo(GameDetails);

export default ContentSection;
