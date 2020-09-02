import React, { useContext } from 'react';
import {
  CurrentWindow,
  WindowSettings,
  SetCurrentWindowAction,
  WindowContextType,
} from '../../@types';

export const windowReducer = (
  state: WindowSettings,
  action: SetCurrentWindowAction
): WindowSettings => {
  switch (action.type) {
    case 'setCurrentWindow': {
      return {
        ...state,
        currentWindow: action.payload,
      };
    }
  }
};

export const initialWindowSettings: WindowSettings = {
  currentWindow: CurrentWindow.HOME,
};

const WindowContext = React.createContext<WindowContextType>({
  state: initialWindowSettings,
  dispatch: () => null,
});

export const useWindowContext = (): WindowContextType => {
  return useContext<WindowContextType>(WindowContext);
};

export default WindowContext;
