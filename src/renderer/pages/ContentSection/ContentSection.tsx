import React, { useCallback, useEffect, useState } from 'react';

import { CurrentWindow } from '../../../@types';
import { Game } from '../../../@types/models';
import { requestGamesList } from '../../events/game';
import { gamesListener } from '../../listeners/games';
import { useWindowContext } from '../../contexts/currentWindow';
import HomeView from './HomeView';
import ListView from './ListView';
import { useSelectedGameContext } from '../../contexts/selectedGame';

const ContentSection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { state: windowState } = useWindowContext();
  const { state: selectedGame, dispatch: setSelectedGame } = useSelectedGameContext();

  const requestGames = useCallback(() => {
    const newSelectedGame = JSON.parse(localStorage.getItem('selectedGame') || '{}')
      ? JSON.parse(localStorage.getItem('selectedGame') || '{}')
      : selectedGame;
    requestGamesList();
    gamesListener(setGames, setSelectedGame, newSelectedGame);
  }, []);

  useEffect(() => {
    requestGames();
  }, []);

  switch (windowState.currentWindow) {
    case CurrentWindow.HOME:
      return <HomeView games={games} />;

    case CurrentWindow.LIST:
      return <ListView games={games} />;

    default:
      return <></>;
  }
};

export default ContentSection;
