import React from 'react';
import { CurrentWindow } from '../../../../@types';
import { useWindowContext } from '../../../contexts/currentWindow';
import viewButtonStyles from './view-buttons.module.scss';
import cn from 'classnames';

export const ViewButton: React.FC<{
  WindowToCheck: CurrentWindow;
  Icon: React.FC<{ viewBox: string }>;
}> = ({ WindowToCheck, Icon }) => {
  const { state: windowState, dispatch: windowDispatch } = useWindowContext();
  const viewButtonsClasses = cn({
    [viewButtonStyles['view-button']]: true,
    [viewButtonStyles['view-button--active']]: windowState.currentWindow === WindowToCheck,
  });

  return (
    <button
      className={viewButtonsClasses}
      onClick={() => {
        windowDispatch({
          type: 'setCurrentWindow',
          payload: WindowToCheck,
        });
      }}
    >
      <Icon viewBox="0 0 24 24" />
    </button>
  );
};
