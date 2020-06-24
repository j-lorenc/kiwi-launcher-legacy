import * as React from 'react';
import icon from '../../assets/images/icon.png';
import styles from './styles.module.scss';

import CloseIcon from 'feather-icons/dist/icons/x.svg';
import MaximizeIcon from 'feather-icons/dist/icons/copy.svg';
import MinimizeIcon from 'feather-icons/dist/icons/minus.svg';

import SearchIcon from 'feather-icons/dist/icons/search.svg';
import DeleteIcon from '@fortawesome/fontawesome-pro/svgs/regular/backspace.svg';

import { close, minimize, maximize } from '../../events/window';

import { useFilterContext } from '../../contexts/filteredGame';

const WindowButtons: React.FC = () => (
  <div className={styles['title-bar__window-button-container']}>
    <button
      onClick={() => {
        minimize();
      }}
      className={`${styles['title-bar__window-button']} ${styles['title-bar__window-button--minimize']}`}
    >
      <div>
        <MinimizeIcon />
      </div>
    </button>
    <button
      onClick={() => {
        maximize();
      }}
      className={`${styles['title-bar__window-button']} ${styles['title-bar__window-button--maximize']}`}
    >
      <div>
        <MaximizeIcon />
      </div>
    </button>
    <button
      onClick={() => {
        close();
      }}
      className={`${styles['title-bar__window-button']} ${styles['title-bar__window-button--close']}`}
    >
      <div>
        <CloseIcon />
      </div>
    </button>
  </div>
);
const DragBar: React.FC<{ title: string }> = ({ title }) => (
  <div className={styles['title-bar__drag-bar']}>
    <span className={styles['title-bar__title']}>
      <img className={styles['title-bar__title__icon']} src={icon} />
      <span className={styles['title-bar__title__text']}>{title}</span>
    </span>
  </div>
);

const Header: React.FC<{ title: string }> = ({ title }) => {
  const filterContext = useFilterContext();
  const filterActive = filterContext.state.gameName.length > 0;

  return (
    <header className={styles['header-bar']}>
      <div className={styles['title-bar']}>
        <DragBar title={title} />
        <WindowButtons />
      </div>
      <div className={styles['settings-bar']}>
        <div className={styles['search-container']}>
          <div
            className={`${styles['search-container__icon']} ${styles['search-container__icon--search']}`}
          >
            <SearchIcon />
          </div>
          <input
            className={filterActive ? `${styles['active']}` : undefined}
            type="type"
            value={filterContext.state.gameName}
            onChange={(e) => {
              filterContext.dispatch({
                type: 'filter',
                payload: e.target.value,
              });
            }}
          />
          <div
            className={`${styles['search-container__icon']} ${styles['search-container__icon--delete']}`}
            onClick={() => {
              filterContext.dispatch({
                type: 'filter',
                payload: '',
              });
            }}
          >
            <DeleteIcon width="24" path="white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
