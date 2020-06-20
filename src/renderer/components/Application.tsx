import { hot } from 'react-hot-loader/root';
import React, { useReducer } from 'react';
import styles from './app.module.scss';
import HeaderBar from './HeaderBar/HeaderBar';
import FilterContext, { filterReducer, initialFilter } from '../contexts/filteredGame';
import FooterBar from './FooterBar/FooterBar';
import ContentSection from './ContentSection/ContentSection';

export const Application: () => JSX.Element = () => {
  const [state, dispatch] = useReducer(filterReducer, initialFilter);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      <div className={styles['app-container']}>
        <HeaderBar title="Kiwi Launcher" />
        <ContentSection />
        <FooterBar />
      </div>
    </FilterContext.Provider>
  );
};

export default hot(Application);
