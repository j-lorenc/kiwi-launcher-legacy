import React, { useState } from 'react';
import './styles.module.scss';
import LibraryIcon from '@fortawesome/fontawesome-pro/svgs/light/gamepad-alt.svg';
import SteamCredModal from '../../components/Modal/SteamCredModal';

const FooterBar: React.FC = () => {
  const [showSteamCredModal, setShowSteamCredModal] = useState<boolean>(false);

  return (
    <>
      <footer>
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
