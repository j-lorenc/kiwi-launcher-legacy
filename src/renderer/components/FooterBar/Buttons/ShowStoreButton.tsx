import React from 'react';
import { showSteamStore } from '../../../events/game';
import StoreIcon from '@fortawesome/fontawesome-pro/svgs/light/store-alt.svg';

export const ShowStoreButton: React.FC = () => {
  return (
    <button
      onClick={() => {
        showSteamStore();
      }}
    >
      <StoreIcon width="18" fill="rgba(255,255,255,0.6)" />
    </button>
  );
};
