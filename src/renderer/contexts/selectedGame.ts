import React, { useContext } from 'react';
import { SelectedGameContextType, Game, SelectedGameAction } from '../../@types';

export const selectedGameReducer = (state: Game, action: SelectedGameAction): Game => {
  switch (action.type) {
    case 'setSelectedGame': {
      return {
        ...action.payload,
      };
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
