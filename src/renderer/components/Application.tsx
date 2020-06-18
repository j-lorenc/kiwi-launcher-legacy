import { hot } from 'react-hot-loader/root';
import React, { useReducer } from 'react';
import * as styles from './app.module.scss';
import HeaderBar from './HeaderBar/HeaderBar';
import FilterContext, { filterReducer, initialFilter } from '../contexts/filteredGame';

export const Application: () => JSX.Element = () => {
  const [state, dispatch] = useReducer(filterReducer, initialFilter);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      <div>
        <HeaderBar title="Kiwi Launcher" />
        <h1 className={styles.fun}>{state.gameName}</h1>
      </div>
    </FilterContext.Provider>
  );
};

export default hot(Application);
