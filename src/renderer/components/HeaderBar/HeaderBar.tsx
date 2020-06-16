import * as React from 'react';
import icon from '../../assets/images/icon.png';
import styles from './styles.module.scss';

import CloseIcon from 'feather-icons/dist/icons/x.svg';
import MaximizeIcon from 'feather-icons/dist/icons/copy.svg';
import MinimizeIcon from 'feather-icons/dist/icons/minus.svg';

import { close, minimize, maximize } from '../../events/window';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className={styles['header-bar']}>
      <span className={styles['header-bar__title']}>
        <img className={styles['header-bar__title__icon']} src={icon} />
        <span className={styles['header-bar__title__text']}>{title}</span>
      </span>

      <div className={styles['header-bar__window-button-container']}>
        <button
          onClick={() => {
            minimize();
          }}
          className={`${styles['header-bar__window-button']} ${styles['header-bar__window-button--minimize']}`}
        >
          <MinimizeIcon />
        </button>
        <button
          onClick={() => {
            maximize();
          }}
          className={`${styles['header-bar__window-button']} ${styles['header-bar__window-button--maximize']}`}
        >
          <MaximizeIcon />
        </button>
        <button
          onClick={() => {
            close();
          }}
          className={`${styles['header-bar__window-button']} ${styles['header-bar__window-button--close']}`}
        >
          <CloseIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;