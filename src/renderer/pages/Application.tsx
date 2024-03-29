import { hot } from 'react-hot-loader/root';
import React, { useReducer } from 'react';
import styles from './app.module.scss';
import HeaderBar from './HeaderBar/HeaderBar';
import FilterContext, { filterReducer, initialFilter } from '../contexts/filteredGame';
import SelectedGameContext, {
  selectedGameReducer,
  initialGameSelected,
  useSelectedGameContext,
} from '../contexts/selectedGame';
import FooterBar from './FooterBar/FooterBar';
import ContentSection from './ContentSection/ContentSection';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const Application: () => JSX.Element = () => {
  const [state, dispatch] = useReducer(filterReducer, initialFilter);
  const [selectedGameState, selectedGameDispatch] = useReducer(
    selectedGameReducer,
    initialGameSelected
  );

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      <SelectedGameContext.Provider
        value={{ state: selectedGameState, dispatch: selectedGameDispatch }}
      >
        <div className={styles['app-container']}>
          <BackgroundImageContainer />
          <HeaderBar title="Kiwi Launcher" />
          <ContentSection />
          <FooterBar />
        </div>
      </SelectedGameContext.Provider>
    </FilterContext.Provider>
  );
};

const BackgroundImageContainer: React.FC = () => {
  const { state: selectedGame } = useSelectedGameContext();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={selectedGame ? `${selectedGame.id}-background` : ''}
        timeout={350}
        classNames={'fade'}
      >
        <div
          className={styles.background}
          style={selectedGame && { backgroundImage: `url(${selectedGame.backgroundUrl})` }}
        />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default hot(Application);
