import React, { useState } from 'react';
import Modal, { ModalProps } from './Modal';
import styles from './styles.module.scss';

const SteamCredModal = ({ active, onClose }: ModalProps): JSX.Element => {
  const [steamUserKey, setSteamUserKey] = useState<string>('');
  const [steamApiKey, setSteamApiKey] = useState<string>('');

  const submitSteamCreds = () => {
    if (steamApiKey && steamUserKey) {
      window.postMessage(
        {
          type: 'submit-steam-creds',
          value: { steamUserKey, steamApiKey },
        },
        '*'
      );
    }
  };

  return (
    <Modal className={styles.modal} title={'Game'} active={active} onClose={onClose}>
      <div className={styles.root}>
        <div>
          <input
            value={steamUserKey}
            onChange={(e) => {
              setSteamUserKey(e.target.value);
            }}
            placeholder={'Steam User Key'}
          />
        </div>
        <div>
          <input
            value={steamApiKey}
            onChange={(e) => setSteamApiKey(e.target.value)}
            placeholder={'Steam API Key'}
          />
        </div>
        <div>
          <button
            onClick={() => {
              submitSteamCreds();
              onClose(false);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SteamCredModal;
