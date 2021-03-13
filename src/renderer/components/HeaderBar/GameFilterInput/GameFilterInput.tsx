import React, { useEffect, useRef } from 'react';
import { CurrentWindow } from '../../../../@types';
import { useWindowContext } from '../../../contexts/currentWindow';
import { useFilterContext } from '../../../contexts/filteredGame';
import gameFilterInputStyles from './game-filter-input.module.scss';
import SearchIcon from 'feather-icons/dist/icons/search.svg';
import DeleteIcon from '@fortawesome/fontawesome-pro/svgs/regular/backspace.svg';

export const GameFilterInput: React.FC = () => {
  const { state: filterState, dispatch: filterDispatch } = useFilterContext();
  const { dispatch: windowDispatch } = useWindowContext();

  const { gameName } = filterState;

  const filterActive = gameName.length > 0;
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Mousetrap.bind(['command+f', 'ctrl+f'], () => {
      searchRef.current?.focus();
      return false;
    });

    return () => {
      Mousetrap.unbind(['command+f', 'ctrl+f']);
    };
  }, []);

  const onFilterChange = (text: string): void => {
    let windowType: CurrentWindow;

    if (text.length === 0) {
      windowType = CurrentWindow.HOME;
    } else {
      windowType = CurrentWindow.LIST;
    }

    windowDispatch({
      type: 'setCurrentWindow',
      payload: windowType,
    });

    filterDispatch({
      type: 'filter',
      payload: text,
    });
  };

  const onFilterClear = (): void => {
    filterDispatch({
      type: 'filter',
      payload: '',
    });
  };

  return (
    <div className={gameFilterInputStyles['search-container']}>
      <div
        className={`${gameFilterInputStyles['search-container__icon']} ${gameFilterInputStyles['search-container__icon--search']}`}
      >
        <SearchIcon />
      </div>
      <input
        ref={searchRef}
        className={filterActive ? `${gameFilterInputStyles['active']}` : undefined}
        type="type"
        value={gameName}
        onKeyPress={(e) => {
          if (e.keyCode == 27) {
            searchRef.current?.blur();
          }
        }}
        onChange={(e) => {
          onFilterChange(e.target.value);
        }}
      />
      <div
        className={`${gameFilterInputStyles['search-container__icon']} ${gameFilterInputStyles['search-container__icon--delete']}`}
        onClick={() => {
          onFilterClear();
        }}
      >
        <DeleteIcon width="24" path="white" />
      </div>
    </div>
  );
};
