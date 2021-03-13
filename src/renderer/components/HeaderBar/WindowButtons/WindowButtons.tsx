import React from 'react';
import windowButtonStyles from './window-button.module.scss';

import { MinimizeButton } from './MinimizeButton';
import { MaximizeButton } from './MaximizeButton';
import { CloseButton } from './CloseButton';

export const WindowButtons: React.FC = () => (
  <div className={windowButtonStyles['window-button-container']}>
    <MinimizeButton />
    <MaximizeButton />
    <CloseButton />
  </div>
);
