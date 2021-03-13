import { CurrentWindow } from '../../../../@types';
import HomeIcon from 'feather-icons/dist/icons/home.svg';
import { ViewButton } from './ViewButton';
import React from 'react';

export const HomeButton: React.FC = () => {
  return <ViewButton WindowToCheck={CurrentWindow.HOME} Icon={HomeIcon} />;
};
