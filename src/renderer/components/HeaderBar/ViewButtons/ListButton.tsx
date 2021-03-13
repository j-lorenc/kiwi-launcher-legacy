import React from 'react';
import { CurrentWindow } from '../../../../@types';
import ListIcon from 'feather-icons/dist/icons/list.svg';
import { ViewButton } from './ViewButton';

export const ListButton: React.FC = () => {
  return <ViewButton WindowToCheck={CurrentWindow.LIST} Icon={ListIcon} />;
};
