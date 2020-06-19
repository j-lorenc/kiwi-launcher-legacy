import { Dispatch } from 'react';

export interface GameFilter {
  gameName: string;
}

export type FilterAction = { type: 'filter'; payload: string };

export interface FilterContextType {
  state: GameFilter;
  dispatch: Dispatch<FilterAction>;
}
