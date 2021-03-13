import React from 'react';
import MaximizeIcon from 'feather-icons/dist/icons/copy.svg';
import windowButtonStyles from './window-button.module.scss';
import { WindowButton } from './WindowButton';
import { maximize } from '../../../events/window';

export const MaximizeButton: React.FC = () => (
  <WindowButton
    action={maximize}
    Icon={MaximizeIcon}
    className={windowButtonStyles['window-button--maximize']}
  />
);
