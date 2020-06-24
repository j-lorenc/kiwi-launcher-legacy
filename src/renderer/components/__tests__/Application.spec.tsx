import * as React from 'react';
import { Application } from '../../pages/Application';
import * as renderer from 'react-test-renderer';

describe('Application', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Application />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
