import React, { useState } from 'react';
import './styles.module.scss';
import LibraryIcon from '@fortawesome/fontawesome-pro/svgs/light/gamepad-alt.svg';
import StoreIcon from '@fortawesome/fontawesome-pro/svgs/light/store-alt.svg';
import SyncIcon from '@fortawesome/fontawesome-pro/svgs/light/sync.svg';
import SteamCredModal from '../../components/Modal/SteamCredModal';
import { showSteamStore } from '../../events/game';

const FooterBar: React.FC = () => {
  const [showSteamCredModal, setShowSteamCredModal] = useState<boolean>(false);

  return (
    <>
      <footer>
        <button
          onClick={() => {
            showSteamStore();
          }}
        >
          <StoreIcon width="18" fill="white" />
        </button>
        <button
          onClick={() => {
            setShowSteamCredModal(!showSteamCredModal);
          }}
        >
          <LibraryIcon width="20" fill="white" />
        </button>
      </footer>
      <SteamCredModal active={showSteamCredModal} onClose={setShowSteamCredModal} />
    </>
  );
};

export default FooterBar;
