import React, { useContext, Dispatch } from 'react';
import { GameFilter } from '../../@types/index';

export const filterReducer = (state: GameFilter, action: FilterAction): GameFilter => {
  switch (action.type) {
    case 'filter': {
      return {
        ...state,
        gameName: action.payload,
      };
    }
    default:
      return state;
  }
};

export type FilterAction = { type: 'filter'; payload: string };

export const initialFilter: GameFilter = {
  gameName: '',
};

const FilterContext = React.createContext<{ state: GameFilter; dispatch: Dispatch<FilterAction> }>({
  state: initialFilter,
  dispatch: () => null,
});

export const useFilterContext = (): { state: GameFilter; dispatch: Dispatch<FilterAction> } => {
  return useContext<{ state: GameFilter; dispatch: Dispatch<FilterAction> }>(FilterContext);
};

export default FilterContext;
