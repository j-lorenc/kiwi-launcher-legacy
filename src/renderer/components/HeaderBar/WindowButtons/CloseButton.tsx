import React from 'react';
import CloseIcon from 'feather-icons/dist/icons/x.svg';
import windowButtonStyles from './window-button.module.scss';
import { WindowButton } from './WindowButton';
import { close } from '../../../events/window';

export const CloseButton: React.FC = () => (
  <WindowButton
    action={close}
    Icon={CloseIcon}
    className={windowButtonStyles['window-button--close']}
  />
);
