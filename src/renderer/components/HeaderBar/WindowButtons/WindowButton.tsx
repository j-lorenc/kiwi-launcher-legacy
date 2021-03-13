import React from 'react';
import windowButtonStyles from './window-button.module.scss';

export const WindowButton: React.FC<{ action: () => void; Icon: React.FC; className: string }> = ({
  action,
  Icon,
  className,
}) => (
  <button
    onClick={() => {
      action();
    }}
    className={`${windowButtonStyles['window-button']} ${className}`}
  >
    <div>
      <Icon />
    </div>
  </button>
);
