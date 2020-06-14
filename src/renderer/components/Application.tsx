import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as styles from './app.module.scss';

export const Application: () => JSX.Element = () => {
  return (
    <div>
      <h1 className={styles.fun}>New Launcher</h1>
    </div>
  );
};

export default hot(Application);
