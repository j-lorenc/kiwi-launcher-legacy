import * as React from 'react';
import { Application } from '../Application';
import * as renderer from 'react-test-renderer';

describe('Applcation', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Application />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
