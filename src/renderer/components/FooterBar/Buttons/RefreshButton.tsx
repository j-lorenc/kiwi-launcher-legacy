import React from 'react';
import { refreshGamesList } from '../../../events/game';
import SyncIcon from '@fortawesome/fontawesome-pro/svgs/light/sync.svg';

export const RefreshButton: React.FC = () => {
  return (
    <button
      title="Sync"
      onClick={() => {
        refreshGamesList();
      }}
    >
      <SyncIcon width="12" fill="rgba(255,255,255,0.6)" />
    </button>
  );
};
