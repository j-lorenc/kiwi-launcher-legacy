import React, { useContext } from 'react';
import { GameFilter, FilterAction, FilterContextType } from '../../@types';

export const filterReducer = (state: GameFilter, action: FilterAction): GameFilter => {
  switch (action.type) {
    case 'filter': {
      return {
        ...state,
        gameName: action.payload,
      };
    }
  }
};

export const initialFilter: GameFilter = {
  gameName: '',
};

const FilterContext = React.createContext<FilterContextType>({
  state: initialFilter,
  dispatch: () => null,
});

export const useFilterContext = (): FilterContextType => {
  return useContext<FilterContextType>(FilterContext);
};

export default FilterContext;
