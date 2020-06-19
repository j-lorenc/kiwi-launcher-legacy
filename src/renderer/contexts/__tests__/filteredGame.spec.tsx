import React from 'react';

import renderer from 'react-test-renderer';

import { filterReducer, useFilterContext } from '../filteredGame';
import { FilterAction } from '../../../@types';

describe('filterReducer', () => {
  it('should set state correctly when action type is filter', () => {
    const initialFilter = {
      gameName: '',
    };

    const action: FilterAction = {
      type: 'filter',
      payload: 'testGame',
    };

    const newState = filterReducer(initialFilter, action);

    expect(newState.gameName).toEqual('testGame');
  });

  it('should set initial context correctly', () => {
    const TestComponent = () => {
      const { state } = useFilterContext();

      return <div>{state.gameName}</div>;
    };

    const tree = renderer.create(<TestComponent />);
    expect(tree).toMatchSnapshot();
  });
});
