import React, { useState } from 'react';
import './footer.module.scss';

import { windowListener } from '../../listeners/window';
import { RefreshButton } from '../../components/FooterBar/Buttons/RefreshButton';
import { ShowStoreButton } from '../../components/FooterBar/Buttons/ShowStoreButton';
import { ShowSteamCredButton } from '../../components/FooterBar/Buttons/ShowSteamCredButton';

const FooterBar: React.FC = () => {
  const [message, setMessage] = useState<string>();

  windowListener(setMessage);

  return (
    <>
      <footer>
        <div>
          <RefreshButton />
        </div>
        <div>{message}</div>
        <div>
          <ShowStoreButton />
          <ShowSteamCredButton />
        </div>
      </footer>
    </>
  );
};

export default FooterBar;
