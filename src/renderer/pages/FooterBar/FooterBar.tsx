import React, { useState } from 'react';
import './styles.module.scss';
import LibraryIcon from '@fortawesome/fontawesome-pro/svgs/light/gamepad-alt.svg';
import StoreIcon from '@fortawesome/fontawesome-pro/svgs/light/store-alt.svg';
import SyncIcon from '@fortawesome/fontawesome-pro/svgs/light/sync.svg';
import SteamCredModal from '../../components/Modal/SteamCredModal';
import { showSteamStore, refreshGamesList } from '../../events/game';

const FooterBar: React.FC = () => {
  const [showSteamCredModal, setShowSteamCredModal] = useState<boolean>(false);

  return (
    <>
      <footer>
        <div>
          <button
            title="Sync"
            onClick={() => {
              refreshGamesList();
            }}
          >
            <SyncIcon width="12" fill="rgba(255,255,255,0.6)" />
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              showSteamStore();
            }}
          >
            <StoreIcon width="18" fill="rgba(255,255,255,0.6)" />
          </button>
          <button
            onClick={() => {
              setShowSteamCredModal(!showSteamCredModal);
            }}
          >
            <LibraryIcon width="20" fill="rgba(255,255,255,0.6)" />
          </button>
        </div>
      </footer>
      <SteamCredModal active={showSteamCredModal} onClose={setShowSteamCredModal} />
    </>
  );
};

export default FooterBar;
