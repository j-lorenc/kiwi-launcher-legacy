import React from 'react';
import MinimizeIcon from 'feather-icons/dist/icons/minus.svg';
import windowButtonStyles from './window-button.module.scss';
import { WindowButton } from './WindowButton';
import { minimize } from '../../../events/window';

export const MinimizeButton: React.FC = () => (
  <WindowButton
    action={minimize}
    Icon={MinimizeIcon}
    className={windowButtonStyles['window-button--minimize']}
  />
);
