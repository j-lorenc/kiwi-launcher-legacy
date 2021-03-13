import React, { useContext } from 'react';
import { SelectedGameContextType, SelectedGameAction } from '../../@types';
import { Game } from '../../@types/models';

export const selectedGameReducer = (state: Game, action: SelectedGameAction): Game => {
  switch (action.type) {
    case 'setSelectedGame': {
      if (state.id === action.payload.id) {
        return state;
      }
      const newGame = { ...state, ...action.payload };
      localStorage.setItem('selectedGame', JSON.stringify(newGame));
      return newGame;
    }
  }
};

export const initialGameSelected: Game = {
  id: '',
  name: '',
  originalId: '',
};

const SelectedGameContext = React.createContext<SelectedGameContextType>({
  state: initialGameSelected,
  dispatch: () => null,
});

export const useSelectedGameContext = (): SelectedGameContextType => {
  return useContext<SelectedGameContextType>(SelectedGameContext);
};

export default SelectedGameContext;
