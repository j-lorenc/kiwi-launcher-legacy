import React, { useState } from 'react';
import LibraryIcon from '@fortawesome/fontawesome-pro/svgs/light/gamepad-alt.svg';

import SteamCredModal from '../../../components/Modal/SteamCredModal';

export const ShowSteamCredButton: React.FC = () => {
  const [showSteamCredModal, setShowSteamCredModal] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => {
          setShowSteamCredModal(!showSteamCredModal);
        }}
      >
        <LibraryIcon width="20" fill="rgba(255,255,255,0.6)" />
      </button>
      <SteamCredModal active={showSteamCredModal} onClose={setShowSteamCredModal} />
    </>
  );
};
