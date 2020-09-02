import React from 'react';
import styles from './styles.module.scss';

import PlayButtonIcon from 'feather-icons/dist/icons/play.svg';
import DownloadButtonIcon from 'feather-icons/dist/icons/download.svg';
import { launchGame } from '../../events/game';

export const InstallButton: React.FC<{ id: number | string }> = ({ id }) => {
  return (
    <button
      onClick={() => {
        launchGame(id);
      }}
      className={`${styles['launch-button']} ${styles['launch-button--install']}`}
    >
      <span>
        <DownloadButtonIcon />
        Install
      </span>
    </button>
  );
};

export const PlayButton: React.FC<{ id: number | string }> = ({ id }) => {
  return (
    <button
      onClick={() => {
        launchGame(id);
      }}
      className={`${styles['launch-button']} ${styles['launch-button--launch']}`}
    >
      <span>
        <PlayButtonIcon />
        Play
      </span>
    </button>
  );
};
